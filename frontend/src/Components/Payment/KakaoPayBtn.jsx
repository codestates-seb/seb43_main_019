import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #ffeb00;
  color: #000000;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const KakaoPayButton = ({ onClick }) => (
  <StyledButton onClick={onClick}>카카오페이 결제</StyledButton>
);

export default KakaoPayButton;
