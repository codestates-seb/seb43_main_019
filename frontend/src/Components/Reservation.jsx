import styled from "@emotion/styled";
import { dummyCampgrounds } from "../Dummy/DummyDatas";
import Card2 from "./Card2";

import { useState } from "react";

const Container = styled.div`
  width: 100%;
  margin-left: 100px;
  margin-top: 80px;
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

const Title = styled.p`
  width: 100%;
  font-size: 20px;
  padding-bottom: 50px;
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
        <Title>고객님께서 등록하신 캠핑장입니다.</Title>
        <Products>
          {dummyCampgrounds
            .filter((campground) => campground.productId === 1)
            .map((campground) => (
              <Card2 key={campground.productId} campground={campground} />
            ))}
        </Products>
      </Container>
    </>
  );
}
