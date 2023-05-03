import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 0;
  background-color: ${(props) =>
    props.isDark ? props.theme.dark.bgColor : props.theme.light.bgColor};
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

  background-color: ${(props) =>
    props.isDark ? props.theme.dark.formColor : props.theme.light.formColor};
  border-radius: 20px;
  border: 1px solid black;
`;

const Line = styled.div`
  width: 60%;
  margin: 10px 0;
  display: flex;
  justify-content: start;
  @media screen and (max-width: 900px) {
    justify-content: center;
  }
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 50px;
  border: none;
  padding-left: 10px;
  font-size: 15px;
  border-radius: 10px;

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
    props.isDark
      ? (props) => props.theme.dark.btnColor
      : props.theme.light.btnColor};
`;

export default function Join() {
  const navigate = useNavigate();
  const { register, handleSubmit, setFocus } = useForm();
  const isDark = useSelector((state) => {
    return state.mode.isDark;
  });

  const handleJoin = (data) => {
    const { id, password, password2, name, callNumber, birthDate, email } =
      data;

    // 비밀번호와 비밀번호 확인이 일치하지 않는 경우
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다!");
      setFocus("password");
      return;
    }

    alert("성공!");
    navigate("/login");
  };

  return (
    <Wrapper isDark={isDark}>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(handleJoin)}>
        <Line>
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            placeholder="ID를 입력하세요/"
            {...register("id", { required: true })}
          />
        </Line>
        <Line>
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password", { required: true })}
          />
        </Line>
        <Line>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            placeholder="비밀번호 확인을 위해 다시 입력해주세요."
            {...register("password2", { required: true })}
          />
        </Line>
        <Line>
          <Label>이름</Label>
          <Input
            placeholder="이름을 입력하세요."
            {...register("name", { required: true })}
          />
        </Line>
        <Line>
          <Label>전화번호</Label>
          <Input
            placeholder="'-'를 제외한 전화번호를 입력하세요."
            {...register("callNumber", { required: true })}
          />
        </Line>
        <Line>
          <Label>생년월일</Label>
          <Input type="date" {...register("birthDate", { required: true })} />
        </Line>
        <Line>
          <Label>이메일</Label>
          <Input
            type="email"
            placeholder="이메일을 입력하세요."
            {...register("email", { required: true })}
          />
        </Line>
        <Button isDark={isDark}>회원가입</Button>
      </Form>
    </Wrapper>
  );
}
