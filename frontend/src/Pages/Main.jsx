import styled from "@emotion/styled";
import { campgrounds } from "../Dummy/DummyDatas";
import { useEffect, useRef, useState } from "react";
import Card2 from "../Components/Card2";

const Loader = styled.h1`
  font-size: 50px;
  font-weight: bold;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.main`
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

const ScrollBtn = styled.div`
  width: 120px;
  height: 70px;
  border-radius: 10px;
  background-color: green;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin: 0 auto;
`;

const TempWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
/*
공부용
const TempCard = styled.div`
  width: 200px;
  height: 300px;
  background-color: white;
  position: relative;
  overflow: hidden;

  &::after {
    content: "Add to Cart";
    position: absolute;
    bottom: -50%;
    left: 0;
    padding-left: 15px;
    background: #181818;
    width: 100%;
    height: 60px;
    color: #fff;
    line-height: 50px;
    text-transform: uppercase;
    z-index: 2;
    transition: all 0.2s ease-in;
  }
`;
*/
// 관측에 적용할 수 있는 옵션
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export default function Main() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 타겟 요소 지정
  let containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      // 나중에 실제 데이터를 받아와야 함
      setData((prev) => [...campgrounds]);

      setIsLoading((prev) => false);
    })();
  }, []);

  // 무한 스크롤을 위한 useEffect
  useEffect(() => {
    (async () => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          // 데이터 더 불러오기
        }
      }, options);

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        observer.disconnect();
      };
    })();
  }, [containerRef]);

  return isLoading ? (
    <Loader>isLoading...</Loader>
  ) : (
    <>
      <Container>
        {data.map((campground) => (
          <Card2 key={campground.id + ""} campground={campground} />
        ))}
      </Container>
      <ScrollBtn onClick={() => window.scrollTo(0, 0)} ref={containerRef}>
        가장 위로
      </ScrollBtn>
    </>
  );
}
