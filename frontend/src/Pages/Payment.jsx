import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";
import KakaoPayButton from "../Components/Payment/KakaoPayBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
  postPaymentData,
  postReservationsData,
} from "../utils/ProductFunctions";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Form = styled.form`
  max-width: 800px;
  width: 100%;
  padding: 0 15px;
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
  margin-top: 80px;
`;

const Heading = styled.h1`
  margin-top: 50px;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const PaymentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 2rem;
`;

const ProductInfoHeading = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.5rem;
`;

const ProductInfoList = styled.ul`
  list-style: none;
  margin: 1rem 0;
`;

const ProductInfoItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const Divider = styled.hr`
  margin: 2rem 0;
  border: none;
  border-bottom: 1px solid gray;
  width: 100%;
`;

const OrderInfoContainer = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
`;

const OrderInfoHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

const InputLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  font-size: 13px;
  outline: 0;
  background: rgb(255, 255, 255);
  box-shadow: transparent 0px 0px 0px 1px inset;
  padding: 0.6em;
  border-radius: 14px;
  border: 1px solid #333;
  color: black;
  margin: 0 auto;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const AgreementContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const AgreementCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const AgreementLabel = styled.label`
  font-size: 0.8rem;
`;

const PaymentButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.7rem;
`;

const PaymentPage = () => {
  const location = useLocation();
  const { data, startDate } = location.state || {};
  const [isVisible, setIsVisible] = useState(false);
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [isAgreed, setIsAgreed] = useState(false);
  console.log(data);
  console.log(startDate);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!userState.login) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }, []);

  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handlePaymentSubmit = async (formData) => {
    // 예약 정보 등록
    const reservationData = {
      memberId: data.memberId,
      productId: data.productId,
      reservationDate: startDate,
      reservationName: watch("text"),
      reservationPhone: watch("tel"),
      reservationEmail: watch("email"),
    };

    try {
      await postReservationsData(reservationData);
      setIsAgreed(true);
      console.log("예약 정보 등록 완료");
    } catch (error) {
      setIsAgreed(false);
      console.error("예약 정보 등록 실패:", error);
      return;
    }

    // 결제 정보 전송
    // const paymentData = {
    //   reservation_id: "{reservation_id}",
    //   used_reward_points: "3023",
    //   actual_payment_amount: data.productPrice,
    // };

    // try {
    //   await postPaymentData(paymentData);
    //   console.log("결제 정보 전송 완료");
    // } catch (error) {
    //   console.error("결제 정보 전송 실패:", error);
    //   return;
    // }

    // 예약 및 결제 완료 후 다음 작업 수행
    // ...
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(handlePaymentSubmit)}>
        <Heading>결제하기</Heading>
        <PaymentContainer>
          <ProductInfoContainer>
            <ProductInfoHeading>
              <div>상품정보</div>
              <div>
                <BiDollar style={{ marginRight: "0.3rem" }} />
                결제금액
                <RiArrowDownSLine style={{ marginLeft: "0.3rem" }} />
              </div>
              <div>예약날짜</div>
            </ProductInfoHeading>
            <ProductInfoList>
              <ProductInfoItem>
                <div>{data.content}</div>
                <div>{data.productPrice}</div>
                <div>{startDate}</div>
              </ProductInfoItem>
            </ProductInfoList>
          </ProductInfoContainer>
          <Divider />
          <OrderInfoContainer>
            <OrderInfoHeading>주문자 정보</OrderInfoHeading>
            <InputContainer>
              <InputLabel>예약자명</InputLabel>
              <Input
                type="text"
                placeholder="이름을 입력해주세요"
                {...register("text", { required: true })}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>이메일</InputLabel>
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
                {...register("email", { required: true })}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>연락처</InputLabel>
              <Input
                type="tel"
                placeholder="연락처를 입력해주세요"
                {...register("tel", { required: true })}
              />
            </InputContainer>
            <AgreementContainer>
              <AgreementCheckbox
                type="checkbox"
                onChange={handleAgreementChange}
              />
              <AgreementLabel>
                개인정보 수집 및 이용약관에 동의합니다.
              </AgreementLabel>
            </AgreementContainer>
          </OrderInfoContainer>
          <PaymentButtonContainer>
            <KakaoPayButton
              type="submit"
              onClick={handlePaymentSubmit}
              isAgreed={isAgreed}
            />
          </PaymentButtonContainer>
        </PaymentContainer>
      </Form>
    </Container>
  );
};

export default PaymentPage;
