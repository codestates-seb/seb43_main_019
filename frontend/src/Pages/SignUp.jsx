import { useEffect } from "react";
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
  background-color: var(--emerald-600);
  color: var(--white);
  font-size: 15px;
  font-weight: bold;
`;

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, setFocus } = useForm();
  const isDark = useSelector((state) => state.modeReducer);

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
      <Form isDark={isDark} onSubmit={handleSubmit(handleJoin)}>
        <Logo src={isDark ? "/img/Logo_Dark.png" : "/img/Logo_Light.png"} />
        <Line>
          <Label htmlFor="id">ID</Label>
          <Input
            isDark={isDark}
            id="id"
            placeholder="ID를 입력하세요."
            {...register("id", { required: true })}
          />
        </Line>
        <Line>
          <Label>비밀번호</Label>
          <Input
            isDark={isDark}
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password", { required: true })}
          />
        </Line>
        <Line>
          <Label>비밀번호 확인</Label>
          <Input
            isDark={isDark}
            type="password"
            placeholder="비밀번호 확인을 위해 다시 입력해주세요."
            {...register("password2", { required: true })}
          />
        </Line>
        <Line>
          <Label>이름</Label>
          <Input
            isDark={isDark}
            placeholder="이름을 입력하세요."
            {...register("name", { required: true })}
          />
        </Line>
        <Line>
          <Label>전화번호</Label>
          <Input
            isDark={isDark}
            placeholder="'-'를 제외한 전화번호를 입력하세요."
            {...register("callNumber", { required: true })}
          />
        </Line>
        <Line>
          <Label>생년월일</Label>
          <Input
            isDark={isDark}
            type="date"
            {...register("birthDate", { required: true })}
          />
        </Line>
        <Line>
          <Label>이메일</Label>
          <Input
            isDark={isDark}
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
