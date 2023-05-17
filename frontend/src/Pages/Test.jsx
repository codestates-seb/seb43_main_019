import styled from "@emotion/styled";
import Input01 from "../Components/Common/Input01";
import Input02 from "../Components/Common/Input02";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Test() {
  return (
    <Container>
      <Input01 />
      <Input02 />
    </Container>
  );
}
