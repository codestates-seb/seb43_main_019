import styled from "@emotion/styled";

const Container = styled.div`
  width: 80%;
  margin-bottom: 10px;
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Img = styled.div`
  min-width: 250px;
  width: 80%;
  min-height: 250px;
  height: 100%;
  border-radius: 20px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const Managements = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0 10px;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  justify-items: start;
  width: 100%;
  height: 30px;

  margin-bottom: 10px;
`;

const Label = styled.h4`
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Info = styled.h4`
  font-size: 13px;
`;

export default function Reservation({ campground }) {
  return (
    <Container>
      <Img
        bgphoto={
          campground.imageUrl === "http://~"
            ? "https://yeyak.seoul.go.kr/cmsdata/web_upload/svc/20230329/1680050914280HZAYFX8GLLMTVZI2H6BD0WGPV_IM02.jpg"
            : campground.imageUrl
        }
      />
      <Managements>
        <InputLine>
          <Label>캠핑장 이름</Label>
          <Info>{campground.productName}</Info>
        </InputLine>
        <InputLine>
          <Label>캠핑장 주소</Label>
          <Info>{campground.address}</Info>
        </InputLine>
        <InputLine>
          <Label>캠핑장 전화번호</Label>
          <Info>{campground.productPhone}</Info>
        </InputLine>
        <InputLine>
          <Label>캠핑장 가격</Label>
          <Info>{campground.productPrice}</Info>
        </InputLine>
      </Managements>
    </Container>
  );
}
