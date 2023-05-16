import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";
import KakaoPayButton from "../Components/Payment/KakaoPayBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const Heading = styled.h1`
  margin-top: 100px;
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
  margin-top: 2rem;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
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

const OrderInfoContainer = styled.form`
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
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 5px;
  margin-top: 0.5rem;
  font-size: 1.2rem;
`;

const AgreementContainer = styled.div`
  display: flex;
  width: 60%;
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
  margin-top: 2rem;
`;

const PaymentPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!userState.login) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }, []);

  return (
    <Container style={{ display: isVisible ? "flex" : "none" }}>
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
          </ProductInfoHeading>
          <ProductInfoList>
            <ProductInfoItem>
              <div>제품명</div>
              <div>가격</div>
            </ProductInfoItem>
            <ProductInfoItem>
              <div>제품명</div>
              <div>가격</div>
            </ProductInfoItem>
          </ProductInfoList>
        </ProductInfoContainer>
        <Divider />
        <OrderInfoContainer>
          <OrderInfoHeading>주문자 정보</OrderInfoHeading>
          <InputContainer>
            <InputLabel>이름</InputLabel>
            <InputField type="text" placeholder="이름을 입력해주세요" />
          </InputContainer>
          <InputContainer>
            <InputLabel>이메일</InputLabel>
            <InputField type="email" placeholder="이메일을 입력해주세요" />
          </InputContainer>
          <InputContainer>
            <InputLabel>연락처</InputLabel>
            <InputField type="tel" placeholder="연락처를 입력해주세요" />
          </InputContainer>
          <AgreementContainer>
            <AgreementCheckbox type="checkbox" />
            <AgreementLabel>
              개인정보 수집 및 이용약관에 동의합니다.
            </AgreementLabel>
          </AgreementContainer>
        </OrderInfoContainer>
        <PaymentButtonContainer>
          <KakaoPayButton />
        </PaymentButtonContainer>
      </PaymentContainer>
    </Container>
  );
};

export default PaymentPage;
