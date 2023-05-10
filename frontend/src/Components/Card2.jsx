import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMap, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  background-color: transparent;
  width: 250px;
  height: 350px;
  perspective: 1000px;
  border-radius: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover .inner {
    transform: rotateY(180deg);

  &:shadow{
    box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(190, 190, 190),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
  }
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
  border-radius: 2em;
  backface-visibility: hidden;
  background-color: var(--white);
  color: ${(props) => (props.isDark ? "var(--black)" : "var(--black-700)")};
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 30px;
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  
`;

const Name = styled.div`
  margin-bottom: 10px;
  font-size: 18px
`;

const Selection = styled.div`
  margin: 30px 0 10px 0;
  font-size: 13px;
  /* color : #DF2E38; */
`;

const Price = styled.div`
  /* margin: 30px 0 10px 0; */
  font-size: 25px;
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 2em;
  backface-visibility: hidden;
  background-color: var(--white);
  border: none;
  transform: rotateY(180deg);
  padding: 11px;
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  letter-spacing: 1px;
  display: grid;
  grid-template-rows: 3fr 1fr;
  align-items: center;
  justify-content: center;
  text-align: center; // 추가
`;

const Descriptions = styled.div`
  padding: 0 10px;
  /* height: 300px; */
  display: grid;
  grid-template-rows: 4fr 1fr;
  align-items: center;
  justify-content: center;
  text-align: center; // 추가
  color: var(--black-700);
  
`;

const Description = styled.div`
  font-size: ${(props) => props.fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center; // 추가
  
`;


const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--black-700);
  margin-bottom: 100px;

`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 25px;
  cursor: pointer;
  
`;

const loremIpsum =
  "지금 바로 예약하세요!"

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
        return `안심번호: ${campground.call}`;
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
          <Selection>{campground.selection},{campground.restriction}</Selection>
          <Name>{campground.name}</Name>
          <Price>{campground.price}</Price>
        </Front>
        <Back isDark={isDark}>
          <Info>
            <Link to={`/${campground.id}`}>
              <Descriptions isDark={isDark}>
                <Description fontSize={infoType ? "20px" : "15px"}>
                  {getInfo(infoType)}
                </Description>
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
