import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberInfo } from "../Tools/MemberFunctions";
import { toast } from "react-toastify";
import {
  handleDeleteCampground,
  handleUpdateCampground,
} from "../Tools/ProductFunctions";

export default function useUpdateProduct(isOpen, closeModal, campground) {
  const [isUpdate, setIsUpdate] = useState(true);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(campground.imageUrl);

  const userState = useSelector((state) => state.UserReducer);

  const navigate = useNavigate();

  const imageInputRef = useRef(null);

  const { register, handleSubmit } = useForm();

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  const handleProductUpdate = async (data) => {
    const myInfo = await getMemberInfo(userState.userInfo);

    if (myInfo === null) {
      toast("토큰이 만료되었습니다.");
      navigate("/login");
      return;
    }

    if (isUpdate) {
      if (imageUrl === "") {
        toast("사진을 등록해주세요.");
        return;
      }

      const { productName, capacity, productPrice } = data;

      const updatedInfo = {
        productName,
        address: campground.address,
        location: campground.location,
        content: campground.content,
        capacity,
        cancellationDeadline: campground.cancellationDeadline,
        productPrice,
        productPhone: campground.productPhone,
      };

      const formData = new FormData();
      formData.append("image", image);
      formData.append("jsonData", JSON.stringify(updatedInfo));

      const result = await handleUpdateCampground(
        campground.productId,
        formData,
        userState.userInfo
      );

      if (result) {
        alert("수정이 완료되었습니다.");
        navigate("/admin/product-management");
      } else {
        alert("수정을 실패했습니다.");
      }
    } else {
      const success = await handleDeleteCampground(
        campground.productId,
        userState.userInfo
      );

      if (success === true) {
        alert("삭제가 완료되었습니다.");
        navigate("/admin/product-management");
      } else {
        alert("삭제를 실패했습니다.");
      }
    }
  };

  const handleImageInputClick = () => {
    imageInputRef.current.click();
  };

  return {
    imageUrl,
    handleImageChange,
    handleSubmit,
    handleProductUpdate,
    register,
    setIsUpdate,
    imageInputRef,
    handleImageInputClick,
  };
}
