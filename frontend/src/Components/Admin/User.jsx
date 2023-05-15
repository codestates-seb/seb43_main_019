import styled from "@emotion/styled";
import { FcBusinessman } from "react-icons/fc";
import { BsInfoCircleFill } from "react-icons/bs";
import UserModal from "../Modal/UserModal";
import { useState } from "react";

const Container = styled.div`
  width: 80%;
  height: 100px;
  border-radius: 50px;
  border: 1px solid var(--black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  margin: 10px 0;
`;

const Info = styled.h3`
  margin: 5px 0;
`;

const Infos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;

  @media screen and (max-width: 700px) {
    justify-content: center;
  }
`;

const MainInfos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  @media screen and (max-width: 700px) {
    align-items: center;
  }
`;

const SideInfos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export default function User() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal((prev) => true);
  };

  const handleCloseModal = () => {
    setOpenModal((prev) => false);
  };

  return (
    <>
      <Container>
        <FcBusinessman size={"50px"} />
        <Infos>
          <MainInfos>
            <Info>사람 이름</Info>
            <Info>사람 ID</Info>
          </MainInfos>
          <SideInfos>
            <Info>사람 Email</Info>
            <Info>판매자인지?</Info>
          </SideInfos>
        </Infos>
        <BsInfoCircleFill onClick={handleOpenModal} size={"50px"} />
      </Container>
      <UserModal isOpen={openModal} closeModal={handleCloseModal} />
    </>
  );
}
