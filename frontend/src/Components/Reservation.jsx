import styled from "@emotion/styled";
import { dummyCampgrounds } from "../Dummy/DummyDatas";
import Card from "./Card";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  margin-left: 300px;
  padding: 50px;

  @media screen and (max-width: 900px) {
    margin-left: 0;
    padding-top: 100px;
  }

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 40px;
`;

const Products = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 50px;
`;

export default function Reservation() {
  return (
    <>
      <Container>
        <Title>예약상품조회 (아래 카드는 대략적인 이미지임!)</Title>
        <Products>
          {dummyCampgrounds.map((campground) => (
            <Card campground={campground} />
          ))}
        </Products>
      </Container>
    </>
  );
}
