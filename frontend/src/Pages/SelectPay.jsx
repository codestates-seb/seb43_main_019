import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KakaoPayButton from "../Components/Payment/KakaoPayBtn";
import { postPaymentData } from "../utils/ProductFunctions";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  max-width: 450px;
  width: 80%;
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
  padding-bottom: 50px;
`;

const Logo = styled.img`
  width: auto;
  height: 90px;
  padding-top: 50px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  width: auto;
  font-family: "Noto Sans KR", sans-serif;
  color: "var(--black-700)";
  margin-bottom: 40px;
`;

const Text = styled.div`
  padding: 20px 0px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: gray;
`;

const Text2 = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const PayPage = (props) => {
  const [redirectUrl, setRedirectUrl] = useState("");
  const navigate = useNavigate();
  const { reservationId, productPrice } = props.location.state || {};

  const handleSubmitPayment = async () => {
    try {
      const paymentData = {
        reservation_id: reservationId,
        actual_payment_amount: productPrice,
      };

      const response = await postPaymentData(paymentData);
      setRedirectUrl(response.next_redirect_pc_url);
      window.open(response.next_redirect_pc_url); // 새 창을 열기 위해 redirectUrl을 사용하여 페이지 열기
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Form>
        <Logo src={"/img/Logo_Light.png"} />
        <Title>지금 당장 캠핑을 떠나보세요.⛺</Title>
        <KakaoPayButton onClick={handleSubmitPayment} isAgreed={true}>
          카카오페이로 결제하기
        </KakaoPayButton>
      </Form>
      <Text>판매등록을 원하신다면 아래 링크를 눌러주세요</Text>
      <Text2 onClick={() => navigate("/sell")}>판매 등록하러 가기↪️</Text2>
    </Wrapper>
  );
};

export default PayPage;
