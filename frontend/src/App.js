import styled from "styled-components";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mypage from "./Pages/Mypage";
import Main from "./Components/Main";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  //height: auto;
`;

function App() {
  return (
    <BrowserRouter>
    <Wrapper>
      <Header />
      <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/Mypage" element={<Mypage />}></Route>
      </Routes>
    </Wrapper>
    </BrowserRouter>
  );
}

export default App;
