import styled from "@emotion/styled";
import { dummyCampgrounds } from "../Dummy/DummyDatas";
import Campground from "./Campground";
import Card2 from "./Card2";

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

export default function ProductManage() {
  return (
    <Container>
      <Title>상품등록화면 (아래 카드는 대략적인 이미지임!)</Title>
      <Products>
        {dummyCampgrounds.map((campground) => (
          <Card2 campground={campground} />
        ))}
      </Products>
    </Container>
  );
}
