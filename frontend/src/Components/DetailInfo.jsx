import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 2.6rem;
  margin-bottom: 1rem;
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};
`;

function DetailInfo(props) {
  const isDark = useSelector((state) => state.modeReducer);
  const {
    productName,
    location,
    content,
    productPrice,
    address,
    productPhone,
    capacity,
  } = props;

  return (
    <TextWrapper>
      <Title isDark={isDark}>{productName}</Title>
      <Description isDark={isDark}>{location}</Description>
      <Description isDark={isDark}>{content}</Description>
      <Description isDark={isDark}>가격: {productPrice}</Description>
      <Description isDark={isDark}>{address}</Description>
      <Description isDark={isDark}>{productPhone}</Description>
      <Description isDark={isDark}>{capacity} 인실</Description>
      {props.children}
    </TextWrapper>
  );
}

export default DetailInfo;
