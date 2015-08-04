var express = require('express');
var router = express.Router();
var User = require('../models').User;
var Request = require('../models').Request;
var Response = require('../models').Response;

/* GET users listing. */
router.get('/requests', function(req, res, next) {
  Request.find({}).populate('_creator', 'username').exec(function(err, questions) {
    if (err) throw err;
    res.send(questions);
  });
});

router.get('/answered', function(req, res, next) {
  Request.find({isComments: true}).populate('_creator', 'username').exec(function(err, questions) {
    if (err) throw err;
    res.send(questions);
  });
});

router.get('/noanswer', function(req, res, next) {
  Request.find({isComments: false}).populate('_creator', 'username').exec(function(err, questions) {
    if (err) throw err;
    res.send(questions);
  });
});

/* POST save request */
router.post('/submit', function(req, res, next) {
  var user;
  function saveQuestion() {
    new Request({
      request: req.body.question,
      _creator: user._id
    }).save(function(err, question) {
        if(err) throw err;
        res.send(question);
      });
  }
  User.findOne({username: req.body.username}, function(err, userDb) {
    if(err) throw err;
    user = userDb;
    if (user === null) {
      new User({
        username: req.body.username
      }).save(function(err, userSave) {
          if(err) throw err;
          user = userSave;
          saveQuestion();
        });
    } else {
      saveQuestion();
    }
  });
});

router.get('/request/:_id', function(req, res, next) {
  console.log(req.params._id);
  Request.findOne({_id: req.params._id}).populate('_creator', 'username').exec(function(err, question) {
    if (err) throw err;
    Response.find({_request: question._id}).populate('_creator', 'username').exec(function(err, reply) {
      if (err) throw err;
      res.send({reply: reply, question: question})
    });
  });
});

router.post('/comment', function (req, res, next) {
  var user;

  function saveResponse() {
    new Response({
      response: req.body.comment,
      _request: req.body.id,
      _creator: user._id
    }).save(function (err, comment) {
          if (err) throw err;
          Response.find({_request: comment._request}).populate('_creator', 'username').exec(function(err, reply) {
            if (err) throw err;
            Request.update({_id: req.body.id}, { $set: { isComments: true }}, function(err, ask) {
              if (err) throw err;
              res.send(reply)
            });
          });
        });
  }

  User.findOne({username: req.body.username}, function(err, userDb) {
    if(err) throw err;
    user = userDb;
    if (user === null) {
      new User({
        username: req.body.username
      }).save(function(err, userSave) {
            if(err) throw err;
            user = userSave;
            saveResponse();
          });
    } else {
      saveResponse();
    }
  });
});

module.exports = router;
