var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/exercises',function(req,res,next){
  Exercise.find(function(err,data){
    if(err){
      res.json({'message':err});
    } else {
      res.json(data);
    }
  });
});

router.get('/exercises/:id',function(req,res,next){
  Exercise.find(function(err,data){
    if(err){
      res.json({'message':err});
    } else {
      res.json(data);
    }
  });
});

router.post('/exercises/:name/:difficulty',function(req,res,next){
  var newExercise = new Exercise({
    name: req.params.name,
    difficulty: req.params.difficulty
  });
  newExercise.save(function(err,data){
    if(err){
      res.json({'message':err});
    } else {
      res.json(data);
    }
  });
});

router.put('/exercise/:id/:name/:difficulty',function(req,res,next){
   var query={
    _id: req.params.id
  };
  var update = new Exercise({
    name: req.params.name,
    difficulty: req.params.difficulty
  });

  Exercise.findOneAndUpdate(query,update,function(err,data){
    if(err){
      res.json({'message':err});
    } else {
      res.json(data);
    }
  });
});

router.delete('/exercises/:id',function(req,res,next){
  Exercise.remove(function(err,data){
    if(err){
      res.json({'message':err});
    } else {
      res.json(data);
    }
  });
});


module.exports = router;
