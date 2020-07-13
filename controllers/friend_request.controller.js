var functions = require('../functions');
const requestSchema = require('../models/friend_request.model');
var ObjectId = require('mongodb').ObjectID;

exports.sendFriendRequest = (req, res) => {
    if(req.session.user){
    var friend_request = new requestSchema({
        sent_by : ObjectId(req.session.user._id),
        sent_to : req.body.sent_to,
    });

    friend_request.save((err, result) => {
        if (err) {
            if (err.code == 11000) {
                return functions.sendErrorResponse(req, res, 400, 'Duplicate entry, Please try login.')
            } else {
                return functions.sendErrorResponse(req, res, 400, 'Something went wrong, please try again!')
            }
        } else if(result) {
            return functions.sendSuccessResponse(req, res, 'Request sent!');
        }
    })
    }
    else {
        if (err) return functions.sendErrorResponse(req, res, 400, 'Session Expire');
    }
}