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

export default function ProductManage() {
  return (
    <Container>
      <Title>상품등록화면</Title>
    </Container>
  );
}
