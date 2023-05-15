import styled from "@emotion/styled";

const SideMenu = styled.ul`
   max-width:220px;
   width: 100%;
   height: 35%;
   background:var(--white);;
   margin: 110px 0 0 40px; // 왼쪽 40px, 위쪽 110px
   padding:10px 0px 20px 0px;
   border:1px solid var(--black-500);
   border-radius:4px;
   /* box-shadow:0px 4px 5px var(--gray-200); */
   /* position: fixed; */
    top: 100px;

  @media screen and (max-width: 900px) {
    top: 100px;
    display: none;
  }
`;

const SideItem = styled.li`
  font-size:16px;
  font-weight: bold;
  color:var(--black);
  font-weight:300;
  text-align:center;
  position:relative;
  height:40px;
  border:none;
  line-height:40px;
  margin-top:10px;
  overflow:hidden;
  width:90%;
  margin-left:5%;
  
  cursor:pointer;

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
      >
        예약 상품 등록 🏕️
      </SideItem>

      <SideItem
        current={type === "reservation"}
        onClick={() => handleType("reservation")}
      >
        예약 상품 조회 🥾
      </SideItem>
      <SideItem
        current={type === "reservation"}
        onClick={() => handleType("reservation")}
      >
        상품 수정/삭제 🌳
      </SideItem>
      <SideItem
        current={type === "statics"}
        onClick={() => handleType("statics")}
      >
        예약 통계 🔦
      </SideItem>
    </SideMenu>
  );
}
