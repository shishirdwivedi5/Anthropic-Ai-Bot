require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/user.db");
const cors = require("cors");

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


const userRoutes = require("./routes/user.route");
app.use("/auth", userRoutes);

const chatRoute = require("./routes/chat.route");
app.use("/chat", chatRoute);


module.exports = app;
