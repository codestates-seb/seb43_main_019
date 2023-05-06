import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 80%;
  margin-bottom: 50px;
`;

const Form = styled.div`
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

const TypeBtns = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TypeBtn = styled.div`
  cursor: pointer;
  width: 150px;
  height: 50px;
  background-color: var(--emerald-600);
  color: var(--white);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: ${(props) => props.current && "5px solid purple"};
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

const SubmitBtn = styled.div`
  cursor: pointer;
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props) =>
    props.disabled ? "gray" : "var(--emerald-600)"};
  color: var(--white);
  border: none;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
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
  cursor: pointer;
`;

const tempCode = "12345";

export default function AccountSearch() {
  const navigate = useNavigate();
  const [findType, setFindType] = useState("id");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);

  const isDark = useSelector((state) => state.modeReducer);

  const idRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleType = (current, target) => {
    if (current !== target) {
      setFindType((prev) => target);
    }
  };

  const handleAuth = () => {
    if (code === tempCode) {
      alert("인증에 성공했습니다.");
      setIsEmailVerified((prev) => true);
      setAuthRequired((prev) => false);
      return;
    } else {
      alert("인증 번호가 일치하지 않습니다.");
      return;
    }
  };

  const handleSubmit = () => {
    if (authRequired === false) {
      if (findType === "id") {
        if (name.length === 0) {
          alert("이름을 입력해주세요.");
          nameRef.current.focus();
          return;
        }
      } else if (findType === "password") {
        if (id.length === 0) {
          alert("아이디를 입력해주세요.");
          idRef.current.focus();
          return;
        }
      }
      if (email.length === 0) {
        alert("이메일을 입력해주세요.");
        emailRef.current.focus();
        return;
      }
    }

    if (authRequired === false && isEmailVerified === false) {
      setAuthRequired((prev) => true);
      return;
    }

    if (findType === "id") {
      alert("아이디: abcde");
    } else if (findType === "password") {
      alert("비밀번호: 12345");
    }

    navigate("/login");
  };

  return (
    <Wrapper>
      <Form isDark={isDark}>
        <Logo src={isDark ? "/img/Logo_Dark.png" : "/img/Logo_Light.png"} />
        <TypeBtns>
          <TypeBtn
            onClick={() => handleType(findType, "id")}
            current={findType === "id"}
          >
            아이디 찾기
          </TypeBtn>
          <TypeBtn
            onClick={() => handleType(findType, "password")}
            current={findType === "password"}
          >
            비밀번호 찾기
          </TypeBtn>
        </TypeBtns>
        {findType === "id" ? (
          <Input
            ref={nameRef}
            value={name}
            onChange={(event) => setName((prev) => event.target.value)}
            placeholder="이름을 입력하세요."
          />
        ) : (
          <Input
            ref={idRef}
            value={id}
            onChange={(event) => setId((prev) => event.target.value)}
            placeholder="아이디을 입력하세요."
          />
        )}
        <Input
          ref={emailRef}
          value={email}
          onChange={(event) => setEmail((prev) => event.target.value)}
          type="email"
          placeholder="이메일을 입력하세요."
        />
        <SubmitBtn onClick={handleSubmit} disabled={authRequired}>{`${
          findType === "id" ? "아이디" : "비밀번호"
        } 찾기`}</SubmitBtn>
        {authRequired && (
          <AuthCodeLine>
            <AuthCodeInput
              value={code}
              onChange={(event) => setCode((prev) => event.target.value)}
              placeholder="인증번호를 입력하세요."
            />
            <AuthCodeBtn onClick={handleAuth}>확인</AuthCodeBtn>
          </AuthCodeLine>
        )}
      </Form>
    </Wrapper>
  );
}
