import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import flash from "express-flash";
import https from "https";
import fs from "fs";
import MongoStore from "connect-mongo";
import rootRouter from "./src/routers/rootRouter";
import userRouter from "./src/routers/userRouter";
const cookieParser = require("cookie-parser");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const PORT = 4000;
const HTTPS_PORT = PORT;
const app = express();
const logger = morgan("dev");

app.use(
  session({
    // secret: process.env.COOKIE_SECRET, // 쿠키에 sign 할 때 사용하는 string
    secret: "secret", // 쿠키에 sign 할 때 사용하는 string
    resave: false,
    saveUninitialized: true, // 세션이 새로 만들어지고 수정된 적이 없을 때 => uninitialized
    cookie: {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    },
    // store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());

const corsOptions = {
  /* TODO: CORS 설정이 필요합니다. 클라이언트가 어떤 origin인지에 따라 달리 설정할 수 있습니다.
   * 메서드는 GET, POST, OPTIONS를 허용합니다.
   */
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(flash());

// 나중에 필요할지도 모르는 코드 두 줄
//app.use("/uploads", express.static("uploads")); // uploads 폴더를 노출시킴
// app.use("/static", express.static("assets"));

// app.use(localMiddleware);
app.use("/user", userRouter);
app.use("/", rootRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);

// (Optional) https 서버를 실행합니다.
// 아래 코드는 인증서 파일이 존재하지 않는 경우에는 http 서버를, 존재하는 경우에는 https 서버를 실행합니다.
// https 프로토콜을 사용하는 서버를 실행해보고 싶다면, mkcert를 사용해 인증서 파일을 server 폴더 안에 만들어주세요.
/*
let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () =>
    console.log(`🚀 HTTPS Server is starting on ${HTTPS_PORT}`)
  );
} else {
  server = app.listen(HTTPS_PORT, () =>
    console.log(`🚀 HTTP Server is starting on ${HTTPS_PORT}`)
  );
}
module.exports = server;
*/
