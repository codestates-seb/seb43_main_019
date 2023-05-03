import styled from "styled-components";
import { CommonButton } from "./Button";
import { Link } from "react-router-dom";
import Logo from '../assets/Images/logo.png';

const Container = styled.header`
  width: 100%;
  height: 120px;
  position: fixed;
  background-color: var(--emerald-700);

  .logo-container {
    margin-left: 43%;
    margin-top: 40px;
    bottom: 8px;
    content: '';
    position: absolute;
    top: 8px;
  }

  .button-container {
    padding-left: 1200px; // 임시
    padding-top : 90px; // 임시
      display: flex;
    }
`;

const LogoImg = styled.img`
        display: block;
        width: 150px;
        height: 30px;
        margin-top: -4px;
`

export default function Header() {
  return(
   <Container>
    <div className="logo-container">
    <LogoImg src={Logo} alt="logo" />
    </div>
    <Link to="/Mypage">
    <div className="button-container">
      <CommonButton>MyPage</CommonButton>  
    </div>
    </Link>
  </Container>
  );
}
