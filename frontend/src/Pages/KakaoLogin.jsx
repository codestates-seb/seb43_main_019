import styled from "@emotion/styled";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleLogin } from "../Redux/Actions";

import Spinner from "../Components/Common/Spinner";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
