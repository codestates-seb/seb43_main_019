import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CampgroundImage from "../Components/DeatilImage";
import Picker from "../Components/Picker";
import CampgroundInfo from "../Components/DetailInfo";
import Map from "../Components/Map";
import { campgrounds } from "../Dummy/DummyDatas";
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
          <CampgroundImage
            src={
              "https://yeyak.seoul.go.kr/cmsdata/web_upload/svc/20230329/1680050914280HZAYFX8GLLMTVZI2H6BD0WGPV_IM02.jpg"
            }
          />
          <Picker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </ImgContainer>
        <CampgroundContainer>
          <InfoContainer>
            <CampgroundInfo
              name={name}
              location={location}
              period={period}
              selection={selection}
              description={description}
              capacity={capacity}
              restriction={restriction}
              cancel={cancel}
              price={price}
              call={call}
              isDark={isDark}
            >
              <CommonButton onClick={handleReservation}>예약 하기</CommonButton>
            </CampgroundInfo>
          </InfoContainer>
        </CampgroundContainer>
      </ContainerBox>
      <Map />
    </Container>
  );
}

export default Detail;
