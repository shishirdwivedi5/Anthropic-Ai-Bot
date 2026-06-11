const express = require("express")
const routes = express.Router()

const {tokenValidation, tokenValidationcheck} = require("../middleware/chat.middleware")
const {creatChat, getChats, deleteUserChat} = require("../controllers/chat.controller")


routes.post("/create" , tokenValidation , creatChat )
routes.get("/getchats" ,tokenValidationcheck , getChats )
routes.delete("/deletechat/:id",deleteUserChat )

module.exports = routes