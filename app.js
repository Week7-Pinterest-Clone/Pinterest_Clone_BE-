require("dotenv").config();
const express = require("express");
const Http = require("http");
const fs = require("fs");
const HTTPS = require("https");
const passport = require("passport");
const passportConfig = require("./passport");
const expressSession = require("express-session");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.routes");
const {
  errorLogger,
  errorHandler,
} = require("./middlewares/error-handler.middleware");

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.use(cors());

passportConfig();
app.use(express.static("public"));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: [process.env.KAKAO_SECRET],
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

if (process.env.NODE_ENV == "production") {
  try {
    const option = {
      ca: fs.readFileSync(
        `/etc/letsencrypt/live/${process.env.BACK_URL}/fullchain.pem`
      ),
      key: fs.readFileSync(
        `/etc/letsencrypt/live/${process.env.BACK_URL}/privkey.pem`
      ),
      cert: fs.readFileSync(
        `/etc/letsencrypt/live/${process.env.BACK_URL}/cert.pem`
      ),
    };
    HTTPS.createServer(option, app).listen(port, () => {
      console.log("HTTPS 서버가 실행되었습니다. 포트 :: " + port);
    });
  } catch (error) {
    console.log("HTTPS 서버가 실행되지 않습니다.");
    console.log(error);
  }
} else {
  app.listen(port, () => {
    console.log("HTTP 서버가 실행되었습니다. 포트 :: " + port);
  });
}
