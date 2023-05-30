import styled from "styled-components";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Global/Header";
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Payment from "./Pages/Payment";
import Mypage from "./Pages/Mypage";
import Detail from "./Pages/Detail";
import Sell from "./Pages/Sell";
import Admin from "./Pages/Admin";
import KakaoLogin from "./Pages/KakaoLogin";
import ChatBox from "./Components/Global/ChatBox";
import NotFound from "./Pages/NotFound";
import SelectPay from "./Pages/SelectPay";
import PaySuccessPage from "./Pages/PaySuccessPage";
import PayCancelPage from "./Pages/PayCancelPage";
import PayFailPage from "./Pages/PayFailPage";

import { handleLogout } from "./Redux/Actions";
import { getMemberInfo } from "./utils/MemberFunctions";

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
  const [searchCategory, setSearchCategory] = useState("productName");
  const [keyword, setKeyword] = useState("");

  const isDark = useSelector((state) => state.modeReducer);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      if (userState.login) {
        const myInfo = await getMemberInfo(userState.userInfo);

        if (myInfo === null) {
          toast("토큰이 만료되었습니다.");
          dispatch(handleLogout());
          return;
        }
      }
    })();
  }, []);

  return (
    <Wrapper>
      <Header
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <Container isDark={isDark}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path={"/sell/*"} element={<Sell />} />
          <Route path={"/admin/*"} element={<Admin />} />
          <Route path="/payment" element={<Payment />} />
          <Route path={"/oauth2/*"} element={<KakaoLogin />} />
          <Route path="/Pay" element={<SelectPay />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/api/payments/success" element={<PaySuccessPage />} />
          <Route path="/api/payments/cancel" element={<PayCancelPage />} />
          <Route path="/api/payments/fail" element={<PayFailPage />} />
          <Route path="/:id" element={<Detail />} />
          <Route
            path="/"
            element={
              <Main
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
                keyword={keyword}
                setKeyword={setKeyword}
              />
            }
          />
        </Routes>
      </Container>
      <ChatBox />
    </Wrapper>
  );
}

export default App;
