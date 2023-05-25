import styled from "@emotion/styled";
import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const InputSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬을 위한 코드 */

  @media screen and (max-width: 868px) {
    margin-left: 200px;
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

export default function Searchbar({
  searchOption,
  setSearchOption,
  selectedTag,
  setSelectedTag,
}) {
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isDark = useSelector((state) => state.modeReducer);

  const handleKeywordSearch = () => {
    setSearchOption({ productName: searchText });
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

  const handleTagClick = (key, value, tagId) => {
    if (selectedTag !== tagId) {
      setSelectedTag((prev) => tagId);
      setSearchOption({ ...searchOption, [key]: value });
    }
  };

  return (
    <InputSpace>
      <InputWrapper
        onMouseEnter={() => handleDropdownToggle2(true)}
        onMouseLeave={() => handleDropdownToggle2(false)}
      >
        <Input
          type="text"
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
              <TagsContainer>
                <Text>원하는 검색어를 입력해보세요.💁🏻‍♀️</Text>
              </TagsContainer>
              <TagsContainer>
                <Tag
                  className={selectedTag === 0 ? "selected" : ""}
                  onClick={() => handleTagClick("productName", "서울시", 0)}
                >
                  <TagText># 서울시</TagText>
                </Tag>
                <Tag
                  className={selectedTag === 1 ? "selected" : ""}
                  onClick={() => handleTagClick("productName", "강원도", 1)}
                >
                  <TagText># 강원도</TagText>
                </Tag>
                <Tag
                  className={selectedTag === 2 ? "selected" : ""}
                  onClick={() => handleTagClick("capacity", [1, 2], 2)}
                >
                  <TagText># 1~2인</TagText>
                </Tag>
                <Tag
                  className={selectedTag === 3 ? "selected" : ""}
                  onClick={() =>
                    handleTagClick("productPrice", [10000, 100000], 3)
                  }
                >
                  <TagText># 10000원~100000원</TagText>
                </Tag>
              </TagsContainer>
            </div>
          </DropdownContent>
        )}
      </InputWrapper>
    </InputSpace>
  );
}
