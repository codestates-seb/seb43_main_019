import styled from "@emotion/styled";

export const Label = styled.label`
  width: 100px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--black);
  @media screen and (max-width: 900px) {
    // display: none;
  }
`;

export const Label02 = styled.label`
  width: 100px;
  font-size: 10px;
  margin-left: 10px;
  color: var(--black);
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const Label03 = styled.label`
  width: 100px;
  font-size: 10px;
  margin-left: 27px;
  color: var(--black);
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

// 사용예시
// import { Label } from "../Components/Common/Label";
//  <Label> 원하는 단어 <Label/>
