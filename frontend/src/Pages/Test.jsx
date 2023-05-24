import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Review from "../Components/Review";
import { useSelector } from "react-redux";

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
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState("");

  const inputName = (event) => {
    setName((prev) => event.target.value);
  };

  const inputAge = (event) => {
    setAge((prev) => event.target.value);
  };

  const inputPhone = (event) => {
    setPhone((prev) => event.target.value);
  };

  const submitInfo = (event) => {
    event.preventDefault();

    console.log(`입력한 이름: ${name}`);
    console.log(`입력한 나이: ${age}`);
    console.log(`입력한 전화번호: ${phone}`);
  };

  return (
    <Wrapper>
      <Form onSubmit={submitInfo}>
        <Input value={name} onChange={inputName} placeholder="이름 입력" />
        <Input value={name} onChange={inputName} placeholder="이름 입력" />
        <Input value={name} onChange={inputName} placeholder="이름 입력" />

        <Button>제출</Button>
      </Form>
    </Wrapper>
  );
}
