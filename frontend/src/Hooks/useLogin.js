import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleStartLogin } from "../Tools/MemberFunctions";
import { handleLogin } from "../Redux/Actions";
import { toast } from "react-toastify";

const KAKAO_AUTH_URL =
  "http://ec2-3-34-91-147.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/kakao";

export default function useLogin() {
  const userState = useSelector((state) => state.UserReducer);
  const isDark = useSelector((state) => state.ModeReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm();

  const handleSignIn = async (data) => {
    const result = await handleStartLogin(data);

    if (result) {
      dispatch(handleLogin(result));
      navigate("/");
      toast("로그인에 성공하셨습니다.");
    } else {
      toast("로그인에 실패하셨습니다.");
    }
  };

  const handleSocialLogin = async () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return {
    userState,
    isDark,
    handleSubmit,
    handleSignIn,
    register,
    handleSocialLogin,
    navigate,
    location,
  };
}
