import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ffeb00")};
  color: ${(props) => (props.disabled ? "#999" : "#000000")};
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const KakaoPayButton = ({ onClick, isAgreed, children }) => {
  const handleClick = () => {
    if (isAgreed) {
      onClick();
    }
  };

  return (
    <StyledButton onClick={handleClick} disabled={!isAgreed}>
      {children}
    </StyledButton>
  );
};

export default KakaoPayButton;
