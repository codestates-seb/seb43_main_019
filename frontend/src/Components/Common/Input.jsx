import styled from "@emotion/styled";

export const Input = styled.input`
width: 70%;
height: 40px;
border: none;
font-size: 13px;
outline: 0;
background: rgb(255, 255, 255);
box-shadow: transparent 0px 0px 0px 1px inset;
padding: 0.6em;
border-radius: 14px;
border: 1px solid #333;
color: black;

&:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

@media screen and (max-width: 900px) {
  width: 100%;
}
`;

export const AuthCodeInput = styled.input`
width: 70%;
height: 40px;
border: none;
font-size: 13px;
outline: 0;
background: rgb(255, 255, 255);
box-shadow: transparent 0px 0px 0px 1px inset;
padding: 0.6em;
border-radius: 14px;
border: 1px solid #333;
color: black;

&:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

@media screen and (max-width: 900px) {
  width: 100%;
}
`;

export const SellInput = styled.input`
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 150px;
  border: none;
  border-bottom: 1px solid #6c6c6c;
  background: transparent;
  color: var(--black);

  &:focus {
    outline: none;
    border-color: var(--black);
    }
`;

export const UnderInput = styled.input`
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 185px;
  border: none;
  border-bottom: 1px solid #6c6c6c;
  background: transparent;
  color: #475ed4;
`;

// 사용예시
// import { Input } from "../Components/Common/Input";
//  <Input />