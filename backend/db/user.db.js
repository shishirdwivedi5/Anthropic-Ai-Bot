const mongoose = require("mongoose");

async function connectDB() {
  await mongoose
    .connect(
      "mongodb+srv://shishirdwivedi564_db_user:Xpo6CJVDzcj46Qk7@cohort.muam6hq.mongodb.net/AI-DB",
    )
    .then(() => console.log("DB connected "))
    .catch((err) => console.log("DB connection error", err));
}

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log("db connect");
//     return client.db("AI");
//   } catch (error) {
//     console.log("errorDB", error);
//   }
// }

module.exports = connectDB;
