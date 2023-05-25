import styled from "@emotion/styled";
import { useEffect } from "react";
import { formatPrice } from "../utils/functions";
import { handleCancelReservation } from "../utils/ReservationFunctions";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 80%;
  margin-bottom: 10px;
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Img = styled.div`
  min-width: 250px;
  width: 80%;
  min-height: 250px;
  height: 100%;
  border-radius: 20px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const Managements = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0 10px;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  justify-items: start;
  width: 100%;
  height: 30px;

  margin-bottom: 10px;
`;

const Label = styled.h4`
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Info = styled.h4`
  font-size: 13px;
`;

const Cancel = styled.div`
  cursor: pointer;
`;

export default function Reservation({ campground, userInfo }) {
  const deleteReservation = async () => {
    const success = await handleCancelReservation(
      campground.reservationId,
      userInfo
    );

    if (success) {
      toast("삭제되었습니다.");
      window.location.reload();
    } else {
      toast("삭제가 안되었습니다.");
    }
  };

  return (
    <Container>
      <Img bgphoto={campground.imageUr} />
      <Managements>
        <InputLine>
          <Info>{campground.reservationName}</Info>
        </InputLine>
        <InputLine>
          <Info>{campground.reservationPhone}</Info>
        </InputLine>
        <InputLine>
          <Info>{campground.reservationDate}</Info>
        </InputLine>
        <InputLine>
          <Info>{formatPrice(campground.actualPaymentAmount)}</Info>
        </InputLine>
        <Cancel onClick={deleteReservation}>삭제</Cancel>
      </Managements>
    </Container>
  );
}
