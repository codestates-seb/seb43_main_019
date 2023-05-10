import styled from "styled-components";

export const CommonButton = styled.button`
 position: relative;
  overflow: hidden;
  border: 1px solid var(--black);
  color: var(--black-700);
  display: inline-block;
  font-size: 13px;
  line-height: 13px;
  padding: 16px 16px 15px;
  text-decoration: none;
  cursor: pointer;
  background: var(--white-50);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;
`;

// 사용예시
// import { CommonButton } from "../Components/Button";
//  <CommonButton> 원하는 단어 </CommonButton>