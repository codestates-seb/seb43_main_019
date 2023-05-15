import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { campgrounds } from "../Dummy/DummyDatas";
import { useEffect, useRef, useState } from "react";
import Card2 from "../Components/Card2";
import { FaChevronUp } from "react-icons/fa";

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
  padding-top: 200px;
`;

const ContextArea = styled.div`
  width: 100%;
  margin-top: 50px;
  position: absolute;
  padding: 35px 0;
  top: 0;
  left: 0;
`;

const Title = styled.h2`
  margin-left: 150px !important;
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};
`;

const ScrollBtn = styled.div`
  width: 120px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const TempWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 관측에 적용할 수 있는 옵션
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export default function Main() {
  const isDark = useSelector((state) => state.modeReducer);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 타겟 요소 지정
  let containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      // 나중에 실제 데이터를 받아와야 함
      setData((prev) => [...campgrounds.data]);

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
      <ContextArea isDark={isDark}>
        <Title isDark={isDark}>지금 당장 캠핑을 떠나보세요.⛺</Title>
      </ContextArea>
      <Container>
        {data.map((campground) => (
          <Card2 key={campground.id + ""} campground={campground} />
        ))}
      </Container>
      <ScrollBtn onClick={() => window.scrollTo(0, 0)} ref={containerRef}>
        <FaChevronUp size={40} />
      </ScrollBtn>
    </>
  );
}
