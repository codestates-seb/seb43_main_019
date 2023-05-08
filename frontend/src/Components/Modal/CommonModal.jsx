import React from 'react';
import Modal from 'react-modal';
import styled from "styled-components";


Modal.setAppElement('#root');

// modal

export const ModalBackdrop = styled.div`
  display: flex;
  justify-content : center;
  align-items : center;
  overflow: hidden;

`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
border-radius: 10px;
background-color: #ffffff;
width: 500px;
height: 200px;
margin-bottom : 300px;
display : flex;
flex-direction: column;
align-items : center;
  > div.desc {
    font-size : 30px;
    color : #475ed4;
    margin : 50px;
  }
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const Exitbtn = styled(ModalBtn)`
background-color: gold;
color: blue;
margin : 10px;
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
    width: '50%',
    height: '50%',
    margin: 'auto',  
	},
};

function CommonModal(props) {
  const { isOpen, closeModal } = props;



  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={ModalStyle}>
    <ModalBackdrop>
    <ModalView>
      <Exitbtn onClick={closeModal}>&times;</Exitbtn>
      <div className='desc'>Congratulation!</div>
    </ModalView>
    </ModalBackdrop>
    </Modal>
  );
}

export default CommonModal;
