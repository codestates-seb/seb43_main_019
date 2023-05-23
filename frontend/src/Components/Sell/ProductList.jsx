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
  margin-top: 100px;
`;

const Products = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 30px;
  justify-items: center;

  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default function ProductList({ seller }) {
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const allProducts = await getAllCampgroundsInfo(1, 10000);
      const mine = allProducts.filter(
        (product) => product.memberId === seller.memberId
      );
      setMyProducts((prev) => mine);

      // setMyProducts((prev) => [...dummyCampgrounds.data]);

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
          {myProducts.length === 0 ? (
            <h1>등록된 상품이 없습니다.</h1>
          ) : (
            myProducts.map((campground) => (
              <Card key={campground.productId} campground={campground} />
            ))
          )}
        </Products>
      )}
    </Container>
  );
}
