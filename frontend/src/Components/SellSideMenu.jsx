import styled from "@emotion/styled";

const SideMenu = styled.ul`
  max-width: 300px;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 140px;
  left: 0;
  border-right: 1px solid var(--gray-400);
  @media screen and (max-width: 900px) {
    top: 100px;
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

  @media screen and (max-width: 900px) {
    width: 100vw;
    height: 50px;
    font-size: 15px;
  }
`;

const types = [
  "crud",
  "manage",
  "exposure",
  "inquiry",
  "reservation",
  "category",
];

export default function SellSideMenu({ type, handleType }) {
  return (
    <SideMenu>
      <SideItem
        current={type === "crud"}
        onClick={() => handleType("crud")}
        style={{ borderTop: " 1px solid var(--gray-400)" }}
      >
        상품등록수정
      </SideItem>
      <SideItem
        current={type === "manage"}
        onClick={() => handleType("manage")}
      >
        상품게시물관리
      </SideItem>
      <SideItem
        current={type === "exposure"}
        onClick={() => handleType("exposure")}
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
        current={type === "reservation"}
        onClick={() => handleType("reservation")}
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
  );
}
