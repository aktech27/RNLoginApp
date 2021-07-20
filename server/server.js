const express = require("express");
const mongoose = require("mongoose");
const Users = require("./model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

require("dotenv").config();

mongoose
  .connect(process.env.LOCAL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json({ limit: "50mb" }));

server.post("/register", (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(422).send({ error: "Missing required fields" });
  Users.findOne({ email })
    .then((existingUser) => {
      if (existingUser) return res.status(422).send({ error: "User already exists" });
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const newUser = new Users({ name, email, password: hashedPassword });
        newUser
          .save()
          .then((savedUser) => {
            console.log(savedUser);
            return res.status(200).send({ message: "Registration successful" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Missing required fields" });
  }
  Users.findOne({ email })
    .then((user) => {
      if (!user) return res.status(422).send({ error: "Invalid email or password" });
      bcrypt
        .compare(password, user.password)
        .then((isValid) => {
          if (!isValid) return res.status(422).send({ error: "Invalid email or password" });
          const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
          res.status(200).send({ message: "Logged in successfully", token, user: user.name });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running at: http://localhost: ${process.env.PORT}`);
});
