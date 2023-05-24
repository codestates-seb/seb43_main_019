import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  handleUpdateMemberInfo,
  handleUserWithdrawal,
} from "../../utils/MemberFunctions";
import { checkValidPassword, checkValidPhone } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../Redux/Actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

// modal

export const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 500px;
  height: 100%;
  margin-bottom: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div.desc {
    font-size: 16px;
    color: var(--black);
    margin: 50px;
    padding: 10px 0;
    pointer-events: none;
    transition: 0.5s;
    margin-bottom: 10px;
    align-items: center;
  }
  label {
    font-size: 16px;
    color: var(--black);
    padding: 10px;
    pointer-events: none;
    transition: 0.5s;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
    display: inline-block;
    text-align: center; /* 가운데 정렬을 위해 추가 */
  }

  > div.input-container {
    margin: 10px 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 300px;

    input {
      font-size: 16px;
      padding: 10px 10px 10px 5px;
      display: block;
      width: 200px;
      height: 100%;
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

  & div.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
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
    width: "50%",
    height: "50%",
    margin: "auto",
  },
};

const Btn = styled.div`
  width: 90px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-100);
  border-radius: 10px;
  cursor: pointer;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const Label = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  & label {
    font-size: 15px;
  }
`;

function MyModal(props) {
  const { isOpen, closeModal, userInfo, myInfo } = props;
  const [name, setName] = useState(myInfo.name);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(myInfo.phone);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleName = (event) => {
    setName((prev) => event.target.value);
  };

  const handlePassword = (event) => {
    setPassword((prev) => event.target.value);
  };

  const handlePhone = (event) => {
    setPhone((prev) => event.target.value);
  };

  const handleUpdate = async () => {
    if (checkValidPassword(password) === false) {
      toast("비밀번호가 양식과 맞지 않습니다.");
      toast("비밀번호가 양식과 맞지 않습니다.");
      return;
    }

    if (checkValidPhone(phone) === false) {
      toast("전화번호가 양식과 맞지 않습니다.");
      return;
    }

    const updatedInfo = {
      name,
      password,
      phone,
    };

    const success = await handleUpdateMemberInfo(userInfo, updatedInfo);

    if (success) {
      toast("업데이트에 성공했습니다!");
    } else {
      toast("업데이트에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    const success = await handleUserWithdrawal(userInfo.memberId, userInfo);

    if (success) {
      alert("탈퇴가 완료되었습니다.");
      navigate("/");
      return;
    } else {
      toast("탈퇴가 완료되지 않았습니다.");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={ModalStyle}>
      <ModalBackdrop>
        <ModalView>
          <Exitbtn onClick={closeModal}>&times;</Exitbtn>
          <div className="desc">
            <label>이름,비밀번호,전화번호만 수정 가능합니다.</label>
            <label>사업자 번호를 수정하고 싶으시다면 채팅을 통해</label>
            <label>관리자에게 문의해주세요 :)</label>
          </div>
          <div className="input-container">
            <Label>
              <label htmlFor="name">name</label>
            </Label>
            <input
              type="text"
              id="name"
              required="name"
              value={name}
              onChange={handleName}
            />
          </div>
          <div className="input-container">
            <Label>
              <label htmlFor="password">PW</label>
            </Label>
            <input
              type="password"
              id="password"
              required="PW"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className="input-container">
            <Label>
              <label htmlFor="phone">phone</label>
            </Label>
            <input
              type="text"
              id="phone"
              required="phone"
              value={phone}
              onChange={handlePhone}
            />
          </div>
          <div className="button-container">
            <Btn onClick={handleUpdate}>수정하기</Btn>
          </div>
          <div className="button-container">
            <Btn onClick={handleDelete}>회원탈퇴</Btn>
          </div>
        </ModalView>
      </ModalBackdrop>
      <ToastContainer /> {/* 알림 메시지 컨테이너 */}
    </Modal>
  );
}

export default MyModal;
