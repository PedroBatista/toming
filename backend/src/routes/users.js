var express = require('express');
const { User } = require('../database/models')
var router = express.Router();

//get all users
router.get('/', async function(req, res, next) {

  //query the DB of all users
  await User.find().exec()
    .then(users => {
      res.json({ users: users})
    })
    .catch(err => {
      res.json({ error: err, message: "Could not retrieve users"}).status(500)
    })
});

//make a new boy
router.post('/', async function(req, res, next) {
  let user = new User(req.body)

  //save it in the DB
  await user.save()
    .then(user => {
      //send a 201 and the new resource
      res.status(201).json({ data: user })
    })
    .catch(err => {
      let errStatus = err.name === 'ValidationError' ? 400 : 500
      res.status(errStatus).json({err: err})
    })
});

//see one boy
router.get('/:id', async function(req, res, next) {

  //find this sneaky boye
  await User.findById(req.params.id).exec()
    .then(user => {
      res.json({ user: user})
    })
    .catch(err => {
      res.json({ error: err, message: 'Could not retrieve user'}).status(500)
    })
});

//get rid of a boy
router.delete('/:id', async function(req, res, next) {

  //find the sneaky boye and make him go away
  await User.findByIdAndRemove(req.params.id).exec()
    .then(() => {
      //let em know there aint no content no mo
      res.status(204).json()
    })
    .catch(err => {
      res.status(500).json({err: err})
    })
});

//update a boy
router.put('/:id', async function(req, res, next) {

  await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then(user => {
      res.status(200).json({user: user})
    })
    .catch(err => {
      res.status(500).json({err: err})
    })
});

module.exports = router;
