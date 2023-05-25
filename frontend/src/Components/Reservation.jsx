import styled from "@emotion/styled";
import { useEffect } from "react";
import { formatPrice } from "../utils/functions";
import {
  handleCancelReservation,
  handleUpdateReservation,
} from "../utils/ReservationFunctions";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Container = styled.form`
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

const Input = styled.input`
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 200px;
  height: 100%;
  border: none;
  border-bottom: 1px solid #6c6c6c;
  background: transparent;
  color: var(--black);

  &:focus {
    outline: none;
    border-color: var(--black);
  }
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Btn = styled.button`
  overflow: hidden;
  border: none;
  border-radius: 3px;
  color: var(--black-700);
  display: inline-block;
  font-size: 13px;
  line-height: 13px;
  padding: 16px 16px 15px;
  text-decoration: none;
  background: var(--white-50);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export default function Reservation({ campground, userInfo }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      reservationName: campground.reservationName,
      reservationPhone: campground.reservationPhone,
      reservationEmail: campground.reservationEmail,
    },
  });

  const deleteReservation = async () => {
    const success = await handleCancelReservation(
      campground.reservationId,
      userInfo
    );

    if (success) {
      toast("삭제되었습니다.");
      // window.location.reload();
    } else {
      toast("삭제가 안되었습니다.");
    }
  };

  const updateReservation = async (data) => {
    const { reservationName, reservationPhone, reservationEmail } = data;

    const updated = {
      reservationId: campground.reservationId,
      reservationDate: campground.reservationDate,
      reservationName,
      reservationPhone,
      reservationEmail,
      reservationStatus: campground.reservationStatus,
    };
    const result = await handleUpdateReservation(updated, userInfo);

    if (result) {
      toast("수정에 성공했습니다.");
      window.location.reload();
    } else {
      toast("수정에 실패했습니다.");
    }
  };

  const handleReservation = async (data) => {
    if (isUpdate) {
      await updateReservation(data);
    } else {
      await deleteReservation();
    }
  };

  return (
    <Container onSubmit={handleSubmit(handleReservation)}>
      <Img bgphoto={campground.imageUr} />
      <Managements>
        <InputLine>
          <Input
            placeholder="이름"
            {...register("reservationName", { required: true })}
          />
        </InputLine>
        <InputLine>
          <Input
            placeholder="전화번호"
            {...register("reservationPhone", { required: true })}
          />
        </InputLine>
        <InputLine>
          <Input
            placeholder="이메일"
            type="email"
            {...register("reservationEmail", { required: true })}
          />
        </InputLine>
        <Btns>
          <Btn onClick={() => setIsUpdate((prev) => true)}>수정</Btn>
          <Btn onClick={() => setIsUpdate((prev) => false)}>삭제</Btn>
        </Btns>
      </Managements>
    </Container>
  );
}
