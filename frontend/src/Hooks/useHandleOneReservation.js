import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  handleCancelReservation,
  handleUpdateReservation,
} from "../Tools/ReservationFunctions";
import { toast } from "react-toastify";

export default function useHandleOneReservation(campground, userInfo) {
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

  return { handleSubmit, handleReservation, register, canUpdate, setIsUpdate };
}
