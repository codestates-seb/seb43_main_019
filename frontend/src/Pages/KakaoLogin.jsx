import styled from "@emotion/styled";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../Redux/Actions";
import { getMemberInfo, handleKakaoLogin } from "../utils/MemberFunctions";
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
        ...decodedObject,
        accessToken: "Bearer " + accessToken,
      };

      // 이미 있는 계정인지 테스트
      // 이미 회원가입되어 있다 => 그 계정은 이메일 인증이 되어 있다.
      const account = await getMemberInfo(kakaoUser);

      if (account) {
        if (account.emailVerified === true) {
          alert("이미 존재하는 계정입니다.");
          navigate("/login");
        }
      }

      dispatch(handleLogin(kakaoUser));

      navigate("/");
    })();
  }, []);

  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}
