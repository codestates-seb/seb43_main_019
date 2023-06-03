import styled from "@emotion/styled";
import { useEffect } from "react";
import {
  handleCancelReservation,
  handleUpdateReservation,
} from "../../Tools/ReservationFunctions";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Container = styled.form`
  width: 80%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Managements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 30px;

  margin-bottom: 10px;
`;

const Label = styled.div`
  width: 70px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
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
  const [canUpdate, setCanUpdate] = useState(true);
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
      toast("취소되었습니다.");
      window.location.reload();
    } else {
      toast("취소에 실패했습니다.");
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

  useEffect(() => {
    if (campground.reservationStatus === "RESERVATION_CANCEL") {
      setCanUpdate(false);
    }
  }, []);

  return (
    <Container onSubmit={handleSubmit(handleReservation)}>
      <Managements>
        <InputLine>
          <Label>
            <label>이름</label>
          </Label>
          <Input
            placeholder="이름"
            {...register("reservationName", { required: true })}
          />
        </InputLine>
        <InputLine>
          <Label>
            <label>전화번호</label>
          </Label>
          <Input
            placeholder="전화번호"
            {...register("reservationPhone", { required: true })}
          />
        </InputLine>
        <InputLine>
          <Label>
            <label>이메일</label>
          </Label>
          <Input
            placeholder="이메일"
            type="email"
            {...register("reservationEmail", { required: true })}
          />
        </InputLine>
      </Managements>
      <Btns>
        {canUpdate ? (
          <>
            <Btn onClick={() => setIsUpdate((prev) => true)}>수정</Btn>
            <Btn onClick={() => setIsUpdate((prev) => false)}>취소</Btn>
          </>
        ) : (
          <span>취소가 완료된 예약입니다.</span>
        )}
      </Btns>
    </Container>
  );
}
