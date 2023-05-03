import styled from "styled-components";
import { CommonButton } from "./Button";
import { Link } from "react-router-dom";

const Container = styled.header`
  width: 100%;
  height: 120px;
  position: fixed;
  background-color: var(--emerald-700);

  .button-container {
    padding-left: 1200px; // 임시
    padding-top : 90px; // 임시
      display: flex;
    }
`;

export default function Header() {
  return(
   <Container>
    <Link to="/Mypage">
    <div className="button-container">
      <CommonButton>MyPage</CommonButton>  
    </div>
    </Link>
  </Container>
  );
}
