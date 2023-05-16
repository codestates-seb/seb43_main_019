import styled from "@emotion/styled";
import { SellInput } from "../Components/Common/Input";
import { useSelector } from "react-redux";
import { CommonButton } from "../Components/Common/Button";
import { Label } from "../Components/Common/Label";

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

export default function ProductCRUD({ hasUploaded, setHasUploaded }) {

  const isDark = useSelector((state) => state.modeReducer);

  return (
    <Container>
      <Title isDark={isDark}>고객님의 캠핑장을 등록해주세요.🙋🏻‍♀️</Title>
      <Form>
          <ProductInfos>
            {hasUploaded ? (
              <Image />
            ) : (
              <BeforeUpload>이미지를 등록해주세요.</BeforeUpload>
            )}
            <Inputs>
              <SmallInput>
                <Label htmlFor="name">이름</Label>
                <SellInput id="name" />
              </SmallInput>
              <SmallInput>
                <Label htmlFor="location">위치</Label>
                <StyledSellInput id="location" />
              </SmallInput>
              <SmallInput>
                <Label htmlFor="price">가격</Label>
                <SellInput type="number" min="0" id="price" />
              </SmallInput>
              <SmallInput>
                <Label>기간</Label>
                <DateInputs>
                  <SellInput type="date" />
                  <span>~</span>
                  <SellInput type="date" />
                </DateInputs>
              </SmallInput>
              <SmallInput>
                <Label htmlFor="capacity">수용인원</Label>
                <SellInput type="number" min="0" id="capacity" />
              </SmallInput>
              <SmallInput>
                <Label htmlFor="restriction">제한사항</Label>
                <StyledSellInput id="restriction" />
              </SmallInput>
            </Inputs>
          </ProductInfos>
          <StyledCommonButton>등록하기</StyledCommonButton>
      </Form>
    </Container>
  );
}
