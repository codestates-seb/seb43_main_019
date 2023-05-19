import styled from "styled-components";
import axios from "axios";
import Header from "./Components/Header";
import ModeBtn from "./Components/ModeBtn";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Payment from "./Pages/Payment";
import Mypage from "./Pages/Mypage";
import Detail from "./Pages/Detail";
// import "./Style/App.css";
import AccountSearch from "./Pages/AccountSearch";
import Sell from "./Pages/Sell";
import Admin from "./Pages/Admin";
import { useEffect } from "react";
import { handleLogin, handleLogout } from "./Redux/Actions";
import KakaoLogin from "./Pages/KakaoLogin";
import { JS_KEY } from "./config";
import Profile from "./Pages/Profile";
import ChatBox from "./Components/ChatBox";
import ComponentExamples from "./Pages/ComponentExamples";
import NotFound from "./Pages/NotFound";
import Test from "./Pages/Test";

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  //height: auto;
  position: relative;
`;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${(props) =>
    props.isDark ? "var(--black-700)" : "var(--white-50)"};
  transition: all 0.5s linear;

  @media screen and (min-width: 900px) {
    margin-top: 100px;
  }
`;

function App() {
  const isDark = useSelector((state) => state.modeReducer);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Header />
      <Container isDark={isDark}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account-search" element={<AccountSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path={"/sell/*"} element={<Sell />} />
          <Route path={"/admin/*"} element={<Admin />} />
          <Route path="/kakaologin" element={<KakaoLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/samples" element={<ComponentExamples />} />
          <Route path="/test" element={<Test />} />
          <Route path="/payment" element={<Payment />} />
          <Route path={"/oauth2/*"} element={<KakaoLogin />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Container>
      <ModeBtn />
      <ChatBox />
    </Wrapper>
  );
}

export default App;
