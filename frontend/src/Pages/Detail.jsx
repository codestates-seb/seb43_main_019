import React, { useState } from "react";
import styled from "@emotion/styled";
import CampgroundImage from "../Components/DeatilImage";
import Picker from "../Components/Picker";
import CampgroundInfo from "../Components/DetailInfo";
import Map from "../Components/Map";
import { campgrounds } from "../Dummy/DummyDatas";
import { useParams } from "react-router-dom";
import { CommonButton } from "../Components/Button";

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
  const selectedCampground = campgrounds.find(
    (campground) => campground.id === parseInt(id)
  );
  const {
    name,
    selection,
    location,
    period,
    description,
    img,
    capacity,
    restriction,
    cancel,
    price,
    call,
  } = selectedCampground;

  return (
    <Container>
      <ContainerBox>
        <ImgContainer>
          <CampgroundImage src={img} />
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
            >
              <CommonButton>예약 하기</CommonButton>
            </CampgroundInfo>
          </InfoContainer>
        </CampgroundContainer>
      </ContainerBox>
      <Map />
    </Container>
  );
}

export default Detail;
