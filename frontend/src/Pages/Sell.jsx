import styled from "@emotion/styled";

import SellSideMenu from "../Components/Sell/SellSideMenu";
import Registration from "../Components/Sell/Registration";
import ProductList from "../Components/Sell/ProductList";
import useSellerInfo from "../Hooks/useSellerInfo";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-y: auto; /* 스크롤이 가능한 요소로 설정 */
`;

export default function Sell() {
  const { selected, handleMenuClick } = useSellerInfo();

  return (
    <Wrapper>
      <SellSideMenu current={selected} handleMenuClick={handleMenuClick} />
      {selected === "registration" && <Registration />}
      {selected === "list" && <ProductList />}
    </Wrapper>
  );
}
