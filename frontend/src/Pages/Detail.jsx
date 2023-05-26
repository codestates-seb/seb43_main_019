import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import CampgroundImage from "../Components/DeatilImage";
import Picker from "../Components/Picker";
import CampgroundInfo from "../Components/DetailInfo";
import Map from "../Components/Map";
import { useParams, useNavigate } from "react-router-dom";
import { DetailButton } from "../Components/Common/Button";
import { useSelector } from "react-redux";
import { getCampgroundInfo } from "../utils/ProductFunctions";
import ReviewForm from "../Components/ReviewForm";
import { format } from "date-fns";
import Spinner from "../Components/Common/Spinner";
import { toast } from "react-toastify";
import { FaChevronUp } from "react-icons/fa";
import { handleCheckReservationDate } from "../utils/ReservationFunctions";

const Loader = styled.h1`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  min-height: 100vh;
  width: 85%;
  height: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  margin: 0 auto; /* Add left and right margin */
  top: 0;
  left: 0;
`;

const ContextArea = styled.div`
  width: 100%;
  padding: 35px 0;
  top: 0;
  left: 0;
`;

const ContextArea02 = styled.div`
  width: 100%;
  padding: 15px 0;
  top: 0;
  left: 0;
`;

const Title = styled.h2`
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};

  @media screen and (max-width: 400px) {
    margin-left: 0px;
    padding-top: 30px;
    text-align: center;
    font-size: 22px;
  }
`;

const Information = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  font-size: 25px;
  justify-content: start;
  align-items: start;
  color: ${(props) => (props.isDark ? "var(--white-50)" : "var(--black-700)")};

  @media screen and (max-width: 400px) {
    margin-left: 0px;
    padding-top: 30px;
    text-align: center;
    font-size: 22px;
  }
`;

const Form02Information = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  font-size: 15px;
  justify-content: start;
  align-items: start;
  margin-left: 30px;

  @media screen and (max-width: 400px) {
    text-align: center;
    font-size: 12px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 10px 0;
  top: 0;
  left: 0;
  gap: 20px;

  @media screen and (max-width: 868px) {
    flex-direction: column;
  }

  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  max-height: calc(100vh - 150px); /* Adjust the height as needed */
  overflow-y: auto;
  display: flex;
  justify-content: center;
  z-index: 1;
  position: sticky;
  top: 140px;
  @media screen and (max-width: 900px) {
    top: 0;
  }
  right: 0;
  @media (max-width: 768px) {
    order: 2;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  display: flex;
  justify-content: start;
  align-items: start;
  text-align: start;
  height: calc(300vh - 150px);
`;

const Line = styled.hr`
  width: 100%;
  margin: 0 auto;
  border: none;
  border-top: 1px solid
    ${(props) => (props.isDark ? "var(--white)" : "var(--black-500)")};
  margin-bottom: 0px;
  margin-top: 70px;
`;

const Line02 = styled.hr`
  width: 100%;
  margin: 0 auto;
  border: 1px solid var(--black-500);
  ${(props) => (props.isDark ? "var(--white)" : "var(--black-500)")};
  margin-bottom: 0px;
`;

const Form = styled.div`
  max-width: 450px;
  width: 80%;
  height: 500px;
  padding: 0 15px;
  text-align: center;
  background-color: ${(props) =>
    props.isDark ? "var(--white-50)" : "var(--white)"};
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid var(--black-500);
  margin-top: 35px;
  @media screen and (max-width: 400px) {
    margin-top: 120px;
  }
`;

const Form02 = styled.div`
  max-width: 400px;
  width: 90%;
  text-align: center;
  background-color: ${(props) =>
    props.isDark ? "var(--gray-100)" : "var(--white)"};
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid var(--black-500);
  margin-top: 35px;
  margin-bottom: 50px;
  box-shadow: 12px 17px 51px var(--gray-300);

  @media screen and (max-width: 400px) {
  }
`;

const PriceArea = styled.h2`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 400px;

  @media screen and (max-width: 400px) {
    width: 300px;
    height: 200px;
  }

  @media (max-width: 900px) {
    margin-top: 100px;
    position: relative;
    width: auto;
    align-items: center;
  }
`;

