const { userModel } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// user register
async function userRegister(req, res) {
  if (!req.body.email) {
    return res.send("plese enter email");
  }

  if (!req.body.password) {
    return res.send("plese enter password");
  }

  const hashPass = await bcrypt.hash(req.body.password, 10);

  const check = await userModel.findOne({
    email: req.body.email,
  });

  if (check) {
    return res.send("user alredy exicted");
  }

  const result = await userModel.create({
    firstName: req.body.firstName,
    email: req.body.email,
    password: hashPass,
  });

  const user_id = await userModel.findOne({
    email: req.body.email,
  });

  const id = user_id._id.toString();
  const token = jwt.sign(id, process.env.JWT_SECRET_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "user register success",
    result: result,
  });
}

// user Login
async function userLogin(req, res) {
  if (!req.body.email) {
    return res.send("plese enter email");
  }

  if (!req.body.password) {
    return res.send("plese enter password");
  }

  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.send("invaild username password");
  }

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) {
    return res.send("invaild username password");
  }

  const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({
    message: "login sussfully💹",
    user,
  });
}

async function getMe(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded);
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error in getMe:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function userLogout(req, res) {
  
  const token = req.cookies.token;

  res.clearCookie("token");

  res.status(200).json({ message: "Logout successful 💹" });
}

module.exports = {
  userRegister,
  userLogin,
  getMe,
  userLogout,
};
