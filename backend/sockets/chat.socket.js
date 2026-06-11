const app = require("../app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,

    // cookie: true,
  },
});

const uuid = require("uuid");
const AiMain = require("../services/ai.service");
const jwt = require("jsonwebtoken");
const { createMemory, getMemory } = require("../services/pinecone.service");
const embaddingModel = require("../services/embadding.service");
const { messageModel } = require("../models/massageSchema");
const { chatModel } = require("../models/chatSchema");

//middleware for socket authrization
io.use((socket, next) => {
  try {
    const token = socket.handshake.headers.cookie?.split("=")[1];

    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!tokenVerify) {
      return next(new Error("Unauthorized"));
    }

    socket.user = tokenVerify;
    next();
  } catch (err) {
    next(new Error("unauthrozed"));
  }
});

async function socketIo() {
  io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
    socket.on("chatListiner", async (data) => {
      const user_id = socket.user;

      if (!data) {
        return socket.emit("chatListiner", "Please provide a message");
      }

      await messageModel.create({
        Role: "user",
        message: data,
        messageUserId: user_id,
      });

      const mongoDbData = await messageModel
        .find({
          messageUserId: user_id,
        })
        .limit(20)
        .select("message")
        .lean();

      const fetchData = mongoDbData.map((m) => {
        return m.message;
      });

      const embedding = await embaddingModel(data); // GEMINI AI EMBADDING MODEL

      // PINECONE DB UPSERT DATA MODEL

      await createMemory({
        messageId: uuid.v4(),
        embedding,
        metadata: {
          text: data,
          userId: user_id,
          chatId: socket.id,
        },
      });

      const memoryPinecone = await getMemory(embedding, user_id);
      const content = memoryPinecone.matches.map((m) => {
        // console.log("Pinecone Memory::", m.metadata.text);
        return m.metadata.text;
      });

      const AiRes = await AiMain(fetchData, content);
      if (!AiRes) {
        return socket.emit("chatListiner", "Sorry, I couldn't process your request.");
      }

      const embeddingAI = await embaddingModel(AiRes);

      await messageModel.create({
        Role: "model",
        message: AiRes,
        messageUserId: user_id,
      });

      await createMemory({
        embeddingAI,
        messageId: uuid.v4(),
        metadata: {
          text: AiRes,
          userId: user_id,
          chatId: socket.id,
        },
      });

      socket.emit("chatListiner", AiRes);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnect");
    });
  });
  httpServer.listen(3000, () => {
    console.log("socket server listen on port 3000");
  });
}

module.exports = socketIo;
