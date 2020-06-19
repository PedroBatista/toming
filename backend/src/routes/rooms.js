const express = require('express');
const httpStatus = require('http-status');
const {Room} = require('../database/models');
const validate = require('../middleware/validate');
const roomValidation = require('../validations/room.validation');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const isValidSession = require('../middleware/isValidSession');
const jitsiToken = require('../services/jiti-token-generation');

const router = express.Router();

router.post('/create',
  isValidSession,
  validate(roomValidation.create),
  catchAsync(async (req, res) => {
    const roomBody = req.body;
    roomBody.author = req.session.user;

    // TODO We should't care! (jitsi uses the mongo id)
    if (await Room.exists({subject: roomBody.subject})) {
      throw new ApiError(httpStatus.CONFLICT, "Room subject already used.");
    }

    const room = await Room.create(roomBody);

    return res.status(httpStatus.CREATED).send(room);
  })
);

// List all user rooms.
router.get('/',
  isValidSession,
  catchAsync(async (req, res) => {
    const rooms = await Room.find(/*{author: req.session.user}*/).exec();
    return res.status(httpStatus.CREATED).json(rooms);
  })
);

router.get('/:id',
  isValidSession,
  catchAsync(async (req, res) => {

    if (await Room.exists({_id: req.params.id}) === false) {
      throw new ApiError(httpStatus.NOT_FOUND, "Room not found!");
    }

    const room = await Room.findById(req.params.id).lean().exec();
    room.jwt_token = jitsiToken.generate(req.session.name, room._id);

    return res.status(httpStatus.OK).json(room);
  })
);

module.exports = router;
