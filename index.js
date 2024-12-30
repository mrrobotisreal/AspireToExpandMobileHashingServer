require("dotenv").config();
const https = require("https");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const PORT = 56789;
const options = {
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/aspirewithalina.com/fullchain.pem"
  ),
  key: fs.readFileSync("/etc/letsencrypt/live/aspirewithalina.com/privkey.pem"),
};
const salt = process.env.SALT;

app.use(bodyParser.json());

app.post("/hash", (req, res) => {
  const { password } = req.body;
  console.log("password", password);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log("hashedPassword", hashedPassword);
  const shortenedHash = hashedPassword.slice(0, 32);
  console.log("shortenedHash", shortenedHash);

  res.status(200).send(shortenedHash);
});

https.createServer(options, app).listen(PORT, () => {
  console.log(
    `Mobile Hashing Server is running securely on https://aspirewithalina.com:${PORT}`
  );
});

// app.listen(PORT, () => {
//     console.log(`Mobile hashing server is running on port ${PORT}`);
// });
