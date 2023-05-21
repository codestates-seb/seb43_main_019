import styled from "@emotion/styled";
import { useState } from "react";
import Input01 from "../Components/Common/Input01";
import Input02 from "../Components/Common/Input02";
import Button01 from "../Components/Common/Button01";
import Button02 from "../Components/Common/Button02";
import Label01 from "../Components/Common/Label01";
import Input03 from "../Components/Common/Input03";
import Spinner from "../Components/Common/Spinner";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const KakaoImg = styled.img`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export default function ComponentExamples() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Container>
      <Input01 />
      <Input02 />
      <Input03 />
      <Button01 />
      <Button02 />
      <Button02 bgColor="var(--yellow)" text="카카오색깔버튼" />
      <Label01 />
      <Spinner />
    </Container>
  );
}
