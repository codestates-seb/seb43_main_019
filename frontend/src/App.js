import styled from "styled-components";
import Header from "./Components/Header";
import ModeBtn from "./Components/ModeBtn";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Mypage from "./Pages/Mypage";
import Picker from "./Components/Picker";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  //height: auto;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-top: 120px; // 헤더의 height 값이 120px
  // height: 100vh; // 임시
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/" element={<Main />} />
          <Route path="/cd" element={<Picker />} />
        </Routes>
      </Container>
      <ModeBtn />
    </Wrapper>
  );
}

export default App;
