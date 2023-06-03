import styled from "@emotion/styled";

import { useEffect, useState } from "react";

import AdminProductCard from "../Admin/AdminProductCard";

import { getAllCampgroundsInfo } from "../../Tools/ProductFunctions";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 20px;
`;

const Cards = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }
  gap: 20px;
  justify-items: center;
  padding: 50px 0;
`;

export default function ProductManagement() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const result = await getAllCampgroundsInfo(1, 10000);
      const allCampgrounds = result.filter((prod) => prod.deleted === false);
      setCampgrounds((prev) => allCampgrounds);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Title>상품을 선택하여 관리할 수 있습니다.</Title>
          <Cards>
            {campgrounds.map((campground) => (
              <AdminProductCard
                campground={campground}
                key={campground.productId}
              />
            ))}
          </Cards>
        </>
      )}
    </Container>
  );
}
