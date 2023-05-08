import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 500vh;
  display: flex;
`;

const SideMenu = styled.ul`
  max-width: 300px;
  width: 100%;
  position: fixed;
  top: 140px;
  left: 0;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const SideItem = styled.li`
  width: 100%;
  height: 70px;
  background-color: ${(props) =>
    props.current ? "var(--gray-200)" : "var(--white)"};
  display: flex;
  align-items: center;
  justify-items: start;
  padding-left: 20px;
  border-bottom: 1px solid var(--gray-400);
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: pink;
  margin-left: 300px;
  @media screen and (max-width: 900px) {
    margin-left: 0;
  }
`;

export default function Sell() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);
  const [type, setType] = useState("productCRUD");

  const handleType = (clickedType) => {
    setType((prev) => clickedType);
    navigate(`/sell/${type}`);
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

  return (
    <Wrapper>
      <SideMenu>
        <SideItem
          current={type === "productCRUD"}
          onClick={() => handleType("productCRUD")}
          style={{ borderTop: " 1px solid var(--gray-400)" }}
        >
          상품등록수정
        </SideItem>
        <SideItem
          current={type === "postingMgmt"}
          onClick={() => handleType("postingMgmt")}
        >
          상품게시물관리
        </SideItem>
        <SideItem
          current={type === "exposureMgmt"}
          onClick={() => handleType("exposureMgmt")}
        >
          상품노출관리
        </SideItem>
        <SideItem
          current={type === "inquiry"}
          onClick={() => handleType("inquiry")}
        >
          상품조회
        </SideItem>
        <SideItem
          current={type === "reservedInquiry"}
          onClick={() => handleType("reservedInquiry")}
        >
          예약상품조회
        </SideItem>
        <SideItem
          current={type === "category"}
          onClick={() => handleType("category")}
        >
          상품카테고리등록관리
        </SideItem>
      </SideMenu>
      <Container></Container>
    </Wrapper>
  );
}
