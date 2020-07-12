exports.userNameGenerator = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
};

function sendErrorResponse(req, res, statusCode, message) {
    res.status(statusCode).send({ message: message, statusCode: statusCode }).end();
}
exports.sendErrorResponse = function (req, res, statusCode, message) {
    sendErrorResponse(req, res, statusCode, message);
};

exports.sendSuccessResponse = function(req, res, message) {
    res.status(200).send(message).end();
};