import styled from "@emotion/styled";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";

const CloseBtn = styled(AiFillCloseCircle)`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Infos = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Img = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

const Managements = styled.div``;

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

export default function UserModal(props) {
  const { isOpen, closeModal } = props;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} style={ModalStyle}>
      <Wrapper>
        <CloseBtn onClick={closeModal}>닫기!</CloseBtn>
        <Infos>
          <Img />
          <Managements></Managements>
        </Infos>
      </Wrapper>
    </Modal>
  );
}
