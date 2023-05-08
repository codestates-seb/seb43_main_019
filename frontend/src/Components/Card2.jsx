import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMap, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  background-color: transparent;
  width: 300px;
  height: 400px;
  perspective: 1000px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  &:hover .inner {
    transform: rotateY(180deg);
  }
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 5px;
  border-radius: 2em;
  backface-visibility: hidden;
  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white)"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--emerald-700)")};
  border: 4px solid var(--emerald-700);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.div`
  border: none;
  border-radius: 30px;
  width: 270px;
  height: 270px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const Name = styled.div`
  margin-top: 50px;
  font-size: 20px;
  font-weight: bold;
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 2em;
  backface-visibility: hidden;
  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white)"};

  border: 4px solid var(--emerald-700);
  transform: rotateY(180deg);
  padding: 11px;
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  letter-spacing: 1px;
  display: grid;
  grid-template-rows: 3fr 1fr;
`;

const Descriptions = styled.div`
  padding: 0 20px;
  height: 300px;
  display: grid;
  grid-template-rows: 4fr 1fr;
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--emerald-700)")};
`;

const Description = styled.div`
  font-size: ${(props) => props.fontSize};
  display: flex;
  align-items: center;
  justify-content: start;
`;

const PricePeriod = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--emerald-700)")};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
`;

const loremIpsum =
  "있으며, 심장의 그들은 얼마나 힘차게 길지 때문이다. 없는 있는 피가 따뜻한 못하다 붙잡아 피고 우리 말이다. 희망의 새 피에 같이 따뜻한 찾아 튼튼하며, 인간은 무한한 운다. 무엇이 웅대한 청춘에서만 갑 위하여, 칼이다. 같은 튼튼하며, 낙원을 이성은 품었기 인생에 몸이";

export default function Card2({ campground }) {
  const isDark = useSelector((state) => state.modeReducer);
  const [infoType, setInfoType] = useState(null);

  const handleInfoType = (clickedType) => {
    setInfoType((prev) => clickedType);
  };

  const getInfo = (type) => {
    switch (type) {
      case "seller":
        return `판매자: ${campground.seller}`;
      case "call":
        return `전화번호: ${campground.call}`;
      case "location":
        return `위치: ${campground.location}`;
      default:
        return loremIpsum;
    }
  };

  return (
    <Container>
      <Inner className="inner">
        <Front isDark={isDark}>
          <Img bgphoto={campground.img} />
          <Name>{campground.name}</Name>
        </Front>
        <Back isDark={isDark}>
          <Info>
            <Link to={`/${campground.id}`}>
              <Descriptions isDark={isDark}>
                <Description fontSize={infoType ? "20px" : "15px"}>
                  {getInfo(infoType)}
                </Description>
                <PricePeriod>
                  <span>{`₩ ${campground.price} / 박`}</span>
                  <span>{campground.period}</span>
                </PricePeriod>
              </Descriptions>
            </Link>
            <Icons isDark={isDark}>
              <Icon onClick={() => handleInfoType("seller")} icon={faUser} />
              <Icon onClick={() => handleInfoType("call")} icon={faPhone} />
              <Icon onClick={() => handleInfoType("location")} icon={faMap} />
            </Icons>
          </Info>
        </Back>
      </Inner>
    </Container>
  );
}
