const express = require('express');
const httpStatus = require('http-status');
const {User, Session, Room} = require('../database/models');
const validate = require('../middleware/validate');
const roomValidation = require('../validations/room.validation');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const  isValidSession =  require('../middleware/isValidSession');
const mongoose = require('mongoose');
const jitsiToken = require('../services/jiti-token-generation');

const router = express.Router();


router.post('/create',
  isValidSession,  validate(roomValidation.create),
  catchAsync(async (req, res) => {
      const roomBody = req.body;

      try {

        if(!mongoose.Types.ObjectId.isValid(roomBody.author)){
          return res.status(httpStatus.BAD_REQUEST).send("invalid author id");
        }

        if ((await User.exists({_id: roomBody.author})) == false) {
          return res.status(httpStatus.BAD_REQUEST).send("author not found");
        }

        //ToDo respond in decent api form
        if ((await Room.exists({subject: roomBody.subject}))) {
          return res.status(httpStatus.BAD_REQUEST).send("room subject already used");
        }

        const room = await Room.create(roomBody);

        res.status(httpStatus.CREATED).send(room);

      }catch (e) {
        console.log("error: " + e)
        res.status(500).send("internal error");
      }

    }
  )
);

//list all rooms
router.get('/',isValidSession,
  catchAsync(async (req, res) => {

      await Room.find().exec()
        .then((rooms) => {
          res.status(201).json(rooms)
        })
        .catch(err => {
          res.status(500).json({err: err})
        })

    }
  )
);

router.get('/:id',
  isValidSession,
  catchAsync(async (req, res) => {


    if ((await Room.exists({_id: req.params.id})) == false) {
      return res.status(httpStatus.BAD_REQUEST).send("room not found");
    }

    await Room.findById(req.params.id).populate("author").lean().exec()
      .then((room) => {

        room.jwt_token = jitsiToken.generate(room.author.username, "*");
        room.author.password ="";

        res.status(200).json(room)
      })
      .catch(err => {
        res.status(500).json({err: err})
      })
    }
  )
);


module.exports = router;
