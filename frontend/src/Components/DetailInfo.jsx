import React from "react";
import styled from "@emotion/styled";

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

function DetailInfo(props) {
  return (
    <TextWrapper>
      <Title>{props.name}</Title>
      <Description>{props.location}</Description>
      <Description>{props.period}</Description>
      <Description>{props.selection}</Description>
      <Description>{props.capacity}인실</Description>
      <Description>{props.restriction}</Description>
      <Description>{props.cancel}</Description>
      <Description>가격: {props.price}</Description>
      <Description>예약 문의: {props.call}</Description>
      {props.children}
    </TextWrapper>
  );
}

export default DetailInfo;
