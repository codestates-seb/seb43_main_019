import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 180px;
  height: 48px;
  font-size: 16px;
  padding: 15px 20px;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px rgba(255, 90, 95, 0.4);
    border-color: #ff5a5f;
  }

  &::placeholder {
    color: #999;
  }
`;

const CustomDatePicker = styled(DatePicker)`
  .react-datepicker {
    background-color: #000 !important;
  }
`;

function App() {
  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowDatePicker(false);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="날짜를 선택하세요"
        onClick={handleInputClick}
        value={startDate ? startDate.toLocaleDateString() : ""}
        readOnly
      />
      {showDatePicker && (
        <CustomDatePicker
          selected={startDate}
          onChange={handleDateChange}
          minDate={new Date()}
          inline
        />
      )}
    </Container>
  );
}
export default App;
