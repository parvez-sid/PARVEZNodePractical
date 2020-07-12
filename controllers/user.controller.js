var functions = require('../functions');
const userSchema = require('../models/user.model');
var Q = require('q');
var db = require("../config/db.config");
var ObjectId = require('mongodb').ObjectID;


exports.registerUser = (req, email, password, res) => {
    var deferred = Q.defer();
    var Newuser = new userSchema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: email,
        password: password,
        username : functions.userNameGenerator(),
        gender : req.body.gender,
        country : req.body.country,
        city : req.body.city,
        hobbies : req.body.hobbies,
    });
    
    Newuser.save((err, result) => {
        if (err) {
            if (err.code == 11000) {
                data = { status: 501, msg: 'Email is already exists, Please try login.' }
                deferred.reject(data);
            } else {
                data = { status: 501, msg: err.message }
                deferred.reject(data);
            }
        }
        else {
            data = {
                status: 200,
                msg: 'Successfully registered', result,
            }
            deferred.resolve(data);
        }
    })
    return deferred.promise;
};

//Login
exports.loginUser = (req, email, password, res) => {
    var deferred = Q.defer();
    userSchema.findOne({ "email": email }, (err, response) => {
        if (response) {
            var valid = response.comparePassword(password, response.password)
            if (valid) {
                userSchema.updateOne({ '_id': ObjectId(response._id) }, { $set: { 'is_logged_in': true } }).exec((err, login) => {
                    if (login) {
                        data = { status: 200, response }
                        deferred.resolve(data);
                    } else {
                        data = { status: 501, message: 'Error in login' }, deferred.reject(data);
                    }
                })
            } else {
                data = { status: 501, msg: 'Password is incorrect.' }, deferred.reject(data);
            }
        }
        else { data = { status: 501, msg: 'Email is incorrect.' }, deferred.reject(data); }
    });
    return deferred.promise;
};

// Get all users excluding the logged in one
exports.getUsers = (req, res) => {
    if(req.session.user){
    db.collection("users")
      .aggregate([
        {
          $match: {
            // _id: {$ne : ObjectId('5f0a8ab051d6231a00b590d7')}
            _id: {$ne : ObjectId(req.session.user._id)}
          }
        },
        {
          $lookup: {
            from: "friend_requests",
            localField: "_id",
            foreignField: "sent_by",
            as: "user_list"
        }
        },
        {
          $unwind: {
            path: "$user_list",
            preserveNullAndEmptyArrays: true
          }
        }
      ])
      .toArray(function(err, result) {
        if (err)
          return functions.sendErrorResponse(req, res, 400,  "No user found.");
          return functions.sendSuccessResponse(req, res, result);
      });
      }
    else {
        if (err) return functions.sendErrorResponse(req, res, 400, 'Session Expire');
    }
}