import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { handleUpdateMemberInfo } from "../../utils/MemberFunctions";

Modal.setAppElement("#root");

// modal

export const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ModalView = styled.form.attrs((props) => ({
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 500px;
  height: 200px;
  margin-bottom: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div.desc {
    font-size: 16px;
    color: var(--black);
    margin: 50px;
    padding: 10px 0;
    pointer-events: none;
    transition: 0.5s;
    margin-bottom: 10px;
  }
  label {
    font-size: 16px;
    color: var(--black);
    padding: 10px;
    pointer-events: none;
    transition: 0.5s;
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

function MyModal(props) {
  const { isOpen, closeModal } = props;
  const { register, handleSubmit } = useForm();
  const userInfo = {
    name: "김길동",
    password: "zZ3@$!%*?&",
    phone: "010-111-2222",
    isSellerVerified: true,
    businessRegistrationNumber: "000-00-00000",
  };

  const handleChangeBusinessNumber = async (data) => {
    const { code, date } = data;

    const updatedInfo = {
      name: userInfo.name,
      password: userInfo.password,
      phone: userInfo.phone,
      isSellerVerified: true,
      businessRegistrationNumber: code,
    };

    const result = await handleUpdateMemberInfo(updatedInfo);

    if (result === false) {
      alert("갱신에 실패했습니다.");
    } else {
      alert("갱신이 성공했습니다!");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={ModalStyle}>
      <ModalBackdrop>
        <ModalView onSubmit={handleSubmit(handleChangeBusinessNumber)}>
          <Exitbtn onClick={closeModal}>&times;</Exitbtn>
          <div className="desc">
            <label>사업자번호와 등록날짜를 입력해주세요.</label>
          </div>
          <div className="input-container">
            <label>사업자 번호</label>
            <input
              type="text"
              name=""
              required="number"
              placeholder="000-000-000"
              {...register("code", { required: true })}
            />
          </div>
          <div className="input-container">
            <label>등록날짜</label>
            <input
              type="date"
              name=""
              required="date"
              placeholder="00-00-00"
              {...register("date", { required: true })}
            />
          </div>
          <div className="input-container">
            <button>제출하기</button>
          </div>
        </ModalView>
      </ModalBackdrop>
    </Modal>
  );
}

export default MyModal;
