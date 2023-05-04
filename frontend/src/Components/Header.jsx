import styled from "styled-components";
import LoginStatus from "./LoginStatus";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.header`
  width: 100%;
  height: 120px;
  position: fixed;
  top: 0;
  background-color: #0d630d;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 180px;
  height: 60px;
`;

const Utils = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Search = styled.input`
  width: 300px;
  @media screen and (min-width: 700px) {
    width: 400px;
  }
  @media screen and (min-width: 900px) {
    width: 650px;
  }

  height: 35px;
  border-radius: 30px;
  border: none;
  padding-left: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const SearchMore = styled.div`
  width: 50px;
  height: 25px;
  background-color: black;
  border: 20px;
`;

export default function Header() {
  return (
    <Container>
      <Logo src="/img/Logo.png" />
      <Utils>
        <Search placeholder="검색" />
        <LoginStatus />
      </Utils>
    </Container>
  );
}
