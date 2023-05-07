import styled from "styled-components";
import Header from "./Components/Header";
import ModeBtn from "./Components/ModeBtn";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Mypage from "./Pages/Mypage";
import Detail from "./Pages/Detail";
// import "./Style/App.css";
import AccountSearch from "./Pages/AccountSearch";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  //height: auto;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) =>
    props.isDark ? "var(--black-700)" : "var(--white-50)"};
  transition: all 0.5s linear;

  // height: 100vh; // 임시
`;

function App() {
  const isDark = useSelector((state) => state.modeReducer);

  return (
    <Wrapper>
      <Header />
      <Container isDark={isDark}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account-search" element={<AccountSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </Container>
      <ModeBtn />
    </Wrapper>
  );
}

export default App;
