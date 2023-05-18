import styled from "@emotion/styled";
import React, { useState } from "react";

const InputSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬을 위한 코드 */

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Input = styled.input`
  max-width: 600px;
  width: 500px;
  background-color: var(--white);
  color: var(--black);
  padding: 0.15rem 0.5rem;
  min-height: 40px;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;
  margin: 0 auto;
  /* 드롭다운 화살표를 추가 */
  /* background-image: url('https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-down-512.png');
  background-repeat: no-repeat;
  background-position: right 10px center; */

  &:focus {
    border-bottom: 2px solid var(--black);
    border-radius: 4px 4px 2px 2px;
    border-color: var(--black-700);
  }
  &:hover {
    outline: 1px solid lightgrey;
    border: 1px solid var(--black-700);
  }

  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white)"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black)")};
`;

export default function Searchbar({ setSearchResults, data }) {
  const [searchText, setSearchText] = useState("");

  console.log(data);

  const handleSearch = () => {
    const filteredData = data.filter((campground) => {
      return campground.productName
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    setSearchResults(filteredData);
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputSpace>
      <Input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        onSearch={handleSearch}
      />
    </InputSpace>
  );
}
