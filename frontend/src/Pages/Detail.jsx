import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CampgroundImage from "../Components/DeatilImage";
import Picker from "../Components/Picker";
import CampgroundInfo from "../Components/DetailInfo";
import Map from "../Components/Map";
import { useParams, useNavigate } from "react-router-dom";
import { CommonButton } from "../Components/Common/Button";
import { useSelector } from "react-redux";
import { getCampgroundInfo } from "../utils/ProductFunctions";
import ReviewForm from "../Components/ReviewForm";
import { format } from "date-fns";
import Spinner from "../Components/Common/Spinner";

const Loader = styled.h1`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1800px;
  padding-bottom: 200px;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 100px;
  max-width: 1800px;
`;

const CampgroundContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 50%;
  margin-right: 50px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
`;

function Detail() {
  const [startDate, setStartDate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.modeReducer);
  const userState = useSelector((state) => state.userReducer);
  const [data, setData] = useState(null);
  console.log(data);
  console.log(startDate);

  useEffect(() => {
    async function fetchData() {
      const data = await getCampgroundInfo(id);
      setData(data);
    }
    fetchData();
  }, [id]);

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

  const handleReservation = () => {
    if (!startDate) {
      alert("날짜를 선택해주세요."); // 날짜 선택하지 않은 경우 경고창 표시
      return;
    }

    if (userState.login) {
      const formattedDate = format(startDate, "yyyy-MM-dd");
      navigate("/Payment", { state: { data, startDate: formattedDate } });
    } else {
      alert("로그인이 필요한 서비스입니다."); // 로그인이 필요한 경우 경고창 표시
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  if (!data) {
    return <Loader><Spinner /></Loader>;
  }

  return (
    <Container>
      <ContainerBox>
        <ImgContainer>
          <CampgroundImage src={imageUrl} />
          <Picker startDate={startDate} setStartDate={setStartDate} />
        </ImgContainer>
        <CampgroundContainer>
          <InfoContainer>
            <CampgroundInfo
              productName={productName}
              location={location}
              content={content}
              productPrice={productPrice}
              address={address}
              productPhone={productPhone}
              capacity={capacity}
              isDark={isDark}
            >
              <CommonButton onClick={handleReservation}>예약 하기</CommonButton>
            </CampgroundInfo>
          </InfoContainer>
        </CampgroundContainer>
      </ContainerBox>
      <Map productId={id} />
      <ReviewForm />
    </Container>
  );
}

export default Detail;
