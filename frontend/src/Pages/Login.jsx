import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { users } from "../Dummy/DummyDatas";
import { handleLogin } from "../Redux/Actions";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isDark ? "var(--black-600)" : "var(--white-100)"};
  transition: all 0.5s linear;
`;

const Logo = styled.img`
  width: 80%;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 80%;
  height: 70px;
  border: none;
  padding-left: 20px;
  font-size: 20px;
  border-radius: 70px;
  margin-bottom: 20px;
  border: 1px solid var(--gray-400);
  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white)"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black)")};
  transition: all 0.5s linear;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Others = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Space = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: ${(props) => props.pos};
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: var(--emerald-600);
  color: var(--white);
  border: none;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: bold;
`;

const SocialLogin = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: var(--emerald-600);
  color: var(--white);
  border: none;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const AccountRelated = styled.span`
  color: var(--emerald-700);
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
`;

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, setFocus } = useForm();

  const isDark = useSelector((state) => state.modeReducer);
  const dispatch = useDispatch();

  const handleSignIn = (data) => {
    const { id, password } = data;

    // 로그인

    // --- 테스트용 코드 ---

    const dummyUser = users[0];

    if (dummyUser.id !== id) {
      alert("아이디가 일치하지 않습니다.");
      return;
    }

    if (dummyUser.password !== password + "") {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    dispatch(handleLogin(dummyUser));

    // -----------

    navigate("/");
  };

  return (
    <Wrapper>
      <Form isDark={isDark} onSubmit={handleSubmit(handleSignIn)}>
        <Logo src={isDark ? "/img/Logo_Dark.png" : "/img/Logo_Light.png"} />
        <Input
          isDark={isDark}
          id="id"
          placeholder="ID를 입력하세요."
          {...register("id", { required: true })}
        />
        <Input
          isDark={isDark}
          type="password"
          placeholder="비밀번호를 입력하세요."
          {...register("password", { required: true })}
        />
        <Others>
          <Space pos={"start"}>
            <Link to="/account-search">
              <AccountRelated>아이디/비밀번호 찾기</AccountRelated>
            </Link>
            <Link to="/signup">
              <AccountRelated>회원가입</AccountRelated>
            </Link>
          </Space>
          <Space pos={"end"}>
            <Button>Log In</Button>
            <SocialLogin>네이버로 로그인</SocialLogin>
          </Space>
        </Others>
      </Form>
    </Wrapper>
  );
}
