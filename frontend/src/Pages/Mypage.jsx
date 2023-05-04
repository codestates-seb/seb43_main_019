import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: bold;
  margin: 50px 0;
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px 0;

  border-radius: 20px;
  border: 1px solid black;
`;

const Line = styled.div`
  width: 60%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  padding-left: 10px;
  font-size: 15px;
  border-radius: 10px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  margin: 10px 0;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const AdditionalBtn = styled.div`
  width: 80%;
  height: 50px;
  border-radius: 20px;

  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export default function Mypage() {
  const navigate = useNavigate();
  const { register, handleSubmit, setFocus } = useForm();
  const isDark = useSelector((state) => state.modeReducer);

  const handleJoin = (data) => {
    const { id, password } = data;

    // 로그인

    navigate("/");
  };

  return (
    <Wrapper isDark={isDark}>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(handleJoin)}>
        <Line>
          <Input
            id="id"
            placeholder="ID를 입력하세요."
            {...register("id", { required: true })}
          />
        </Line>
        <Line>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password", { required: true })}
          />
        </Line>
        <Button isDark={isDark}>로그인</Button>
        <AdditionalBtn isDark={isDark}>아이디 찾기</AdditionalBtn>
        <AdditionalBtn isDark={isDark}>비밀번호 찾기</AdditionalBtn>
        <AdditionalBtn isDark={isDark}>
          <FontAwesomeIcon
            icon={faComment}
            style={{ color: "#fff700", marginRight: "10px", fontSize: "30px" }}
          />
          카카오로 로그인
        </AdditionalBtn>
        <AdditionalBtn isDark={isDark}>회원가입</AdditionalBtn>
      </Form>
    </Wrapper>
  );
}
