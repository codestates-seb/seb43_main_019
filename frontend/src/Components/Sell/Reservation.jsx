import styled from "@emotion/styled";
import Card from "../Main/Card";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCampgroundsInfo } from "../../utils/ProductFunctions";
import Spinner from "../Common/Spinner";

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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const result = await getAllCampgroundsInfo(1, 10000);
      const filtered = result.filter(
        (campground) => campground.memberId === userState.userInfo.memberId
      );
      setData((prev) => filtered);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <>
      <Container>
        <Title>고객님께서 등록하신 캠핑장입니다.</Title>
        <Products>
          {isLoading ? (
            <Spinner />
          ) : (
            data
              .filter((campground) => campground.productId === 1)
              .map((campground) => (
                <Card key={campground.productId} campground={campground} />
              ))
          )}
        </Products>
      </Container>
    </>
  );
}
