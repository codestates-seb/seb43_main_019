import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Menus from "../Components/Admin/Menus";
import UserManagement from "../Components/Admin/UserManagement";
import ProductManagement from "../Components/Admin/ProductManagement";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 160px;
`;

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const menuToTitle = (menu) => {
  switch (menu) {
    case "total-statistics":
      return "전체통계";
    case "user-management":
      return "유저관리";
    case "product-management":
      return "상품관리";
    default:
      return "관리자 메뉴 선택";
  }
};

const adminMenus = ["total-statistics", "user-management", "productmanagement"];

export default function Admin() {
  const [selected, setSelected] = useState("");

  const userState = useSelector((state) => state.UserReducer);

  const navigate = useNavigate();
  const params = useParams();

  const handleMenuClick = (clicked) => {
    navigate(`/admin/${clicked}`);
  };

  useEffect(() => {
    const menu = params["*"];

    setSelected((prev) => menu);
  }, [params]);

  useEffect(() => {
    if (userState.login === false) {
      navigate("/404");
      return;
    }

    if (userState.userInfo.roles.includes("ADMIN") === false) {
      navigate("/404");
      return;
    }

    const menu = params["*"];

    // 만약 menu가 이상하면 관리자 메뉴 선택 페이지로
    if (adminMenus.indexOf(menu) === -1) {
      navigate("/admin");
    }
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>{menuToTitle(selected)}</Title>
        {selected === "" && <Menus handleMenuClick={handleMenuClick} />}
        {selected === "user-management" && <UserManagement />}
        {selected === "product-management" && <ProductManagement />}
      </Container>
    </Wrapper>
  );
}
