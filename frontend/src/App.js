import styled from "styled-components";
import Header from "./Components/Header";
import ModeBtn from "./Components/ModeBtn";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import Main from "./Pages/Main";
import Join from "./Pages/Join";
import Login from "./Pages/Login";

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
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <ModeBtn />
    </Wrapper>
  );
}

export default App;
