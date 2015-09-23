process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Exercise = require("../server/models/exercise");

var should = chai.should();
chai.use(chaiHttp);

describe('Exercise',function(){
  Exercise.collection.drop();
  var id;
  beforeEach(function(done){
    var newExercise = new Exercise({
      name:'pushups',
      difficulty:3
    });
    id = newExercise._id;
    newExercise.save(function(err){
      done();
    });
  });
  afterEach(function(done){
    Exercise.collection.drop();
    done();
  });

  it('should list All exercises on /exercises GET',function(done){
    chai.request(server)
      .get('/exercises')
      .end(function(err,res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('difficulty');
        res.body[0].name.should.equal('pushups');
        res.body[0].difficulty.should.equal(3);
        done();
      });

  });

  it('should create one exercise on /exercises POST',function(done){
    chai.request(server)
      .post('/exercises/pushups/3')
      .end(function(err,res){
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.name.should.be.a('string');
        done();
      });
  });

 it('should list SINGLE exercise on /exercise/:id GET', function(done) {
    var newExercise = new Exercise({
      name: 'pushups',
      difficulty:3
    });
    newExercise.save(function(err, data) {
      chai.request(server)
        .get('/exercises/' + id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          // res.body.should.be.a('array');
          res.body[0].should.be.a('object');
          res.body[0].name.should.be.a('string');
          res.body[0].name.should.be.equal('pushups');

          res.body[0].difficulty.should.be.equal(3);
          done();
        });
    });
  });


it('should update a SINGLE exercise on /exercise/<id> PUT', function(done) {

      chai.request(server)
        .put('/exercise/'+id+ '/curl/2')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
      });
    });

it('should delete a SINGLE exercise on /exercise/<id> DELETE', function(done) {
    chai.request(server)
      .delete('/exercises/' + id)
      .end(function(error, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });

});
