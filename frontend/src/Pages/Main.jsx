import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Card2 from "../Components/Card2";
import { FaChevronUp } from "react-icons/fa";
import { getCampgroundInfo } from "../utils/ProductFunctions";
import { getAllCampgroundsInfo } from "../utils/ProductFunctions";
import Spinner from "../Components/Common/Spinner";
import { Element, Scroller } from "react-scroll";
import { getMemberInfo } from "../utils/MemberFunctions";

const Loader = styled.h1`
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

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  gap: 10px;
  justify-items: center;
  padding: 20px 0;
`;

const ContextArea = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 35px 0;
  top: 0;
  left: 0;

  @media screen and (max-width: 400px) {
    height: calc(100vh - 600px);
  }
`;

const IntroArea = styled.div`
  display: flex;
  width: 100%;
  height: 450px;
  margin-top: 150px;
  padding: 10px 0;
  top: 0;
  left: 0;

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const IntroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
`;

const IntroImage = styled.div`
  flex: 1;
  background-image: url("/img/Camp02.png");
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  margin-right: 100px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const IntroTitle = styled.h2`
  flex: 1;
  margin-left: 20px;
  display: flex;
  font-size: 30px;
  white-space: pre-line;
  justify-content: center important!;
  align-items: center important!;
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: translateY(${({ inView }) => (inView ? "0" : "-100%")});
  transition: opacity 1s ease, transform 1s ease;
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const TitleAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(0%);
  }
  to {
    opacity: 1;
    transform: translateY(100%);
  }
`;

const Title = styled.h2`
  margin-left: 150px !important;
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};

  @media screen and (max-width: 400px) {
    margin-left: 0px !important;
    padding-top: 30px;
    text-align: center;
    font-size: 22px;
  }

  /* Apply animation */
  opacity: 0;
  animation: ${TitleAnimation} 1s ease forwards;
`;

const ScrollBtn = styled.div`
  width: 120px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media screen and (max-width: 400px) {
    padding-bottom: 100px;
  }
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
  threshold: 0.5,
};

export default function Main({ searchResults }) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [couple, setCouple] = useState([]);
  const [gangwondo, setGangwondo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inView, setInView] = useState(false); // inView 상태 추가
  const [titleInView, setTitleInView] = useState(false);

  const userState = useSelector((state) => state.userReducer);
  const isDark = useSelector((state) => state.modeReducer);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      // setData((prev) => [...dummyCampgrounds.data]);

      // 실제 데이터 받아오는 과정
      const initData = await getAllCampgroundsInfo(1, 1000000);
      const onlyGangwondo = initData.filter((data) =>
        data.location.includes("강원도")
      );
      const onlyCouple = initData.filter(
        (data) => 1 <= data.capacity && data.capacity <= 2
      );

      setData((prev) => [...initData]);
      setGangwondo((prev) => onlyGangwondo);
      setCouple((prev) => onlyCouple);
      setDisplayData((prev) =>
        searchResults.length > 0
          ? searchResults.slice(0, 8)
          : initData.slice(0, 8)
      );

      setIsLoading((prev) => false);
    })();
  }, []);

  /*
  const handleScroll = () => {
    const introElement = document.querySelector(".intro-element");

    if (introElement) {
      const introElementPosition = introElement.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (introElementPosition < windowHeight * 0.8) {
        setInView(true); // inView state update to true
      } else {
        setInView(false); // inView state update to false
      }
    }
  };

  const handleTitleScroll = () => {
    const titleElement = document.querySelector(".title-element");

    if (titleElement) {
      const titleElementPosition = titleElement.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (titleElementPosition >= windowHeight * 0.1) {
        setTitleInView(true);
      } else {
        setTitleInView(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("zzz");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  */

  return isLoading ? (
    <Loader>
      <Spinner />
    </Loader>
  ) : (
    <>
      {searchResults.length === 0 ? (
        <>
          <IntroArea>
            <IntroContent>
              <Element name="intro" className="intro-element">
                <IntroTitle isDark={isDark} inView={inView}>
                  우리 모두 에어캠프로{"\n"}캠핑 가보자GoGo 🤙🤙
                </IntroTitle>
              </Element>
            </IntroContent>
            <IntroImage />
          </IntroArea>
          <ContextArea isDark={isDark}>
            <Element name="intro" className="intro-element">
              <Title isDark={isDark} inView={titleInView}>
                지금 당장 캠핑을 떠나보세요.⛺
              </Title>
            </Element>
          </ContextArea>
          <Container>
            {searchResults.length > 0
              ? searchResults.map((campground) => (
                  <Card2
                    key={campground.productId + ""}
                    campground={campground}
                  />
                ))
              : displayData.map((campground) => (
                  <Card2
                    key={campground.productId + ""}
                    campground={campground}
                  />
                ))}
          </Container>
          <ContextArea isDark={isDark}>
            <Element name="intro" className="intro-element">
              <Title isDark={isDark} inView={titleInView}>
                커플💛이신가요? 2인실만 보세요!
              </Title>
            </Element>
          </ContextArea>
          <Container>
            {(couple.length > 0 ? couple : data.slice(0, 8)).map(
              (campground) => (
                <Card2
                  key={campground.productId + ""}
                  campground={campground}
                />
              )
            )}
          </Container>

          <ContextArea isDark={isDark}>
            <Element name="intro" className="intro-element">
              <Title isDark={isDark} inView={titleInView}>
                강원도 검색 결과만 모아보세요.🌳
              </Title>
            </Element>
          </ContextArea>
          <Container>
            {(gangwondo.length > 0 ? gangwondo : data.slice(0, 8)).map(
              (campground) => (
                <Card2
                  key={campground.productId + ""}
                  campground={campground}
                />
              )
            )}
          </Container>
        </>
      ) : (
        <>
          <ContextArea isDark={isDark}>
            <Title isDark={isDark} inView={titleInView}>
              검색하신 결과 입니다.😄
            </Title>
          </ContextArea>
          <Container>
            {displayData.map((campground) => (
              <Card2 key={campground.productId + ""} campground={campground} />
            ))}
          </Container>
        </>
      )}
      <ScrollBtn onClick={() => window.scrollTo(0, 0)}>
        <FaChevronUp size={40} />
      </ScrollBtn>
    </>
  );
}
