import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaAddressCard, FaTwitch, FaSellcast } from "react-icons/fa";
import Spinner from "../Components/Common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyModal from "../Components/Modal/MyModal";
import RsModal from "../Components/Modal/RsModal";
import SeModal from "../Components/Modal/SeModal";
import { getMemberInfo } from "../utils/MemberFunctions";
import { toast } from "react-toastify";
import { handleLogout } from "../Redux/Actions";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.02vw;

  @media screen and (max-width: 480px) {
    margin-top: 100px;
  }
`;

const UserArea = styled.div``;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const SellArea = styled.div`
  @media screen and (min-width: 480px) {
    width: 100%;
  }
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
  margin: 0 20px;
  font-family: "Noto Sans KR", sans-serif;

  &:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }

  @media screen and (max-width: 480px) {
    margin: 20px 0;
  }
`;

const Title = styled.h2`
  margin-top: 100px !important;
  margin-bottom: 80px !important;
  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
`;

const SellMent = styled.p`
  @media screen and (min-width: 480px) {
    margin-top: 100px !important;
    margin-left: 360px !important;
  }

  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
`;

const SellLink = styled.p`
  @media screen and (min-width: 480px) {
    margin-left: 360px !important;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 100px;
  }

  font-family: "Noto Sans KR", sans-serif;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
`;

export default function Mypage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [MyModalOpen, setMyModalOpen] = useState(false);
  const [RsModalOpen, setRsModalOpen] = useState(false);
  const [SeModalOpen, setSeModalOpen] = useState(false);
  const [myInfo, setMyInfo] = useState({ name: "", phone: "" });
  const [isSeller, setIsSeller] = useState(false);

  const userState = useSelector((state) => state.UserReducer);
  const isDark = useSelector((state) => state.ModeReducer);

  const dispatch = useDispatch();

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
    (async () => {
      if (userState.login === false) {
        toast("로그인이 되지 않았습니다.");
        navigate("/login");
        return;
      }

      setIsLoading((prev) => true);

      const data = await getMemberInfo(userState.userInfo);

      if (data === null) {
        toast("토큰이 만료되었습니다.");
        dispatch(handleLogout());
        navigate("/login");
        return;
      }

      setMyInfo((prev) => data);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : myInfo ? (
        <>
          <UserArea>
            <Title isDark={isDark}>{`${myInfo.name}님 안녕하세요☺️`}</Title>
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
                myInfo={myInfo}
                isSeller={isSeller}
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
                {userState.userInfo.roles.includes("SELLER")
                  ? "판매자 수정"
                  : "판매자 등록"}
              </ProfileCard>
              <SeModal isOpen={SeModalOpen} closeModal={closeSeModal} />
            </div>
          </ButtonArea>
          {userState.userInfo.roles.includes("SELLER") && (
            <SellArea>
              <SellMent isDark={isDark}>
                판매등록을 원하신다면 아래 링크를 눌러주세요👇🏻
              </SellMent>
              <SellLink isDark={isDark}>
                <span onClick={() => navigate("/sell")}>
                  판매 등록하러 가기↪️
                </span>
              </SellLink>
            </SellArea>
          )}
        </>
      ) : null}
    </Wrapper>
  );
}
