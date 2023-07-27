import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmailCode, handleJoin } from "../Tools/MemberFunctions";
import {
  checkValidPassword,
  checkValidPhone,
  makePhone,
} from "../Tools/Functions";

export default function useSignUp() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [code, setCode] = useState("");
  const [today, setToday] = useState("");
  const [authCode, setAuthCode] = useState("");

  const isDark = useSelector((state) => state.ModeReducer);
  const userState = useSelector((state) => state.UserReducer);

  const navigate = useNavigate();

  const { register, handleSubmit, setFocus } = useForm();

  const handleCode = (event) => {
    setCode((prev) => event.target.value);
  };

  const handleVerificationSubmit = async () => {
    if (authCode === null) {
      toast("인증코드 발송에 실패했습니다.");
      return;
    }

    if (code === authCode) {
      toast("인증 성공!");
      setIsEmailVerified((prev) => true);
      setAuthRequired((prev) => false);
    } else {
      toast("인증에 실패하였습니다.");
      setCode((prev) => "");
    }
  };

  const handleStartJoin = async (data) => {
    let { password, password2, name, phone, birthDate, email } = data;

    // 비밀번호와 비밀번호 확인이 일치하지 않는 경우
    if (password !== password2) {
      toast("비밀번호가 일치하지 않습니다!");
      setFocus("password");
      return;
    }

    // 생년월일이 이상한 경우
    if (birthDate >= today) {
      toast("생년월일이 이상합니다!");
      setFocus("birthDate");
      return;
    }

    if (authRequired === false && isEmailVerified === false) {
      const result = await getEmailCode(email);
      console.log(result);
      setAuthCode((prev) => result);

      setAuthRequired((prev) => true);
      return;
    }

    if (checkValidPassword(password) === false) {
      toast("비밀번호 양식이 맞지 않습니다.");
      return;
    }

    if (phone.length !== 10 && phone.length !== 11) {
      toast("전화번호 양식이 맞지 않습니다.");
      return;
    }

    phone = makePhone(phone);

    if (checkValidPhone(phone) === false) {
      toast("전화번호 양식이 맞지 않습니다.");
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
      toast("성공!");
      navigate("/login");
    } else {
      toast("회원가입에 실패했습니다.");
    }
  };

  return {
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
  };
}
