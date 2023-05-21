import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SellSideMenu from "../Components/SellSideMenu";
import Registration from "../Components/Sell/Registration";
import ProductList from "../Components/Sell/ProductList";
import Reservation from "../Components/Sell/Reservation";
import Statistic from "../Components/Statistic";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-y: auto; /* 스크롤이 가능한 요소로 설정 */
`;

const sellMenu = ["registration", "list", "statistic"];

export default function Sell() {
  const navigate = useNavigate();
  const params = useParams();
  const [selected, setSelected] = useState("");
  const userState = useSelector((state) => state.userReducer);

  const handleMenuClick = (clicked) => {
    navigate(`/sell/${clicked}`);
  };

  useEffect(() => {
    // 만약 로그인한 상태가 아니라면 로그인 페이지로 이동
    if (userState.login === false || userState.userInfo === null) {
      navigate("/login");
      return;
    }

    // 만약 판매자가 아니라면 my page로 이동
    if (userState.userInfo.seller === false) {
      navigate("/mypage");
    }
  }, []);

  useEffect(() => {
    let menu = params["*"];

    if (sellMenu.indexOf(menu) === -1) {
      navigate("/sell/registration");
    }

    setSelected((prev) => menu);
  }, [params]);

  return (
    <Wrapper>
      <SellSideMenu current={selected} handleMenuClick={handleMenuClick} />
      {selected === "registration" && (
        <Registration seller={userState.userInfo} />
      )}
      {selected === "list" && <ProductList seller={userState.userInfo} />}
      {selected === "statistic" && <Statistic />}
    </Wrapper>
  );
}
