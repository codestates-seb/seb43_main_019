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
margin-bottom : 400px;
display : flex;
flex-direction: column;
align-items : center;
  > div.desc  {
    font-size : 16px;
    color : var(--black);
    margin : 50px;
    padding: 10px 0;
    pointer-events: none;
    transition: .5s;
    margin-bottom: 10px;
  }
  label {
    font-size: 16px;
      color: var(--black);
      padding: 10px;
      pointer-events: none;
      transition: .5s;
      margin-right: 20px;
      align-items: center;
  }

  > div.input-container {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    input[type="text"] {
      font-size: 16px;
      padding: 10px 10px 10px 5px;
      display: block;
      width: 185px;
      border: none;
      border-bottom: 1px solid #6c6c6c;
      background: transparent;
      color: var(--black);

      &:focus {
        outline: none;
        border-color: var(--black);
      }
    }
    button {
      margin-top: 1.2rem;
      padding: 10px 20px;
     border-radius: 10px;
    }
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

export const input = styled.input`
    font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 185px;
  border: none;
  border-bottom: 1px solid #6c6c6c;
  background: transparent;
  color: #475ed4;
`;

export const Exitbtn = styled(ModalBtn)`
background-color: var(--black);
color: var(--white);
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

function MyModal(props) {
  const { isOpen, closeModal } = props;



  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={ModalStyle}>
    <ModalBackdrop>
    <ModalView>
      <Exitbtn onClick={closeModal}>&times;</Exitbtn>
      <div className='desc'>
      <label>이름,비밀번호,전화번호만 수정 가능합니다.</label>
      </div>
      <div className='input-container'>
      <label>name</label>
      <input type="text" name="" required="name"></input>
      </div>
      <div className='input-container'>
      <label htmlFor="nameInput">ID</label>
      <input type="text" name="" required="ID"></input>
      </div>
      <div className='input-container'>
      <label>PW</label>
      <input type="text" name="" required="PW"></input>
      </div>
      <div className='input-container'>
      <label>date</label>
      <input type="text" name="" required="date"></input>
      </div>
      <div className='input-container'>
      <label>phone</label>
      <input type="text" name="" required="phone"></input>
      </div>
      <div className='input-container'>
      <button>수정하기</button>
      </div>
      <div className='input-container'>
      <button>회원탈퇴</button>
      </div>
    </ModalView>
    </ModalBackdrop>
    </Modal>
  );
}

export default MyModal;
