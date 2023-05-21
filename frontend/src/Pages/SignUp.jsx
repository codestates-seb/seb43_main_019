import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../Components/Common/Button";
import { Input, AuthCodeInput } from "../Components/Common/Input";
import { Label, Label02, Label03 } from "../Components/Common/Label";
import { getToday } from "../utils/functions";
import { getEmailCode, handleJoin } from "../utils/MemberFunctions";
import { checkValidPassword, checkValidPhone } from "../utils/functions";
import { Line, Line2, Line3, Line4 } from "../Components/Common/Line";

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
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [code, setCode] = useState("");
  const [today, setToday] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [authRequired, setAuthRequired] = useState(false);
  const { register, handleSubmit, setFocus, watch } = useForm();
  const isDark = useSelector((state) => state.modeReducer);
  const userState = useSelector((state) => state.userReducer);

  const handleCode = (event) => {
    setCode((prev) => event.target.value);
  };

  // 중복 아이디를 검사하는 함수. true: 중복 / false: 중복 아님
  const checkDuplicateId = (id) => {
    return false;
  };

  // 이미 존재하는 회원인 경우. true: 중복 / false: 중복 아님
  const checkDuplicateUser = (name, phone, birthDate, email) => {
    return false;
  };

  const handleVerificationSubmit = async () => {
    // const email = watch("email");

    if (authCode === null) {
      alert("인증코드 발송에 실패했습니다.");
      return;
    }

    if (code === authCode) {
      alert("인증 성공!");
      setIsEmailVerified((prev) => true);
      setAuthRequired((prev) => false);
    } else {
      alert("인증에 실패하였습니다.");
      setCode((prev) => "");
    }
  };

  const handleStartJoin = async (data) => {
    const { id, password, password2, name, phone, birthDate, email } = data;

    // 이미 존재하는 아이디인 경우
    if (checkDuplicateId(id)) {
      alert("이미 존재하는 아이디입니다.");
      setFocus("birthDate");
      return;
    }

    // 이미 회원가입한 경우
    if (checkDuplicateUser(name, phone, birthDate, email)) {
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
      const result = await getEmailCode(email);
      setAuthCode((prev) => result);

      console.log(`Code = ${result}`);

      setAuthRequired((prev) => true);
      return;
    }

    if (checkValidPassword(password) === false) {
      alert("비밀번호 양식이 맞지 않습니다.");
      return;
    }

    if (checkValidPhone(phone) === false) {
      alert("전화번호 양식이 맞지 않습니다.");
      return;
    }

    const joinInfo = {
      name,
      email,
      birthDate,
      password,
      phone,
      isEmailVerified: true,
      isSellerVerified: false,
      businessRegistrationNumber: "000-00-00000",
    };

    const success = await handleJoin(joinInfo);

    if (success === true) {
      alert("성공!");
      navigate("/login");
    } else {
      alert("회원가입에 실패했습니다.");
    }
  };

  // 가장 먼저 로그인한 상태인지, 현재 날짜를 확인한다.
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
            placeholder="'-'를 포함한 전화번호를 입력하세요."
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
    </Wrapper>
  );
}
