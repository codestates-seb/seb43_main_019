import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Form = styled.form`
  width: 500px;
  height: 300px;
  border: 1px solid black;
  margin-top: 100px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  height: 30px;
  border-radius: 10px;
  padding-left: 20px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
`;

export default function Test() {
  const { register, handleSubmit } = useForm();

  const submitInfo = (event) => {
    const { name, age, phone } = event;

    console.log(`입력한 이름: ${name}`);
    console.log(`입력한 나이: ${age}`);
    console.log(`입력한 전화번호: ${phone}`);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(submitInfo)}>
        <Input
          placeholder="이름 입력"
          {...register("name", { required: true })}
        />
        <Input
          placeholder="나이 입력"
          {...register("age", { required: true })}
        />
        <Input
          placeholder="전화번호 입력"
          {...register("phone", { required: true })}
        />

        <Button>제출</Button>
      </Form>
    </Wrapper>
  );
}