const ScrollBtn = styled.div`
  width: 120px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  /* margin-left: 100px; */

  @media (max-width: 900px) {
    margin-left: 0;
    margin-top: 40px;
  }

  @media (max-width: 400px) {
    margin-left: 130px;
  }
`;

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

function Detail() {
  const [startDate, setStartDate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.modeReducer);
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.userReducer);
  const [data, setData] = useState(null);

  // 타겟 요소 지정
  let containerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getCampgroundInfo(id);
      setData(data);
    }
    fetchData();
  }, [id]);

  // 무한 스크롤을 위한 useEffect
  useEffect(() => {
    (async () => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          // console.log("ㅋㅋㅋ");
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

  const {
    content,
    productPrice,
    productName,
    address,
    location,
    imageUrl,
    productPhone,
    capacity,
  } = data || {};

  const handleReservation = async () => {
    if (!startDate) {
      alert("날짜를 선택해주세요."); // 날짜 선택하지 않은 경우 경고창 표시
      return;
    }

    if (userState.login) {
      const formattedDate = format(startDate, "yyyy-MM-dd");

      const isReservated = await handleCheckReservationDate(
        { productId: data.productId, reservationDate: formattedDate },
        userState.userInfo
      );

      if (isReservated.existence === true) {
        toast("이미 예약이 되어있는 날짜입니다.");
        return;
      }

      navigate("/Payment", { state: { data, startDate: formattedDate } });
    } else {
      toast("로그인이 필요한 서비스입니다."); // 로그인이 필요한 경우 경고창 표시
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  useEffect(() => {
    const idPattern = /^[0-9]{1,}$/;

    if (idPattern.test(id) === false) {
      toast("잘못된 접근입니다.");
      navigate("/404");
      return;
    }
  });

  if (!data) {
    return (
      <Loader>
        <Spinner />
      </Loader>
    );
  }

  return isLoading ? (
    <Loader>
      <Spinner />
    </Loader>
  ) : (
    <>
      <Container>
        <ContextArea isDark={isDark}>
          <Title
            isDark={isDark}
          >{`${productName}입니다. 예약을 진행해보세요.🚘`}</Title>
        </ContextArea>
        <Line02 />
        <ContentContainer>
          <InfoContainer>
            <ContextArea isDark={isDark}>
              <Information isDark={isDark}>캠핑장 사진 보기</Information>
            </ContextArea>
            <ImgContainer>
              <CampgroundImage src={imageUrl} />
            </ImgContainer>
            <Line />
            <ContextArea isDark={isDark}>
              <Information isDark={isDark}>캠핑장 위치 📍</Information>
            </ContextArea>
            {/* <Map productId={id} /> */}
            <Line />
            <ContextArea isDark={isDark}>
              <Information isDark={isDark}>숙소 정보 보기</Information>
            </ContextArea>
            <ContextArea isDark={isDark}>
              <Information isDark={isDark}>{`${content}`}</Information>
            </ContextArea>

            <Line />
            <ContextArea isDark={isDark}>
              <Information isDark={isDark}>
                날짜를 선택하시고 예약을 진행하세요.👇👇
              </Information>
            </ContextArea>
            <Picker startDate={startDate} setStartDate={setStartDate} />
          </InfoContainer>
          <FormContainer>
            <Form>
              <ContextArea02 isDark={isDark}>
                <PriceArea isDark={isDark}>{`₩${productPrice}/박`}</PriceArea>
              </ContextArea02>
              <Form02>
                <ContextArea02 isDark={isDark}>
                  <Form02Information
                    isDark={isDark}
                  >{`위치 : ${location}`}</Form02Information>
                </ContextArea02>
                <Line02 />
                <ContextArea02 isDark={isDark}>
                  <Form02Information
                    isDark={isDark}
                  >{`수용인원 : ${capacity}인`}</Form02Information>
                </ContextArea02>
              </Form02>
              <DetailButton onClick={handleReservation}>예약 하기</DetailButton>
            </Form>
          </FormContainer>
        </ContentContainer>
        <ReviewForm productId={id} />
      </Container>
      <ScrollBtn onClick={() => window.scrollTo(0, 0)} ref={containerRef}>
        <FaChevronUp size={40} />
      </ScrollBtn>
    </>
  );
}

export default Detail;
