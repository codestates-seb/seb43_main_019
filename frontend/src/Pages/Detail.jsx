import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CampgroundImage from "../Components/DeatilImage";
import Picker from "../Components/Picker";
import CampgroundInfo from "../Components/DetailInfo";
import Map from "../Components/Map";
import { dummyCampgrounds } from "../Dummy/DummyDatas";
import { useParams, useNavigate } from "react-router-dom";
import { CommonButton } from "../Components/Common/Button";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  padding-bottom: 200px;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 100px;
  max-width: 1200px;
`;

const CampgroundContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 50%;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Detail() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.modeReducer);
  const userState = useSelector((state) => state.userReducer);

  const selectedCampground = dummyCampgrounds.data.find(
    (campground) => campground.productId === parseInt(id)
  );

  const { productId, productName, address, location, imageUrl, memberId } =
    selectedCampground;

  const handleReservation = () => {
    if (userState.login) {
      navigate("/Payment"); // 로그인 상태라면 다른 페이지로 이동(페이먼트 폼 구현 후 수정)
    } else {
      alert("로그인이 필요한 서비스입니다."); // 로그인이 필요한 경우 경고창 표시
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  return (
    <Container>
      <ContainerBox>
        <ImgContainer>
          <CampgroundImage src={imageUrl} />
          <Picker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </ImgContainer>
        <CampgroundContainer>
          <InfoContainer>
            <CampgroundInfo
              productName={productName}
              location={location}
              productId={productId}
              address={address}
              memberId={memberId}
              isDark={isDark}
            >
              <CommonButton onClick={handleReservation}>예약 하기</CommonButton>
            </CampgroundInfo>
          </InfoContainer>
        </CampgroundContainer>
      </ContainerBox>
      {/* <Map /> */}
    </Container>
  );
}

export default Detail;
