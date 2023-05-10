import styled from "@emotion/styled";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI } from "../secret";
import { useEffect } from "react";
const qs = require("qs");

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function KakaoLogin() {
  const navigate = useNavigate();

  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];

  const getKakaoToken = async () => {
    const result = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    });

    /*
    const body = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: KAKAO_CODE,
    };

    const config = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify(body),
      config
    );

    console.log(result);
    */
    /*
    const data = await result.json();
    console.log(data);

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
    } else {
      Navigate("/");
    }
    */
    /*
    // Kakao JavaScript SDK 초기화
    window.Kakao.init(REST_API_KEY);

    // access token 설정
    window.Kakao.Auth.setAccessToken(result.data.access_token);
    navigate("/profile");
    */
  };

  useEffect(() => {
    if (!location.search) return;

    getKakaoToken();
  }, []);

  return <Wrapper>{KAKAO_CODE}</Wrapper>;
}
