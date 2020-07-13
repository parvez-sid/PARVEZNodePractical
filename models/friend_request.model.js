const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var requestSchema = new Schema({
    sent_by : { type: Schema.Types.ObjectId ,required : true ,unique:true},
    sent_to : { type: Schema.Types.ObjectId, required : true ,unique:true },
    request_status : {type : String, required: true, default: "Pending"},
    is_deleted : {type : String, default: false}
   
},{timestamps: true});

module.exports = mongoose.model('Friend_request',requestSchema);