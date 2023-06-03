import styled from "@emotion/styled";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { SellInput } from "../Common/Input";
import { CommonButton } from "../Common/Button";
import { Label } from "../Common/Label";

import { handlePostCampground } from "../../Tools/ProductFunctions";

const Container = styled.div`
  margin: 100px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 20px;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
`;

const Form = styled.form`
  background-color: ${(props) =>
    props.isDark ? "var(--white-50)" : "var(--white)"};
  border: 1px solid var(--black-500);
  width: 80%;
  height: 100%;
  min-height: 800px;
  border-radius: 20px;
  padding-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media screen and (max-width: 1250px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding-bottom: 50px;
  }
`;

const ImageSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.div`
  border-radius: 20px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  border: 1px solid black;

  width: 80%;
  height: 80%;
`;

const ImageInput = styled.input`
  left: 0;
  right: 0%;
  margin: auto auto;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  align-items: start;
`;

const SmallInput = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  & label {
    height: 100%;
  }

  & input {
    width: 70%;

    @media (min-width: 320px) and (max-width: 480px) {
      width: 50%;
    }
  }
`;

const StyledCommonButton = styled(CommonButton)`
  width: 50%;
  height: 50%;
  margin: auto auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSellInput = styled(SellInput)``;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 5;
`;

const Modal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  width: 800px;
  height: 400px;
  background-color: white;
  z-index: 10;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

const SampleImg = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 20px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

export default function Registration() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const isDark = useSelector((state) => state.ModeReducer);
  const userState = useSelector((state) => state.UserReducer);

  const navigate = useNavigate();

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

  return (
    <>
      <Container>
        <Title isDark={isDark}>고객님의 캠핑장을 등록해주세요.🙋🏻‍♀️</Title>
        <Form onSubmit={handleSubmit(postProduct)}>
          <ImageSpace>
            <Image bgphoto={imageUrl} />
            <ImageInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageSpace>
          <Inputs>
            <SmallInput>
              <Label htmlFor="productName">이름</Label>
              <SellInput
                id="productName"
                placeholder="이름을 입력해주세요."
                {...register("productName", { required: true })}
              />
            </SmallInput>
            <SmallInput>
              <Label htmlFor="adress">주소</Label>
              <StyledSellInput
                id="adress"
                placeholder="주소를 입력해주세요."
                {...register("address", { required: true })}
              />
            </SmallInput>
            <SmallInput>
              <Label htmlFor="location">위치</Label>
              <StyledSellInput
                id="location"
                placeholder="위치를 입력해주세요."
                {...register("location", { required: true })}
              />
            </SmallInput>
            <SmallInput>
              <Label htmlFor="productPrice">가격</Label>
              <SellInput
                type="number"
                min="0"
                id="productPrice"
                placeholder="가격"
                {...register("productPrice", { required: true })}
              />
            </SmallInput>
            <SmallInput>
              <Label>취소 기한</Label>
              <SellInput
                type="date"
                {...register("cancellationDeadline", { required: true })}
              />
            </SmallInput>
            <SmallInput>
              <Label htmlFor="capacity">수용인원</Label>
              <SellInput
                type="number"
                min="0"
                id="capacity"
                placeholder="수용인원"
                {...register("capacity", { required: true })}
              />
            </SmallInput>
            <SmallInput>
              <Label htmlFor="content">소개</Label>
              <StyledSellInput
                id="content"
                placeholder="대략적인 소개글"
                {...register("content", { required: true })}
              />
            </SmallInput>
            <StyledCommonButton>등록하기</StyledCommonButton>
          </Inputs>
        </Form>
      </Container>
    </>
  );
}
