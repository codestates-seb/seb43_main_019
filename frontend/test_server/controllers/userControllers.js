import axios from "axios";
import { dummyAccounts } from "../datas/dummyAccounts";
import { generateToken, verifyToken } from "./helper/tokenFunctions";
require("dotenv").config();

const ACCESS = "access";
const REFRESH = "refresh";

const codes = {
  ok: 200,
  resetContent: 205,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
};

const cookieOption = {
  domain: "localhost",
  path: "/",
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

const refreshCookieOption = {
  domain: "localhost",
  path: "/",
  httpOnly: true,
  sameSite: "none",
  secure: true,
  expires: new Date(Date.now() + 24 * 3600 * 1000 * 7),
};

export const login = async (req, res) => {
  const { userId, password } = req.body.loginInfo;

  const userInfo = dummyAccounts.find(
    (account) => account.userId === userId && account.password === password
  );

  if (userInfo === undefined) {
    res.status(codes.unauthorized).send("Not Authorized");
  }

  const { accessToken, refreshToken } = generateToken(userInfo, true);

  res.cookie("refresh_jwt", refreshToken, refreshCookieOption);
  res.cookie("access_jwt", accessToken, cookieOption);

  res.redirect("userInfo");
};

export const logout = (req, res) => {
  const { cookies } = req;
  const refreshToken = cookies.refresh_jwt;

  if (refreshToken) {
    res.clearCookie("refresh_jwt", cookieOption);
  }
  res.clearCookie("access_jwt", cookieOption);

  return res.status(205).send("Logged Out Successfully");
};

export const checkUserInfo = (req, res) => {
  const { cookies } = req;

  const accessToken = cookies.access_jwt;
  const refreshToken = cookies.refresh_jwt;
  const accessPayload = verifyToken(ACCESS, accessToken);

  if (accessPayload) {
    const { id } = accessPayload;
    const userInfo = dummyAccounts.find((account) => account.id === id);

    if (!userInfo) {
      return res.status(401).send("Not Authorized");
    }

    return res.json({ ...userInfo, password: "알려주지않는다." });
  } else if (refreshToken) {
    const refreshPayload = verifyToken(REFRESH, refreshToken);

    if (!refreshPayload) {
      return res.status(401).send("Not Authorized");
    }

    const { id } = refreshPayload;
    const userInfo = dummyAccounts.find((account) => account.id === id);

    const { accessToken } = generateToken(userInfo);

    res.cookie("access_jwt", accessToken, cookieOption);

    return res.json({ ...userInfo, password: "알려주지않는다." });
  }

  return res.status(401).send("Not Authorized");
};

export const kakaoLogin = async (req, res) => {
  const { KAKAO_CODE } = req.body;

  const result = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=authorization_code&client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&code=${KAKAO_CODE}`,
  });

  const data = await result.json();

  console.log("=== Data!!! ===");
  console.log(data);
  console.log("===================");

  const { access_token } = data;
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  try {
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers,
    });
    const kakaoUserData = userResponse.data;

    console.log("=== kakaoUserData!!! ===");
    console.log(kakaoUserData);
    console.log("===================");

    let userInfo = dummyAccounts.find(
      (account) =>
        account.kakao &&
        account.kakao.kakao_account.profile.nickname ===
          kakaoUserData.kakao_account.profile.nickname
    );

    if (userInfo === undefined) {
      // 해당 (카카오) 계정이 없는 계정일 경우
      // 회원가입을 한 후 진행한다.

      const newAccount = {
        id: dummyAccounts.length + "",
        userId: kakaoUserData.id + "",
        password: "",
        name: kakaoUserData.kakao_account.profile.nickname,
        callNumber: "",
        birthDate: kakaoUserData.kakao_account.birthday,
        email: kakaoUserData.kakao_account.email,
        seller: false,
        kakao: kakaoUserData,
      };

      dummyAccounts.push(newAccount);

      userInfo = newAccount;
    }
    const { accessToken, refreshToken } = generateToken(userInfo, true);

    res.cookie("refresh_jwt", refreshToken, refreshCookieOption);
    res.cookie("access_jwt", accessToken, cookieOption);

    res.redirect("userInfo");
  } catch (error) {
    return res.status(401).send("Not Authorized");
  }
};

export const join = (req, res) => {
  const { userId, password } = req.body.joinInfo;

  const userInfo = dummyAccounts.find((account) => account.userId === userId);

  if (userInfo === undefined) {
    const newAccount = { id: dummyAccounts.length + "", ...req.body.joinInfo };
    dummyAccounts.push(newAccount);

    res.status(codes.ok).end();
  } else {
    res.status(codes.unauthorized).send("동일한 ID가 존재합니다.");
  }
};
