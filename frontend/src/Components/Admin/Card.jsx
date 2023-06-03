import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductModal from "../Modal/ProductModal";
import { getMemberInfo } from "../../utils/MemberFunctions";

const Container = styled.div`
  background-color: transparent;
  width: 250px;
  height: 350px;
  perspective: 1000px;
  border-radius: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  background-color: ${(props) =>
    props.isDark ? "var(--white-50)" : "var(--white)"};
  color: var(--black-700);
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

const Infos = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Info = styled.h5`
  font-size: 15px;
  margin: 0;
`;

export default function Card({ campground }) {
  const [openModal, setOpenModal] = useState(false);

  const isDark = useSelector((state) => state.ModeReducer);

  const handleOpenModal = () => {
    setOpenModal((prev) => true);
  };

  const handleCloseModal = () => {
    setOpenModal((prev) => false);
  };

  return (
    <>
      <Container onClick={handleOpenModal}>
        <Inner className="inner">
          <Front isDark={isDark}>
            <Img bgphoto={campground.imageUrl} />
            <Infos>
              <Info>{`이름: ${campground.productName}`}</Info>
              <Info>{`위치: ${campground.location}`}</Info>
              <Info>{`가격: ${campground.productPrice}`}</Info>
            </Infos>
          </Front>
        </Inner>
      </Container>
      <ProductModal
        isOpen={openModal}
        closeModal={handleCloseModal}
        campground={campground}
      />
    </>
  );
}
