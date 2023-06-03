import styled from "@emotion/styled";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMap, faBarcode } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { formatPrice } from "../../Tools/Functions";

const Container = styled.div`
  background-color: transparent;
  width: 250px;
  height: 350px;
  perspective: 1000px;
  border-radius: 10px;
  border: 1 soild;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover .inner {
    transform: rotateY(180deg);
  }

  @media screen and (max-width: 400px) {
    width: calc(100% - 25px);
    height: 230px;
    margin-bottom: 50px;
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
  border: 1px solid var(--black-500); /* Add border */
  backface-visibility: hidden;
  background-color: ${(props) =>
    props.isDark ? "var(--white-50)" : "var(--white)"};
  color: var(--black-700);
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
  font-size: 18px;

  @media screen and (max-width: 400px) {
    font-size: 12px;
  }
`;

const Selection = styled.div`
  margin: 30px 0 10px 0;
  font-size: 13px;

  @media screen and (max-width: 400px) {
    font-size: 8px;
  }
`;

const Price = styled.div`
  font-size: 25px;

  @media screen and (max-width: 400px) {
    font-size: 20px;
  }
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 2em;
  border: 1px solid var(--black-500); /* Add border */
  backface-visibility: hidden;
  background-color: ${(props) =>
    props.isDark ? "var(--white-50)" : "var(--white)"};
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
  width: 250px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; // 추가
  color: var(--black-700);
  height: 250px;
`;

const Description = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center; // 추가

  @media screen and (max-width: 400px) {
    font-size: 15px;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--black-700);
  margin-bottom: 100px;

  height: 100px;
  @media screen and (max-width: 400px) {
    margin-bottom: 70px;
    justify-content: space-around;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 25px;
  cursor: pointer;

  @media screen and (max-width: 400px) {
    font-size: 15px;
    width: 80%;
  }
`;

export default function Card2({ campground }) {
  const [infoType, setInfoType] = useState(null);

  const isDark = useSelector((state) => state.ModeReducer);

  const handleInfoType = (clickedType) => {
    setInfoType((prev) => clickedType);
  };

  const getInfo = (type) => {
    switch (type) {
      case "price":
        return `가격: ${formatPrice(campground.productPrice)}`;
      case "call":
        return `안심번호: ${campground.productPhone}`;
      case "location":
        return `위치: ${campground.location}`;
      default:
        return campground.content;
    }
  };

  return (
    <Container>
      <Inner className="inner">
        <Front isDark={isDark}>
          <Img bgphoto={campground.imageUrl} />
          <Selection></Selection>
          <Name>{campground.productName}</Name>
          <Price>{formatPrice(campground.productPrice)}</Price>
        </Front>
        <Back isDark={isDark}>
          <Info>
            <Link to={`/${campground.productId}`}>
              <Descriptions isDark={isDark}>
                <Description>{getInfo(infoType)}</Description>
              </Descriptions>
            </Link>
            <Icons isDark={isDark}>
              <Icon onClick={() => handleInfoType("price")} icon={faBarcode} />
              <Icon onClick={() => handleInfoType("call")} icon={faPhone} />
              <Icon onClick={() => handleInfoType("location")} icon={faMap} />
            </Icons>
          </Info>
        </Back>
      </Inner>
    </Container>
  );
}
