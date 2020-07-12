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
            return functions.sendErrorResponse(req, res, 400, 'Invalid JSON.');
        } else if(result) {
            return functions.sendSuccessResponse(req, res, 'Request sent!');
        }
    })
    }
    else {
        if (err) return functions.sendErrorResponse(req, res, 400, 'Session Expire');
    }
}