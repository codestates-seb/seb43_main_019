import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { CommonButton } from "../Components/Common/Button";
import { Input, AuthCodeInput } from "../Components/Common/Input";
import { Label, Label02, Label03 } from "../Components/Common/Label";
import { Line, Line2, Line3, Line4 } from "../Components/Common/Line";
import {
  checkValidPassword,
  checkValidPhone,
  getToday,
  makePhone,
} from "../Tools/Functions";
import { getEmailCode, handleJoin } from "../Tools/MemberFunctions";

import "react-toastify/dist/ReactToastify.css";
import useSignUp from "../Hooks/useSignUp";

const Wrapper = styled.div`
  width: 100%;
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
  /* justify-content: center; */
  flex-direction: column;
  /* gap: 12px; */
  border-radius: 20px;
  border: 1px solid var(--black-500);
  margin-top: 80px;
  padding-bottom: 30px;

  @media screen and (max-width: 400px) {
    margin-top: 120px;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 130px;
  padding-top: 50px;
  margin-bottom: 20px;
`;

const AuthCodeLine = styled.div`
  width: 80%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function SignUp() {
  const {
    isDark,
    handleSubmit,
    handleStartJoin,
    register,
    authRequired,
    isEmailVerified,
    code,
    handleCode,
    handleVerificationSubmit,
    userState,
    navigate,
    setToday,
  } = useSignUp();

  useEffect(() => {
    if (userState.login) {
      navigate("/");
    }

    setToday((prev) => getToday());
  }, []);

  return (
    <Wrapper isDark={isDark}>
      <Form isDark={isDark} onSubmit={handleSubmit(handleStartJoin)}>
        <div>
          <Logo src={"/img/add-user.png"} />
        </div>
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
        <Line3>
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
        </Line3>
        <Line4>
          <Label03>비밀번호는 최소 8자리 이상이여야하며,</Label03>
        </Line4>
        <Line2>
          <Label02>대소문자,특수문자를 포함해주세요.</Label02>
        </Line2>
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
        <Line3>
          <Label isDark={isDark} htmlFor="callNumber">
            전화번호
          </Label>
          <Input
            id="phone"
            isDark={isDark}
            placeholder="'-'를 제외한 전화번호를 입력하세요."
            {...register("phone", { required: true })}
          />
        </Line3>
        <Line2>
          <Label03>전화번호는 010/011로 시작해야 합니다.</Label03>
        </Line2>
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
        <CommonButton disabled={authRequired}>
          {isEmailVerified ? "회원가입" : "이메일 인증"}
        </CommonButton>
        {authRequired && (
          <AuthCodeLine>
            <AuthCodeInput
              value={code}
              onChange={handleCode}
              placeholder="인증번호를 입력하세요."
            />
            <CommonButton onClick={() => handleVerificationSubmit()}>
              확인
            </CommonButton>
          </AuthCodeLine>
        )}
      </Form>
      <ToastContainer /> {/* 알림 메시지 컨테이너 */}
    </Wrapper>
  );
}
