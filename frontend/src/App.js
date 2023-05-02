import styled from "styled-components";
import Header from "./Components/Header";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  //height: auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh; // 임시
  background-color: pink;
`;

const Container2 = styled.div`
  width: 100%;
  height: 100vh; // 임시
  background-color: pink;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Container></Container>
    </Wrapper>
  );
}

export default App;
