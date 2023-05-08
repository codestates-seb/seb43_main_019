import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaAddressCard, FaTwitch, FaSellcast } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyModal from "../Components/Modal/MyModal";
import RsModal from "../Components/Modal/RsModal";
import SeModal from "../Components/Modal/SeModal";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.02vw;
`;

const UserArea = styled.div`
  width: 100%;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const SellArea = styled.div`
  width: 100%;
`;

const ProfileCard = styled.button`
  box-sizing: border-box;
  width: 230px;
  height: 200px;
  background: var(--white);
  border: 1px solid white;
  box-shadow: 12px 17px 51px var(--gray-300);
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
  color: black;
  margin-right: 20px;
  font-family: "Noto Sans KR", sans-serif;

  &:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }
`;

const Title = styled.h2`
  margin-top: 100px !important;
  margin-bottom: 80px !important;
  margin-left: 360px !important;
  font-family: "Noto Sans KR", sans-serif;
`;

const SellMent = styled.p`
  margin-top: 100px !important;
  margin-left: 360px !important;
  font-family: "Noto Sans KR", sans-serif;
`;

const SellLink = styled.p`
  margin-left: 360px !important;
  font-family: "Noto Sans KR", sans-serif;
`;


export default function Mypage() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userState.login === false) {
      navigate("/");
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <UserArea>
        <Title>OO님 안녕하세요☺️</Title>
      </UserArea>
      <ButtonArea>
        <div>
        <ProfileCard
        onClick={openModal}
        >
          <FaAddressCard size={25} /> &nbsp;개인정보관리
        </ProfileCard>
        <MyModal isOpen={isOpen} closeModal={closeModal}/>
        </div>
        <div>
        <ProfileCard
        onClick={openModal}
        >
          <FaTwitch size={25} />
          &nbsp;예약관리
        </ProfileCard>
        <RsModal isOpen={isOpen} closeModal={closeModal}/>
        </div>
        <div>
        <ProfileCard
        onClick={openModal}
        >
          <FaSellcast size={25} />
          &nbsp;판매자 등록
        </ProfileCard>
        <MyModal isOpen={isOpen} closeModal={closeModal}/>
        </div>
      </ButtonArea>
      <SellArea>
        <SellMent>판매상품을 원하신다면 아래 링크를 눌러주세요👇🏻</SellMent>
        <SellLink>판매하러 가기↪️</SellLink>
      </SellArea>
    </Wrapper>
  );
}
