const { chatModel } = require("../models/chatSchema");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

async function creatChat(req, res) {
  const user_id = req.user;
  console.log(user_id);

  const chatCreate = await chatModel.create({
    chatId: uuid.v4(),
    userId: user_id,
    title: req.body.title,
  });
  //  const isChatsHinstry = await  chatModel.find({
  //     userId: user_id,
  //   });

  res.json({
    message: "chatCreated SuccessFull",
    // isChatsHinstry,
  });
}

async function getChats(req, res) {
  const user_id = req.user;
  console.log("user_id", user_id);
  const isChatsHinstry = await chatModel.find({
    userId: user_id,
  });
  res.json({
    message: "chatCreated SuccessFull",
    isChatsHinstry,
  });
}

async function deleteUserChat(req, res) {
  const p = req.params;
  

  await chatModel.findOneAndDelete({
    chatId: p.id,
  });
  res.json({
    message: "Chat deleted successfully",
  });
}

module.exports = {
  creatChat,
  getChats,
  deleteUserChat,
};
