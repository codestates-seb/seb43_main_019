import styled from "@emotion/styled";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleLogin } from "../Redux/Actions";
import { handleKakaoLogin } from "../utils/MemberFunctions";
import Spinner from "../Components/Common/Spinner";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default function KakaoLogin2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];

  const getKakaoToken = async () => {
    const userInfo = await handleKakaoLogin(KAKAO_CODE);

    // dispatch(handleLogin(userInfo));
    navigate("/");
  };

  useEffect(() => {
    if (!location.search) return;

    getKakaoToken();
  }, []);

  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}
