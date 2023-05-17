import styled from "@emotion/styled";
import { RiErrorWarningFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  font-size: 50px;
  margin-left: 50px;
`;

export default function NotFound() {
  const { nothing } = useParams();
  console.log(`nothing: ${nothing}, type: ${typeof nothing}`);
  return (
    <Container>
      <RiErrorWarningFill size={"100px"} />
      <Span>페이지를 찾지 못했습니다.</Span>
    </Container>
  );
}
