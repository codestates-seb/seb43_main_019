import styled from "@emotion/styled";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../Redux/Actions";
import { handleKakaoLogin } from "../utils/MemberFunctions";
=======
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../Redux/Actions";
import { getMemberInfo, handleKakaoLogin } from "../utils/MemberFunctions";
>>>>>>> 3aea466f6bedd903078017ae14126536a9a67190
import Spinner from "../Components/Common/Spinner";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(location.search);

      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");

      const validTokens = accessToken.split(".");

      const encoded = validTokens[1];

      const sanitizedString = encoded.replace(/-/g, "+").replace(/_/g, "/");

      const decoded = decodeURIComponent(
        Array.prototype.map
          .call(atob(sanitizedString), function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const decodedObject = JSON.parse(decoded);

      const kakaoUser = {
        memberId: decodedObject.memberId,
        nickname: decodedObject.nickname,
        email: decodedObject.nickname,
      };

      const userInfo = await getMemberInfo(kakaoUser.memberId);

      if (userInfo) {
        dispatch(handleLogin(userInfo));
      } else {
        dispatch(handleLogin(kakaoUser));
      }

      navigate("/");
    })();
  }, []);

  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}
