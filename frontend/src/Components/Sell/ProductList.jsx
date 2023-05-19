import styled from "@emotion/styled";
import { dummyCampgrounds } from "../../Dummy/DummyDatas";
import Campground from "../Campground";
import Card from "../Card";
import { useState } from "react";
import { useEffect } from "react";
import { getAllCampgroundsInfo } from "../../utils/ProductFunctions";

const Container = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
`;

const Products = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 30px;
`;

export default function ProductList({ seller }) {
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      /*
      const allProducts = await getAllCampgroundsInfo(1, 10000);
      const mine = allProducts.filter(
        (product) => product.memberId === seller.memberId
      );
      setMyProducts((prev) => mine);
      */
      setMyProducts((prev) => [...dummyCampgrounds.data]);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Container>
      <Title>등록한 상품들</Title>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Products>
          {myProducts.map((campground) => (
            <Card campground={campground} />
          ))}
        </Products>
      )}
    </Container>
  );
}
