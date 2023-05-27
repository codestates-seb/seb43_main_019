import styled from "@emotion/styled";
import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategory } from "../utils/functions";
import { useEffect } from "react";

const InputSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬을 위한 코드 */

  @media screen and (max-width: 868px) {
    margin-left: 200px;
  }
  @media screen and (max-width: 400px) {
    margin-left: 0px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
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

  &:focus {
    border-bottom: 2px solid var(--black);
    border-radius: 4px 4px 2px 2px;
    border-color: var(--black-700);
  }
  &:hover {
    outline: 1px solid lightgrey;
    border: 1px solid var(--black-700);
  }

  background-color: var(--white);
  color: var(--black);

  @media screen and (max-width: 768px) {
    width: 300px;
  }
  @media screen and (max-width: 400px) {
    width: 200px;
    margin-left: 170px;
  }
`;

const DropdownButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  border: none;
  background-color: var(--white);
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  box-shadow: 0px 10px 20px -18px;
  padding: 8px;
  display: flex;
  flex-wrap: nowrap;
`;

const TagsContainer = styled.div`
  display: flex;
`;

const Tag = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 6px;
  clip-path: polygon(20px 0px, 100% 0px, 100% 100%, 0% 100%, 0% 20px);
  background: var(--gray-200);
  padding: 11px 24px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 12px;
  color: var(--black);
  transition: clip-path 500ms;

  &.selected {
    clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0% 100%, 0% 0px);
  }

  &.selected:after {
    transform: translate(-100%, -100%);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: var(--gray-200);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 6px 0;
    transition: transform 500ms;
  }

  &:hover {
    clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0% 100%, 0% 0px);
  }

  &:hover:after {
    transform: translate(-100%, -100%);
  }
`;

const TagText = styled.span`
  margin-right: 4px;
`;

const Text = styled.p`
  margin: 10px;
  font-size: 15px;
`;

const Category = styled.span`
  position: absolute;
  left: -40px;
  top: 10px;
`;

export default function Searchbar({
  searchCategory,
  setSearchCategory,
  keyword,
  setKeyword,
}) {
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isDark = useSelector((state) => state.modeReducer);
  const location = useLocation();

  const navigate = useNavigate();

  const handleKeywordSearch = async () => {
    await setKeyword(searchText);

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleKeywordSearch();
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownToggle2 = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  const handleTagClick = (category) => {
    setSearchCategory(category);
  };

  useEffect(() => {
    setSearchText("");
  }, [searchCategory]);

  return (
    <InputSpace>
      <InputWrapper
        onMouseEnter={() => handleDropdownToggle2(true)}
        onMouseLeave={() => handleDropdownToggle2(false)}
      >
        <Category>{getCategory(searchCategory)}</Category>
        <Input
          type={
            searchCategory === "productName" || searchCategory === "location"
              ? "text"
              : "number"
          }
          value={searchText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search..."
        />
        <DropdownButton onClick={handleDropdownToggle}>
          <FaSortDown size={15} />
        </DropdownButton>
        {isDropdownOpen && (
          <DropdownContent>
            <div>
              <TagsContainer style={{ flexDirection: "column" }}>
                <Text>원하는 검색어를 상단에 입력해보세요. 💁🏻‍♀️</Text>
                <Text>하단의 태그를 선택하면 태그별 검색도 가능합니다.</Text>
              </TagsContainer>
              <TagsContainer>
                <Tag
                  className={
                    searchCategory === "productName" ? "productName" : ""
                  }
                  onClick={() => handleTagClick("productName")}
                >
                  <TagText># 이름</TagText>
                </Tag>
                <Tag
                  className={searchCategory === "location" ? "selected" : ""}
                  onClick={() => handleTagClick("location")}
                >
                  <TagText># 위치</TagText>
                </Tag>
                <Tag
                  className={searchCategory === "capacity" ? "selected" : ""}
                  onClick={() => handleTagClick("capacity")}
                >
                  <TagText># 인원수</TagText>
                </Tag>
                <Tag
                  className={
                    searchCategory === "productPrice" ? "selected" : ""
                  }
                  onClick={() => handleTagClick("productPrice")}
                >
                  <TagText># 가격</TagText>
                </Tag>
              </TagsContainer>
            </div>
          </DropdownContent>
        )}
      </InputWrapper>
    </InputSpace>
  );
}
