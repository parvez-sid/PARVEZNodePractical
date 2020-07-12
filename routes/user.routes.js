var express = require('express');
var router = express.Router();

var router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

router.post('/signup',[authController.signupUser]);
router.post('/login',[authController.Userlogin]);
router.get('/get_all',[userController.getUsers]);
module.exports = router;
