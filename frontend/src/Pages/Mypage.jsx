import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaAddressCard, FaTwitch, FaSellcast } from "react-icons/fa";
import Spinner from "../Components/Common/Spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyModal from "../Components/Modal/MyModal";
import RsModal from "../Components/Modal/RsModal";
import SeModal from "../Components/Modal/SeModal";
import { getMemberInfo } from "../utils/MemberFunctions";

const Loader = styled.h1`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100vh;
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
  margin-left: 250px;
  align-items: center;
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
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
`;

const SellMent = styled.p`
  margin-top: 100px !important;
  margin-left: 360px !important;
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
`;

const SellLink = styled.p`
  margin-left: 360px !important;
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
`;

export default function Mypage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const isDark = useSelector((state) => state.modeReducer);
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.userReducer);
  const [MyModalOpen, setMyModalOpen] = useState(false);
  const [RsModalOpen, setRsModalOpen] = useState(false);
  const [SeModalOpen, setSeModalOpen] = useState(false);

  // 만약 현재 로그인한 상태가 아니라면 로그인 페이지로 보냄
  useEffect(() => {
    if (userState.login === false) {
      navigate("/login");
    }
  }, []);

  const openMyModal = () => {
    setMyModalOpen(true);
  };
  const openRsModal = () => {
    setRsModalOpen(true);
  };
  const openSeModal = () => {
    setSeModalOpen(true);
  };

  const closeMyModal = () => {
    setMyModalOpen(false);
  };
  const closeRsModal = () => {
    setRsModalOpen(false);
  };
  const closeSeModal = () => {
    setSeModalOpen(false);
  };

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        if (userState.login) {
          const response = await getMemberInfo(userState.memberId);
          if (response) {
            setName(response.name);
          } else {
            console.error("회원 정보를 가져오는 중 오류가 발생했습니다.");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("회원 정보를 가져오는 중 오류가 발생했습니다.", error);
      }
    };
  
    fetchMemberInfo();
  }, [userState]);


  return isLoading ? (
    <Loader><Spinner /></Loader>
  ) : (
    <Wrapper>
      <UserArea>
        <Title isDark={isDark}>{name}님 안녕하세요☺️</Title>
      </UserArea>
      <ButtonArea>
        <div>
          <ProfileCard onClick={openMyModal}>
            <FaAddressCard size={25} /> &nbsp;개인정보관리
          </ProfileCard>
          <MyModal
            isOpen={MyModalOpen}
            closeModal={closeMyModal}
            userInfo={userState.userInfo}
          />
        </div>
        <div>
          <ProfileCard onClick={openRsModal}>
            <FaTwitch size={25} />
            &nbsp;예약관리
          </ProfileCard>
          <RsModal
            isOpen={RsModalOpen}
            closeModal={closeRsModal}
            userInfo={userState.userInfo}
          />
        </div>
        <div>
          <ProfileCard onClick={openSeModal}>
            <FaSellcast size={25} />
            &nbsp;판매자 등록
          </ProfileCard>
          <SeModal isOpen={SeModalOpen} closeModal={closeSeModal} />
        </div>
      </ButtonArea>
      <SellArea>
        <SellMent isDark={isDark}>
          판매등록을 원하신다면 아래 링크를 눌러주세요👇🏻
        </SellMent>
        <SellLink isDark={isDark}>
          <span onClick={() => navigate("/sell")}>판매 등록하러 가기↪️</span>
        </SellLink>
      </SellArea>
    </Wrapper>
  );
}
