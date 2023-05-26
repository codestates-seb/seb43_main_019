import styled from "@emotion/styled";

export const CommonButton = styled.button`
  position: relative;
  overflow: hidden;
  border-radius: 3px;
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

export const DetailButton = styled.div`
  position: relative;
  width: 80%;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid var(--black);
  color: var(--white);
  display: inline-block;
  font-size: 13px;
  line-height: 13px;
  padding: 16px 16px 15px;
  text-decoration: none;
  cursor: pointer;
  background: #27374d;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export const LoginButton = styled.button`
  width: 63%;
  height: 40px;
  border-radius: 25px;
  background-color: var(--black);
  color: var(--white);
  border: none;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: bold;
  border: 0;
  padding: 0.68em;
  border-radius: 14px;
  font-weight: bold;
`;

export const SocialLogin = styled.button`
  width: 63%;
  height: 40px;
  display: flex;
  border-radius: 14px;
  background-color: var(--yellow);
  color: var(--black);
  border: none;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

// 사용예시
// import { CommonButton } from "../Components/Common/Button";
//  <CommonButton> 원하는 단어 </CommonButton>
