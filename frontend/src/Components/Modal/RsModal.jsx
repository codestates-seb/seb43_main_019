import styled from "@emotion/styled";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { getMemberReservations } from "../../Util/ProductFunctions";
import Reservation from "../MyPage/Reservation";
import Spinner from "../Common/Spinner";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

// modal

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

const Exitbtn = styled(ModalBtn)`
  background-color: var(--black);
  color: var(--white);
  margin: 10px;
  padding: 5px 10px;
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
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const result = await getMemberReservations(userInfo);

      setCampgrounds((prev) => [...result]);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} style={ModalStyle}>
      <Wrapper>
        <Exitbtn onClick={closeModal}>&times;</Exitbtn>
        {isLoading ? (
          <Spinner />
        ) : campgrounds.length === 0 ? (
          <label style={{ marginTop: "50px" }}>예약한 캠핑장이 없습니다.</label>
        ) : (
          <>
            {campgrounds.map((campground) => (
              <Reservation
                key={campground.reservationId}
                campground={campground}
                userInfo={userState.userInfo}
              />
            ))}
          </>
        )}
      </Wrapper>
    </Modal>
  );
}

export default MyModal;
