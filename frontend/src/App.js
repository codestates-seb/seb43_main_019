import styled from "styled-components";
import Header from "./Components/Header";
import ModeBtn from "./Components/ModeBtn";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  //height: auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh; // 임시
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Container></Container>
      <ModeBtn />
    </Wrapper>
  );
}

export default App;
