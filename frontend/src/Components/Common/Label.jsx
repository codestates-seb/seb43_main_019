import styled from "styled-components";

export const Label = styled.label`
  width: 100px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--black);
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

// 사용예시
// import { Label } from "../Components/Label";
//  <Label> 원하는 단어 <Label/>