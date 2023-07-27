import styled from "@emotion/styled";

import { useSelector } from "react-redux";

import { SellInput } from "../Common/Input";
import { CommonButton } from "../Common/Button";
import { Label } from "../Common/Label";

import useRegist from "../../Hooks/useRegist";

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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ImageInput = styled.input`
  left: 0;
  right: 0%;
  margin: auto auto;
  display: none;
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

export default function Registration() {
  const isDark = useSelector((state) => state.ModeReducer);

  const {
    handleSubmit,
    postProduct,
    imageUrl,
    handleImageChange,
    register,
    imageInputRef,
    handleImageInputClick,
  } = useRegist();

  return (
    <>
      <Container>
        <Title isDark={isDark}>고객님의 캠핑장을 등록해주세요.🙋🏻‍♀️</Title>
        <Form onSubmit={handleSubmit(postProduct)}>
          <ImageSpace>
            <Image
              bgphoto={imageUrl}
              onClick={() => {
                handleImageInputClick();
              }}
            >
              {imageUrl.length === 0 && "클릭하여 이미지를 등록해주세요."}
            </Image>
          </ImageSpace>
          <ImageInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef}
          />
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
