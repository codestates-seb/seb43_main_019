import styled from "@emotion/styled";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import {
  getMemberReservations,
  handleDeleteCampground,
  handleUpdateCampground,
} from "../../utils/ProductFunctions";
import { getAllCampgroundsInfo } from "../../utils/ProductFunctions";
import { dummyCampgrounds } from "../../Dummy/DummyDatas";
import Reservation from "../Reservation";

Modal.setAppElement("#root");

// modal
const CloseBtn = styled(AiFillCloseCircle)`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Infos = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Img = styled.div`
  min-width: 250px;
  width: 80%;
  min-height: 250px;
  height: 100%;
  border-radius: 20px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const Managements = styled.form`
  margin-left: 20px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0 10px;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  justify-items: start;
  width: 100%;
  height: 30px;

  margin-bottom: 10px;
`;

const Label = styled.div`
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Input = styled.input`
  width: 60%;
  height: 100%;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const Btns = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Btn = styled.button`
  width: 100px;
  height: 40px;
  background-color: var(--gray-100);
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const ModalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    zIndex: 10,
    minWidth: "800px",
    width: "50%",
    minHeight: "450px",
    height: "50%",
    margin: "auto",
  },
};

function MyModal(props) {
  const { isOpen, closeModal, userInfo } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const allCampgrounds = await getMemberReservations(userInfo);

      if (allCampgrounds) {
        const reservations = allCampgrounds.filter(
          (campground) => campground.memberId === userInfo.memberId
        );
        setCampgrounds((prev) => [...reservations]);
      }

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} style={ModalStyle}>
      <Wrapper>
        <CloseBtn onClick={closeModal} />
        {isLoading ? (
          <h1>Loading...</h1>
        ) : campgrounds.length === 0 ? (
          <h1>예약한 캠핑장이 없습니다.</h1>
        ) : (
          <>
            {campgrounds.map((campground) => (
              <Reservation key={campground.productId} campground={campground} />
            ))}
          </>
        )}
      </Wrapper>
    </Modal>
  );
}

export default MyModal;
