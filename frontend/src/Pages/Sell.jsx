import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SellSideMenu from "../Components/SellSideMenu";
import ProductCRUD from "../Components/ProductCRUD";
import ProductManage from "../Components/ProductManage";
import Reservation from "../Components/Reservation";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
`;

const types = ["crud", "manage", "inquiry", "reservation", "category"];

export default function Sell() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);
  const [type, setType] = useState("");
  const [hasUploaded, setHasUploaded] = useState(false);

  // const location = useLocation();
  const params = useParams();

  const handleType = (clickedType) => {
    setType((prev) => clickedType);
    navigate(`/sell/${clickedType}`);
  };

  useEffect(() => {
    // 만약 로그인한 상태가 아니라면 로그인 페이지로 이동
    if (userState.login === false || userState.userInfo === null) {
      // navigate("/login");
      return;
    }

    // 만약 판매자가 아니라면 my page로 이동
    if (userState.userInfo.seller === false) {
      // navigate("/mypage");
    }
  }, []);

  useEffect(() => {
    let param = params["*"];

    if (param === "" || types.indexOf(param) === -1) {
      navigate("/sell/crud");
      setType((prev) => "crud");
    } else {
      setType((prev) => param);
    }
  }, []);

  return (
    <Wrapper>
      <SellSideMenu type={type} handleType={handleType} />
      {type === "crud" && (
        <ProductCRUD
          hasUploaded={hasUploaded}
          setHasUploaded={setHasUploaded}
        />
      )}
      {type === "manage" && <ProductManage />}
      {type === "reservation" && <Reservation />}
    </Wrapper>
  );
}
