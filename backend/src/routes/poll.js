const express = require('express');
const httpStatus = require('http-status');
const {Poll} = require('../database/models');
const validate = require('../middleware/validate');
const pollValidation = require('../validations/poll.validation');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const isValidSession = require('../middleware/isValidSession');

const router = express.Router();

router.post('/create',
  isValidSession,
  validate(pollValidation.create),
  catchAsync(async (req, res) => {

    const pollBody = req.body;
    pollBody.author = req.session.user;

    const poll = await Poll.create(pollBody);

    return res.status(httpStatus.CREATED).send(poll);
  })
);

// List all polls.
router.get('/',
  isValidSession,
  catchAsync(async (req, res) => {

    const polls = await Poll.find().select(["-options", "-already_voted_users"]).lean().exec();
    return res.status(httpStatus.OK).json(polls);

  })
);

router.get('/:id',
  isValidSession,
  validate(pollValidation.get),
  catchAsync(async (req, res) => {

    if (await Poll.exists({_id: req.params.id}) === false) {
      throw new ApiError(httpStatus.NOT_FOUND, "Poll not found!");
    }

    const poll = await Poll.findById(req.params.id).lean().exec();

    const user = req.session.user;
    poll.already_voted = await hasAlreadyVoted(poll, user);

    return res.status(httpStatus.OK).json(poll);
  })
);

router.get('/:id/vote/:optionId',
  isValidSession,
  validate(pollValidation.vote),
  catchAsync(async (req, res) => {

    if (await Poll.exists({_id: req.params.id}) === false) {
      throw new ApiError(httpStatus.NOT_FOUND, "Poll not found!");
    }

    const poll = await Poll.findById(req.params.id).exec();

    const option = poll.options.find(o => o._id == req.params.optionId);

    if (option == undefined)
      throw new ApiError(httpStatus.NOT_FOUND, "Option not found!");

    const user = req.session.user;

    const alreadyVoted = await hasAlreadyVoted(poll, user);
    if (alreadyVoted)
      throw new ApiError(httpStatus.PAYMENT_REQUIRED, "You have already voted! Go away!");

    poll.already_voted_users.push(user);

    option.vote_count = option.vote_count == undefined ? 1 : ++option.vote_count;

    await poll.save();
    const pollObj = poll.toObject();

    sendPollUpdate(pollObj);

    pollObj.already_voted = true;
    return res.status(httpStatus.OK).json(pollObj);
  })
);

const hasAlreadyVoted = async (poll, user) => await Poll.exists({_id: poll._id, already_voted_users: user._id});

let clients = [];

router.get('/:id/events',
  catchAsync(async (req, res) => {

    // Check if the pool exists
    if (await Poll.exists({_id: req.params.id}) === false) {
      throw new ApiError(httpStatus.NOT_FOUND, "Poll not found!");
    }
    const poll = await Poll.findById(req.params.id).lean().exec();

    // Mandatory headers and http status to keep connection open
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    // Tell the client to retry every 10 seconds if connectivity is lost
    res.write('retry: 10000\n\n');

    // Generate an id based on timestamp and save res object of client connection on clients list
    // Later we'll iterate it and send updates to each client
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      pollId: poll._id,
      res
    };
    clients.push(newClient);

    // Keep SSE alive.
    let keepAliveMS = 60 * 1000;

    function keepAlive() {
      // SSE comment for keep alive. Chrome times out after two minutes.
      res.write(':\n\n');
      setTimeout(keepAlive, keepAliveMS);
    }

    setTimeout(keepAlive, keepAliveMS);

    /* Event handlers for SSE here */

    // When client closes connection we update the clients list avoiding the disconnected one
    req.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(c => c.id !== clientId);
    });
  })
);

// Iterate clients list and use write res object method to send new nest
const sendPollUpdate = (poll) => {
  const pollJson = JSON.stringify(poll);
  clients
    .filter(c => c.pollId.equals(poll._id))
    .forEach(c => {
      c.res.write(`event: poll-update\n`);
      c.res.write(`data: ${pollJson}\n\n`);
    })
};

module.exports = router;
