import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMemberInfo } from "../utils/MemberFunctions";
import { toast } from "react-toastify";

export default function CheckLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      const userInfo = await getMemberInfo(userState.userInfo);
      if (userInfo === null) {
        toast("토큰이 만료되었습니다.");
        navigate("/login");
      }
    })();
  }, [location]);

  return <></>;
}
