// Sell.jsx에서 주로 이용할 로직

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSellerInfo() {
  const sellMenu = ["registration", "list", "statistic"];

  const [selected, setSelected] = useState("");

  const userState = useSelector((state) => state.UserReducer);

  const navigate = useNavigate();
  const params = useParams();

  const handleMenuClick = (clicked) => {
    navigate(`/sell/${clicked}`);
  };

  useEffect(() => {
    let menu = params["*"];

    if (sellMenu.indexOf(menu) === -1) {
      navigate("/sell/registration");
    }

    setSelected((prev) => menu);

    // 만약 로그인한 상태가 아니라면 로그인 페이지로 이동
    if (userState.login === false || userState.userInfo === null) {
      toast("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    // 만약 판매자가 아니라면 my page로 이동
    if (userState.userInfo.roles.indexOf("SELLER") === -1) {
      toast("판매자가 아닙니다.");
      navigate("/mypage");
      return;
    }
  }, [params]);

  return { selected, handleMenuClick };
}
