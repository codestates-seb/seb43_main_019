import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { CommonButton } from "../Components/Common/Button";
import { Input, AuthCodeInput } from "../Components/Common/Input";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
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
  padding-bottom: 30px;
`;

const Logo = styled.img`
  width: auto;
  height: 90px;
  padding-top: 50px;
  margin-bottom: 20px;
`;

const TypeBtns = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-left: 120px;
  /* justify-content: space-around; */
`;

const TypeBtn = styled.button`
  position: relative;
  overflow: hidden;
  border: none;
  color: var(--black-700);
  display: inline-block;
  font-size: 13px;
  line-height: 13px;
  /* padding: 16px 16px 15px; */
  text-decoration: none;
  cursor: pointer;
  background: var(--white);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;
`;

const AuthCodeLine = styled.div`
  width: 80%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <div>
        <Logo src={"/img/Logo_Light.png"} />
        <Logo src="/img/Camp.png"/>
        </div>
        <TypeBtns>
          <div>
          <TypeBtn
            onClick={() => handleType(findType, "id")}
            current={findType === "id"}
          >
            아이디 찾기
          </TypeBtn>
          </div>
          <div>
          <TypeBtn
            onClick={() => handleType(findType, "password")}
            current={findType === "password"}
          >
            비밀번호 찾기
          </TypeBtn>
          </div>
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
        <CommonButton onClick={handleSubmit} disabled={authRequired}>{`${
          findType === "id" ? "아이디" : "비밀번호"
        } 찾기`}</CommonButton>
        {authRequired && (
          <AuthCodeLine>
            <AuthCodeInput
              value={code}
              onChange={(event) => setCode((prev) => event.target.value)}
              placeholder="인증번호를 입력하세요."
            />
            <CommonButton onClick={handleAuth}>확인</CommonButton>
          </AuthCodeLine>
        )}
      </Form>
    </Wrapper>
  );
}
