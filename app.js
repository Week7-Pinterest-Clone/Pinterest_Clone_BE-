const express = require("express");
const Http = require("http");
const cors = require("cors");

const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;

app.use(cors());

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
