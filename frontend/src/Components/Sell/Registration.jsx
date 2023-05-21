import styled from "@emotion/styled";
import { SellInput } from "../Common/Input";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CommonButton } from "../Common/Button";
import { Label } from "../Common/Label";
import { useState } from "react";
import { handlePostCampground } from "../../utils/ProductFunctions";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 100px;
  margin-top: 80px;
  padding: 50px;

  @media screen and (max-width: 900px) {
    margin-left: 0;
    padding-top: 100px;
  }

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const Title = styled.p`
  width: 100%;
  font-size: 20px;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
`;

const Form = styled.form`
  display: flex;
  max-width: 800px;
  width: 100%;
  height: 100%;
  padding: 0 5px;
  text-align: center;
  background-color: ${(props) =>
    props.isDark ? "var(--white-50)" : "var(--white)"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  border-radius: 20px;
  border: 1px solid var(--black-500);
  margin-top: 30px;
`;

const ProductInfos = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const Image = styled.div`
  max-width: 400px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const BeforeUpload = styled.div`
  max-width: 300px;
  width: 80%;
  height: 60%;
  background-color: var(--white);
  border-radius: 20px;
  border: 1px solid var(--black-500);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
`;

const Inputs = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SmallInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 10px;
  margin-left: 15px;

  & > label {
    margin-bottom: 5px;
  }
`;

const DateInputs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & input {
    width: 100%;
  }

  & span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const StyledCommonButton = styled(CommonButton)`
  margin-bottom: 20px;
`;

const StyledSellInput = styled(SellInput)`
  width: 280px;
`;

export default function Registration({ seller }) {
  const [uploaded, setUploaded] = useState(null);
  const isDark = useSelector((state) => state.modeReducer);
  const { register, handleSubmit, reset } = useForm();

  const postProduct = async (data) => {
    const {
      address,
      cancellationDeadline,
      capacity,
      content,
      location,
      productName,
      productPrice,
    } = data;

    const newProduct = {
      productName,
      address,
      location,
      content,
      capacity: +capacity,
      cancellationDeadline: cancellationDeadline + "T10:00:00",
      productPrice,
      productPhone: "010-1111-1111",
      latitude: 37.5,
      longitude: 40.5,
      memberId: 1,
    };

    const success = await handlePostCampground(newProduct);

    if (success) {
      console.log(newProduct);
      alert("등록에 성공했습니다.");
      reset();
    } else {
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title isDark={isDark}>고객님의 캠핑장을 등록해주세요.🙋🏻‍♀️</Title>
      <Form onSubmit={handleSubmit(postProduct)}>
        <ProductInfos>
          {uploaded ? (
            <Image />
          ) : (
            <BeforeUpload>이미지를 등록해주세요.</BeforeUpload>
          )}
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
              <DateInputs>
                <SellInput
                  type="date"
                  {...register("cancellationDeadline", { required: true })}
                />
              </DateInputs>
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
          </Inputs>
        </ProductInfos>
        <StyledCommonButton>등록하기</StyledCommonButton>
      </Form>
    </Container>
  );
}
