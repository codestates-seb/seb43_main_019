import styled from "@emotion/styled";
import { FcBusinessman, FcAcceptDatabase } from "react-icons/fc";

const Container = styled.ul`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: start;
  padding-top: 50px;

  @media screen and (max-width: 900px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
  }
`;

const Menu = styled.li`
  width: 230px;
  height: 230px;
  background-color: var(--white);
  border: 1px solid white;
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
  color: black;
  margin-right: 20px;
  font-family: "Noto Sans KR", sans-serif;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export default function Menus({ handleMenuClick }) {
  return (
    <Container>
      <Menu onClick={() => handleMenuClick("user-management")}>
        <FcBusinessman size={25} />
        &nbsp;유저관리
      </Menu>
      <Menu onClick={() => handleMenuClick("product-management")}>
        <FcAcceptDatabase size={25} />
        &nbsp;상품관리
      </Menu>
    </Container>
  );
}
