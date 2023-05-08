import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
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

const Line = styled.div`
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  justify-content: start;

  @media screen and (max-width: 900px) {
    justify-content: center;
  }
`;

const Label = styled.label`
  width: 100px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black)")};
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 70px;
  border: 1px solid var(--gray-400);
  outline: none;
  padding-left: 20px;
  font-size: 15px;
  border-radius: 70px;
  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white)"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black)")};
  transition: all 0.5s linear;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) =>
    props.disabled ? "gray" : "var(--emerald-600)"};
  color: var(--white);
  font-size: 15px;
  font-weight: bold;
`;

const AuthCodeLine = styled.div`
  width: 80%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthCodeInput = styled.input`
  width: 70%;
  height: 70px;
  border: 1px solid var(--gray-400);
  outline: none;
  padding-left: 20px;
  font-size: 15px;
  border-radius: 70px;
  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white)"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black)")};
  transition: all 0.5s linear;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const AuthCodeBtn = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  background-color: var(--emerald-600);
  color: var(--white);
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const tempCode = "12345";

// 현재 날짜를 문자열로 반환하는 함수
// 예) "2023-05-06"
const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;

  return dateString;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [code, setCode] = useState("");
  const [today, setToday] = useState("");
  const [authRequired, setAuthRequired] = useState(false);
  const { register, handleSubmit, setFocus } = useForm();
  const isDark = useSelector((state) => state.modeReducer);

  const handleCode = (event) => {
    setCode((prev) => event.target.value);
  };

  // 중복 아이디를 검사하는 함수. true: 중복 / false: 중복 아님
  const checkDuplicateId = (id) => {
    return false;
  };

  // 이미 존재하는 회원인 경우. true: 중복 / false: 중복 아님
  const checkDuplicateUser = (name, callNumber, birthDate, email) => {
    return false;
  };

  const handleVerificationSubmit = () => {
    if (code === tempCode) {
      alert("인증 성공!");
      setIsEmailVerified((prev) => true);
      setAuthRequired((prev) => false);
    } else {
      alert("인증에 실패하였습니다.");
      setCode((prev) => "");
    }
  };

  const handleJoin = (data) => {
    const { id, password, password2, name, callNumber, birthDate, email } =
      data;

    // 이미 존재하는 아이디인 경우
    if (checkDuplicateId(id)) {
      alert("이미 존재하는 아이디입니다.");
      setFocus("birthDate");
      return;
    }

    // 이미 회원가입한 경우
    if (checkDuplicateUser(name, callNumber, birthDate, email)) {
      alert("이미 회원 등록이 되어있습니다.");
      navigate("/login");
      return;
    }

    // 비밀번호와 비밀번호 확인이 일치하지 않는 경우
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다!");
      setFocus("password");
      return;
    }

    // 생년월일이 이상한 경우
    if (birthDate >= today) {
      alert("생년월일이 이상합니다!");
      setFocus("birthDate");
      return;
    }

    if (authRequired === false && isEmailVerified === false) {
      setAuthRequired((prev) => true);
      return;
    }

    alert("성공!");
    navigate("/login");
  };

  // 가장 먼저 현재 날짜를 확인한다.
  useEffect(() => {
    setToday((prev) => getToday());
  }, []);

  return (
    <Wrapper isDark={isDark}>
      <Form isDark={isDark} onSubmit={handleSubmit(handleJoin)}>
        <Logo src={isDark ? "/img/Logo_Dark.png" : "/img/Logo_Light.png"} />
        <Line>
          <Label isDark={isDark} htmlFor="id">
            ID
          </Label>
          <Input
            isDark={isDark}
            id="id"
            placeholder="ID를 입력하세요."
            {...register("id", { required: true })}
          />
        </Line>
        <Line>
          <Label isDark={isDark} htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            isDark={isDark}
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password", { required: true })}
          />
        </Line>
        <Line>
          <Label isDark={isDark} htmlFor="password2">
            비밀번호 확인
          </Label>
          <Input
            id="password2"
            isDark={isDark}
            type="password"
            placeholder="비밀번호 확인을 위해 다시 입력해주세요."
            {...register("password2", { required: true })}
          />
        </Line>
        <Line>
          <Label isDark={isDark} htmlFor="name">
            이름
          </Label>
          <Input
            id="name"
            isDark={isDark}
            placeholder="이름을 입력하세요."
            {...register("name", { required: true })}
          />
        </Line>
        <Line>
          <Label isDark={isDark} htmlFor="callNumber">
            전화번호
          </Label>
          <Input
            id="callNumber"
            isDark={isDark}
            placeholder="'-'를 제외한 전화번호를 입력하세요."
            {...register("callNumber", { required: true })}
          />
        </Line>
        <Line htmlFor="birthDate">
          <Label isDark={isDark}>생년월일</Label>
          <Input
            id="birthDate"
            style={{ paddingRight: "100px" }}
            isDark={isDark}
            type="date"
            {...register("birthDate", { required: true })}
          />
        </Line>
        <Line>
          <Label isDark={isDark} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            isDark={isDark}
            type="email"
            placeholder="본인 확인을 위한 이메일을 입력하세요."
            {...register("email", { required: true })}
          />
        </Line>
        <Button disabled={authRequired}>
          {isEmailVerified ? "회원가입" : "이메일 인증"}
        </Button>
        {authRequired && (
          <AuthCodeLine>
            <AuthCodeInput
              value={code}
              onChange={handleCode}
              placeholder="인증번호를 입력하세요."
            />
            <AuthCodeBtn onClick={() => handleVerificationSubmit()}>
              확인
            </AuthCodeBtn>
          </AuthCodeLine>
        )}
      </Form>
    </Wrapper>
  );
}
