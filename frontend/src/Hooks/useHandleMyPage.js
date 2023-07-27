import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLogout } from "../Redux/Actions";
import { getMemberInfo } from "../Tools/MemberFunctions";
import { useEffect } from "react";

export default function useHandleMyPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [openMyModal, setOpenMyModal] = useState(false);
  const [openRsModal, setOpenRsModal] = useState(false);
  const [openSeModal, setOpenSeModal] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [myInfo, setMyInfo] = useState({ name: "", phone: "" });

  const userState = useSelector((state) => state.UserReducer);
  const isDark = useSelector((state) => state.ModeReducer);

  const dispatch = useDispatch();

  const handleMyModal = (isOpen) => {
    if (typeof isOpen === "boolean") {
      setOpenMyModal(isOpen);
    }
  };

  const handleRsModal = (isOpen) => {
    if (typeof isOpen === "boolean") {
      setOpenRsModal(isOpen);
    }
  };

  const handleSeModal = (isOpen) => {
    if (typeof isOpen === "boolean") {
      setOpenSeModal(isOpen);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const data = await getMemberInfo(userState.userInfo);

      if (data === null) {
        toast("토큰이 만료되었습니다.");
        dispatch(handleLogout());
        navigate("/login");
        return;
      }

      setMyInfo((prev) => data);

      setIsLoading((prev) => false);
    })();
  }, []);

  return {
    isLoading,
    myInfo,
    isDark,
    openMyModal,
    handleMyModal,
    openRsModal,
    handleRsModal,
    openSeModal,
    handleSeModal,
    userState,
    isSeller,
    navigate,
  };
}
