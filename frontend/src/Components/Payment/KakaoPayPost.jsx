import React, { useState } from "react";
import KakaoPayButton from "./KakaoPayButton";
import axios from "axios";

const App = () => {
  const [inputData, setInputData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKakaoPay = () => {
    const paymentData = {};

    axios
      .post("/api/payments", paymentData)
      .then((response) => {
        alert("결제를 성공하였습니다.");
      })
      .catch((error) => {
        alert("결제에 실패하였습니다.");
      });
  };

  return (
    <div>
      <input
        type="text"
        name="amount"
        value={inputData.amount}
        onChange={handleInputChange}
        placeholder="결제 금액"
      />

      <KakaoPayButton onClick={handleKakaoPay} />
    </div>
  );
};

export default App;
