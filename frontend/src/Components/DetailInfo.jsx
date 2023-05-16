import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};
`;

function DetailInfo(props) {
  const isDark = useSelector((state) => state.modeReducer);
  return (
    <TextWrapper>
      <Title isDark={isDark}>{props.name}</Title>
      <Description isDark={isDark}>{props.location}</Description>
      <Description isDark={isDark}>{props.period}</Description>
      <Description isDark={isDark}>{props.selection}</Description>
      <Description isDark={isDark}>{props.capacity}인실</Description>
      <Description isDark={isDark}>{props.restriction}</Description>
      <Description isDark={isDark}>{props.cancel}</Description>
      <Description isDark={isDark}>가격: {props.price}</Description>
      <Description isDark={isDark}>예약 문의: {props.call}</Description>
      {props.children}
    </TextWrapper>
  );
}

export default DetailInfo;
