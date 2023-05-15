import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleLogin } from "../Redux/Actions";
import axios from "axios";
import { useEffect } from "react";
import { REST_API_KEY, REDIRECT_URI } from "../secret";
import { LoginButton, SocialLogin } from "../Components/Common/Button";
import { handleStartLogin } from "../utils/functions";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  max-width: 450px;
  width: 80%;
  padding: 0 15px;
  text-align: center;
  background-color: ${(props) =>
    props.isDark ? "var(--white-50)" : "var(--white)"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  border-radius: 20px;
  border: 1px solid var(--black-500);
  margin-top: 80px;
`;

const Space = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: ${(props) => props.pos};
  margin-right: 110px;
`;

const Logo = styled.img`
  width: auto;
  height: 90px;
  padding-top: 50px;
  margin-bottom: 20px;
`;

const AccountRelated = styled.span`
  color: var(--black-700);
  font-size: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const Input = styled.input`
  width: 50%;
  height: 40px;
  border: none;
  font-size: 13px;
  outline: 0;
  background: rgb(255, 255, 255);
  box-shadow: transparent 0px 0px 0px 1px inset;
  padding: 0.6em;
  border-radius: 14px;
  border: 1px solid #333;
  color: black;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Others = styled.div`
  width: 80%;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const SocialLoginWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const KakaoImg = styled.img`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const userState = useSelector((state) => state.userReducer);
  const isDark = useSelector((state) => state.modeReducer);
  const dispatch = useDispatch();

  const handleSignIn = async (data) => {
    const result = await handleStartLogin(data);

    if (result) {
      dispatch(handleLogin(result));
      navigate("/");
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  const handleSocialLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    console.log(userState.login);
    if (userState.login) {
      navigate("/");
    }
  }, []);

  return (
    <Wrapper>
      <Form isDark={isDark} onSubmit={handleSubmit(handleSignIn)}>
        <div>
          <Logo src={"/img/Logo_Light.png"} />
          <Logo src="/img/Camp.png" />
        </div>
        <Space pos={"start"}>
          <Link to="/account-search">
            <AccountRelated>아이디/비밀번호 찾기</AccountRelated>
          </Link>
          <Link to="/signup">
            <AccountRelated>회원가입</AccountRelated>
          </Link>
        </Space>
        <Input
          isDark={isDark}
          id="id"
          placeholder="아이디를 입력해주세요."
          {...register("id", { required: true })}
        />
        <Input
          isDark={isDark}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password", { required: true })}
        />
        <Others>
          <div>
            <LoginButton>Log In</LoginButton>
          </div>
          <SocialLoginWrapper>
            <SocialLogin onClick={() => handleSocialLogin()}>
              <KakaoImg src={"/img/kakao.png"} />
              카카오 로그인
            </SocialLogin>
          </SocialLoginWrapper>
        </Others>
      </Form>
    </Wrapper>
  );
}
