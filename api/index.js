const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("./models/User");

require("dotenv").config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "asdfjioEIfjo32jfiso";

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({
      email,
    });

    if (userDoc) {
      const pwOk = bcrypt.compareSync(password, userDoc.password);

      if (pwOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id, name: userDoc.name },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("PW not ok");
      }
    } else {
      res.json("Not found");
    }
  } catch (e) {
    res.status(422).json(e);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) throw err;

      res.json(user);
    });
  } else {
    res.json(null);
  }
  res.json(token);
});

app.listen(4000);
