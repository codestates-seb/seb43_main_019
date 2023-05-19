import styled from "@emotion/styled";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../Redux/Actions";
import { handleKakaoLogin } from "../utils/MemberFunctions";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.h1``;

export default function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    console.log(accessToken);

    const validTokens = accessToken.split(".");

    const encodedUserInfo = validTokens[1];

    const sanitizedString = encodedUserInfo
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decodedUserInfo = decodeURIComponent(
      Array.prototype.map
        .call(atob(sanitizedString), function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const decodedObject = JSON.parse(decodedUserInfo);

    const user = {
      memberId: decodedObject.memberId,
      nickname: decodedObject.nickname,
      email: decodedObject.nickname,
    };

    dispatch(handleLogin(user));
    navigate("/");
  }, []);

  return (
    <Wrapper>
      <Loader>잠시만 기다려주세요...</Loader>
    </Wrapper>
  );
}
