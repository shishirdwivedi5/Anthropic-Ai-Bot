const mongoose = require("mongoose")

const messSchema = new mongoose.Schema({
    Role : String ,
    message : String,
    messageUserId : String,
    

})
const messageModel = mongoose.model('userMessage' , messSchema)

module.exports = { messageModel}