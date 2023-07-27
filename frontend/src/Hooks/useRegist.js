// 주로 Components/Sell/Rservation.jsx에서 이용할 로직

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handlePostCampground } from "../Tools/ProductFunctions";

export default function useRegist() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const userState = useSelector((state) => state.UserReducer);

  const navigate = useNavigate();

  const imageInputRef = useRef(null);

  const { register, handleSubmit, reset } = useForm();

  const postProduct = async (data) => {
    if (imageUrl === "") {
      toast("사진을 등록해주세요.");
      return;
    }

    const {
      productName,
      address,
      location,
      content,
      capacity,
      cancellationDeadline,
      productPrice,
    } = data;

    const jsonData = {
      productName,
      address,
      location,
      content,
      capacity: +capacity,
      cancellationDeadline: cancellationDeadline,
      productPrice,
      productPhone: "010-1111-1111",
      memberId: userState.userInfo.memberId,
    };

    const formData = new FormData();
    formData.append("images", image);
    formData.append("jsonData", JSON.stringify(jsonData));

    const success = await handlePostCampground(formData, userState.userInfo);

    if (success) {
      toast("등록에 성공했습니다.");
      reset();
      navigate("/");
    } else {
      toast("등록에 실패했습니다.");
    }
  };

  const handleImageChange = (event) => {
    const imgFile = event.target.files[0];
    setImage((prev) => imgFile);
    setImageUrl((prev) => URL.createObjectURL(imgFile));
  };

  const handleImageInputClick = () => {
    imageInputRef.current.click();
  };

  return {
    handleSubmit,
    postProduct,
    imageUrl,
    handleImageChange,
    register,
    imageInputRef,
    handleImageInputClick,
  };
}
