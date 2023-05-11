import express from "express";
import {
  checkUserInfo,
  login,
  join,
  logout,
  kakaoLogin,
} from "../../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/join", join);
userRouter.get("/userInfo", checkUserInfo);
userRouter.post("/kakaologin", kakaoLogin);

export default userRouter;
