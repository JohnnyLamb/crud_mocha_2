process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Exercise = require("../server/models/exercise");

var should = chai.should();
chai.use(chaiHttp);
