import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const Container = styled.div`
  position: fixed;
  top: 100px;
  margin: 0 auto;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: white;
`;

export default function Modal({
  showModal,
  setShowModal,
  width = "500px",
  height = "500px",
}) {
  return showModal ? (
    <>
      <Overlay onClick={() => setShowModal(false)} />
      <Container width={width} height={height}></Container>
    </>
  ) : null;
}
