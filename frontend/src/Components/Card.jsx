import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const Container = styled.div`
 width: 250px;
 height: 350px;
 background: white;
 border-radius: 10px;
 transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

 /* &:shadow {
  box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(190, 190, 190),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
 } */

  &:active {
    transform: scale(0.95);
  }

  &::before {
    // 전체적인 은은한 그림자 넣는 거
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0px 0px 25px 5px rgba(255, 255, 255, 0.5);
    z-index: 1;
  }

  &::after {
    content: "예약하기";
    position: absolute;
    bottom: -20%;
    left: 0;
    padding-left: 15px;
    background-color: ${(props) =>
      props.isDark ? "var(--gray-400)" : "var(--gray-100)"};
    width: 100%;
    height: 60px;
    color: ${(props) => (props.isDark ? "var(--white)" : "var(--black)")};
    line-height: 50px;
    text-transform: uppercase;
    z-index: 2;
    transition: all 0.2s ease-in;

    font-size: 20px;
    font-weight: bold;
  }

  &:hover::after {
    bottom: 0;
  }

  &:active::after {
    content: "자세히 보기";
    height: 65px;
  }

  &:hover .image {
    // width, height 적절히 설정
    /* top: 20%;
    left: 30%; */
    width: 300px;
    height: 300px;
    animation: none;
    // transform: rotate(15deg) translate(-35%, -25%);
  }

  &:hover .text {
    left: 5%;
    width: auto;
    color: ${(props) => (props.isDark ? "var(--white)" : "var(--black)")};
  }
`;

const Img = styled.div`
  // width, height 적절히 설정
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  filter: drop-shadow(3px 3px 5px #18181815);
  transform: translate(-50%, -50%);
  animation: shoes 1s ease infinite alternate;
  transition: all 0.5s ease-in;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const Text = styled.div`
  position: absolute;
  top: 2%;
  left: -100%;
  color: #181818;
  transition: all 0.2s ease-in;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

const Price = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

export default function Card({ campground }) {
  const isDark = useSelector((state) => state.modeReducer);

  return (
    <Container isDark={isDark}>
      <Img className="image" bgphoto={campground.img} />
      <Text className="text">
        <Title>{campground.name}</Title>
        <Price>{`₩ ${campground.price} / 박`}</Price>
      </Text>
    </Container>
  );
}
