const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    chatId : String,
    userId : String,
    title : String,
})

const chatModel = mongoose.model('UserChats',chatSchema)

module.exports = {chatModel}