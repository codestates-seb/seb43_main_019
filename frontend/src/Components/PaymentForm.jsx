import { useState } from "react";
import styled from "@emotion/styled";

const PayForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 300px;
  height: 2rem;
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 200px;
  height: 2.5rem;
  margin-top: 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  background-color: #3c1e70;
  cursor: pointer;
`;

function PaymentForm() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 폼 제출 시 처리할 코드 작성
  };

  return (
    <PayForm onSubmit={handleSubmit}>
      <Label htmlFor="itemName">상품명</Label>
      <Input
        type="text"
        id="itemName"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />

      <Label htmlFor="price">가격</Label>
      <Input
        type="text"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <Button type="submit">결제하기</Button>
    </PayForm>
  );
}

export default PaymentForm;
