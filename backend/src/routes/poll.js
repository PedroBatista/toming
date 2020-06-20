const express = require('express');
const httpStatus = require('http-status');
const {Poll} = require('../database/models');
const validate = require('../middleware/validate');
const pollValidation = require('../validations/poll.validation');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const isValidSession = require('../middleware/isValidSession');
const jitsiToken = require('../services/jiti-token-generation');

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
    /*
    const rooms = await Room.find({author: req.session.user}).exec();
    return res.status(httpStatus.CREATED).json(rooms);
    */
  })
);

router.get('/:id',
  isValidSession,
  catchAsync(async (req, res) => {

    /*
    if (await Room.exists({_id: req.params.id}) === false) {
      throw new ApiError(httpStatus.NOT_FOUND, "Room not found!");
    }

    const room = await Room.findById(req.params.id).lean().exec();
    room.jwt_token = jitsiToken.generate(req.session.name, room._id);

    return res.status(httpStatus.OK).json(room);
    */
  })
);


router.get('/vote/:id',
  isValidSession,
  catchAsync(async (req, res) => {

    /*
    if (await Room.exists({_id: req.params.id}) === false) {
      throw new ApiError(httpStatus.NOT_FOUND, "Room not found!");
    }

    const room = await Room.findById(req.params.id).lean().exec();
    room.jwt_token = jitsiToken.generate(req.session.name, room._id);

    return res.status(httpStatus.OK).json(room);
    */
  })
);

module.exports = router;
