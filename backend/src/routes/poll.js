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

    const alreadyVoted = await Poll.exists({_id: poll._id, already_voted_users: user._id});
    if (alreadyVoted)
      throw new ApiError(httpStatus.PAYMENT_REQUIRED, "You have already voted! Go away!");

    poll.already_voted_users.push(user);

    option.vote_count = option.vote_count == undefined ? 1 : ++option.vote_count;

    await Poll.updateOne(poll);

    return res.status(httpStatus.OK).json(poll);
  })
);

module.exports = router;
