const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  dateofCreation: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Users", Users);
