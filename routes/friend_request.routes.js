var express = require('express');
var router = express.Router();

var router = require('express').Router();
const requestController = require('../controllers/friend_request.controller');

router.post('/send',[requestController.sendFriendRequest]);

module.exports = router;