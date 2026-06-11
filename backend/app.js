require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/user.db");
const cors = require("cors");
const path = require("path")

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.static(path.join(__dirname, '../public')));

const userRoutes = require("./routes/user.route");
app.use("/auth", userRoutes);

const chatRoute = require("./routes/chat.route");
app.use("/chat", chatRoute);

app.get("*name", (req,res)=>{
  res.sendFile(path.join(__dirname , '../public/index.html'));
})



module.exports = app;
