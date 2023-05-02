import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Img = styled.div`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  width: 300px;
  height: 300px;
  border-radius: 30px;
`;

const Descriptions = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  padding-left: 10px;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
`;

const Description = styled.span``;

export default function Campground({ campground }) {
  return (
    <Container>
      <Img bgphoto={campground.img} />
      <Descriptions>
        <Description>{campground.name}</Description>
        <Description>{campground.period}</Description>
        <Description>{`₩ ${campground.price} / 박`}</Description>
      </Descriptions>
    </Container>
  );
}
