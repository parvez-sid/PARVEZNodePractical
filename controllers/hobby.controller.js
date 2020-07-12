var functions = require('../functions');
var db = require('../config/db.config');

exports.getAllHobbies = (req, res) => {
    db.collection('hobbies').find({}).toArray((err, response) => {
        if(err) functions.sendErrorResponse(req, res, 400, 'Some error Occured');
        else {
            functions.sendSuccessResponse(req, res, response)
        }
    })
}