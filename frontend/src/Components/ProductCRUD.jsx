import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  margin-left: 300px;
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

const Title = styled.h1`
  width: 100%;
  font-size: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Line = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 80%;
  height: 35px;
  font-size: 20px;
  padding-left: 20px;
  outline: none;
`;

const ProductInfos = styled.div`
  height: 400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  justify-items: center;
  align-items: center;
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
  max-width: 400px;
  width: 100%;
  height: 100%;
  background-color: var(--gray-300);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  cursor: pointer;
`;

const Inputs = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const SmallInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 10px;
`;

const DateInputs = styled.div`
  display: flex;
  flex-direction: column;
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

export default function ProductCRUD({ hasUploaded, setHasUploaded }) {
  return (
    <Container>
      <Title>상품등록화면</Title>
      <Form>
        <Line>
          <Label>상품명</Label>
          <Input />
        </Line>
        <Line>
          <Label>상품대표이미지</Label>
          <ProductInfos>
            {hasUploaded ? (
              <Image />
            ) : (
              <BeforeUpload>상품 이미지 등록</BeforeUpload>
            )}
            <Inputs>
              <SmallInput>
                <Label htmlFor="name">이름</Label>
                <Input id="name" />
              </SmallInput>
              <SmallInput>
                <Label htmlFor="location">위치</Label>
                <Input id="location" />
              </SmallInput>
              <SmallInput>
                <Label htmlFor="price">가격</Label>
                <Input type="number" min="0" id="price" />
              </SmallInput>
              <SmallInput>
                <Label>기간</Label>
                <DateInputs>
                  <Input type="date" />
                  <span>~</span>
                  <Input type="date" />
                </DateInputs>
              </SmallInput>
              <SmallInput>
                <Label htmlFor="capacity">수용인원</Label>
                <Input type="number" min="0" id="capacity" />
              </SmallInput>
              <SmallInput>
                <Label htmlFor="restriction">제한사항</Label>
                <Input id="restriction" />
              </SmallInput>
            </Inputs>
          </ProductInfos>
        </Line>
      </Form>
    </Container>
  );
}
