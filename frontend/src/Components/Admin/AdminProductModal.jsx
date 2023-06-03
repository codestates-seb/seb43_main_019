import styled from "@emotion/styled";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  handleDeleteCampground,
  handleUpdateCampground,
} from "../../utilss/ProductFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getMemberInfo, validUser } from "../../utilss/MemberFunctions";
import { toast } from "react-toastify";
import { handleLogout } from "../../Redux/Actions";

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

const ImageInput = styled.input`
  position: absolute;
  bottom: 10px;
  left: 80px;
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

export default function AdminProductModal(props) {
  const { isOpen, closeModal, campground } = props;
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(campground.imageUrl);
  const navigate = useNavigate();

  const userState = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const handleProductUpdate = async (data) => {
    const myInfo = await getMemberInfo(userState.userInfo);

    if (myInfo === null) {
      toast("토큰이 만료되었습니다.");
      dispatch(handleLogout());
      navigate("/login");
    }

    const success = await handleDeleteCampground(
      campground.productId,
      userState.userInfo
    );

    if (success === true) {
      toast("삭제가 완료되었습니다.");
      closeModal();
      window.location.reload();
    } else {
      toast("삭제를 실패했습니다.");
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} style={ModalStyle}>
      <Wrapper>
        <CloseBtn onClick={closeModal} />
        <Infos>
          <Img bgphoto={imageUrl} />
          <Managements onSubmit={handleSubmit(handleProductUpdate)}>
            <InputLine>
              <Label>
                <label htmlFor="productName">캠핑장 이름</label>
              </Label>
              <Input
                id="productName"
                defaultValue={campground.productName}
                {...register("productName", { required: true })}
              />
            </InputLine>
            <InputLine>
              <Label>
                <label htmlFor="capacity">캠핑장 수용인원</label>
              </Label>
              <Input
                id="capacity"
                defaultValue={campground.capacity}
                {...register("capacity", { required: true })}
              />
            </InputLine>
            <InputLine>
              <Label>
                <label htmlFor="productPrice">캠핑장 가격</label>
              </Label>
              <Input
                id="productPrice"
                defaultValue={campground.productPrice}
                {...register("productPrice", { required: true })}
              />
            </InputLine>
            <Btns>
              <Btn>삭제</Btn>
            </Btns>
          </Managements>
        </Infos>
      </Wrapper>
    </Modal>
  );
}
