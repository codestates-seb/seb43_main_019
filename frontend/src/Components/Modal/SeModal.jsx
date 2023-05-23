import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  handleUpdateMemberInfo,
  registerSellerAccount,
  updateSellerAccount,
} from "../../utils/MemberFunctions";
import { validBusinessDate, validBusinessNumber } from "../../utils/functions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

const Label = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  & label {
    font-size: 13px;
  }
`;

const Button = styled.button`
  margin: 0 auto;
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
  const [isUpdate, setIsUpdate] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);

  const handleChangeBusinessNumber = async (data) => {
    const { code, date } = data;

    if (validBusinessNumber(code) === false) {
      alert("사업자 등록 번호의 패턴이 유효하지 않습니다.");
      return;
    }

    if (validBusinessDate(date) === false) {
      alert("사업자 등록 일자의 패턴이 유효하지 않습니다.");
      return;
    }

    const registratonInfo = {
      businessRegistrationNumber: code,
      businessRegistrationDate: date,
    };

    if (isUpdate) {
      // 만약 판매자 계정이 아니라면 수정 자체를 못하게

      const result = await updateSellerAccount(
        userState.userInfo,
        registratonInfo
      );

      console.log(result);

      if (result) {
        alert("판매자 등록에 성공했습니다!");
        navigate("/mypage");
      } else {
        alert("판매자 등록에 실패했습니다!");
      }
    } else {
      const result = await registerSellerAccount(
        userState.userInfo,
        registratonInfo
      );

      console.log(result);

      if (result) {
        alert("판매자 등록에 성공했습니다!");
        navigate("/mypage");
      } else {
        alert("판매자 등록에 실패했습니다!");
      }
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
            <Label>
              <label>사업자 번호</label>
            </Label>
            <input
              type="text"
              name=""
              required="number"
              placeholder="000-00-00000"
              {...register("code", { required: true })}
            />
          </div>
          <div className="input-container">
            <Label>
              <label>등록날짜</label>
            </Label>
            <input
              type="text"
              name=""
              required="date"
              placeholder="0000-00-00"
              {...register("date", { required: true })}
            />
          </div>
          <div className="input-container">
            <Button onClick={() => setIsUpdate(false)}>제출하기</Button>
            <Button onClick={() => setIsUpdate(true)}>수정하기</Button>
          </div>
        </ModalView>
      </ModalBackdrop>
    </Modal>
  );
}

export default MyModal;
