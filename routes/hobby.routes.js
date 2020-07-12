var express = require('express');
var router = express.Router();

var router = require('express').Router();
const hobbyController = require('../controllers/hobby.controller');

router.get('/get_all',[hobbyController.getAllHobbies]);

module.exports = router;