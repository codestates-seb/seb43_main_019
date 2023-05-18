import styled from "@emotion/styled";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../Redux/Actions";
import { CommonButton } from "./Common/Button";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import { getAllCampgroundsInfo } from "../utils/ProductFunctions";

const Container = styled.header`
  width: 100%;
  height: 160px;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
  position: fixed;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 900px) {
    height: 100px;
  }
`;

const Top = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${(props) =>
    props.isDark ? "var(--black-700)" : "var(--white-50)"};
  transition: all 0.5s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Bottom = styled.div`
  width: 100%;
  background-color: ${(props) =>
    props.isDark ? "var(--black-700)" : "var(--white-50)"};
  transition: all 0.5s linear;
  position: relative;
  height: 80px;
  display: grid;
  justify-items: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    height: 40px;
    display: flex;
  }
`;

const Line = styled.hr`
  width: 100%;
  margin: 0 auto;
  border: none;
  border-top: 1px solid
    ${(props) => (props.isDark ? "var(--white)" : "var(--black-500)")};
  margin-bottom: 0px;
  margin-top: 0px;
`;

const Logo = styled.img`
  height: 35px;
  width: auto;

  &:hover {
    cursor: pointer;
  }
`;

const UserStatus = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 100px;

  @media screen and (max-width: 900px) {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

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
  // 드롭다운 화살표를 추가
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
    props.isDark ? "var(--black)" : "var(--white"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black")};
`;

// const Dropdown = styled.select`
//   max-width: 600px;
//   width: 500px;
//   background-color: var(--white-100);
//   color: var(--black);
//   padding: .15rem .5rem;
//   min-height: 40px;
//   border-radius: 4px;
//   outline: none;
//   border: none;
//   line-height: 1.15;
//   box-shadow: 0px 10px 20px -18px;
//   margin: 0 auto; // 가운데 정렬

//   // select 요소에서는 focus와 hover 스타일을 다음과 같이 정의합니다.
//   &:focus,
//   &:hover {
//     border-bottom: 2px solid var(--black);
//     border-radius: 4px 4px 2px 2px;
//     border-color : var(--black-700);
//     outline: none;
//   }
// `;

export default function Header() {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.modeReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleSignOut = async () => {
    try {
      dispatch(handleLogout());
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
      return;
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      // setData((prev) => [...dummyCampgrounds.data]);

      // 실제 데이터 받아오는 과정
      const initData = await getAllCampgroundsInfo(1, 10);
      setData((prev) => [...initData]);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <>
      <Container isDark={isDark}>
        <Top isDark={isDark}>
          <Link to="/">
            <Logo src={isDark ? "/img/Logo_Dark.png" : "/img/Logo_Light.png"} />
            <Logo src="/img/Camp.png" />
          </Link>
          {userState.login === false ? (
            <UserStatus>
              <Link to="/login">
                <CommonButton> Login</CommonButton>
              </Link>
              <Link to="/SignUp">
                <CommonButton> SignUp </CommonButton>
              </Link>
            </UserStatus>
          ) : (
            <UserStatus>
              <CommonButton
                onClick={() => {
                  handleSignOut();
                  navigate("/");
                }}
              >
                Logout
              </CommonButton>
              <Link to="/Mypage">
                <CommonButton> Mypage </CommonButton>
              </Link>
            </UserStatus>
          )}
        </Top>
        <Bottom isDark={isDark}>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <Searchbar setSearchResults={setSearchResults} data={data} />
          )}
        </Bottom>
        <Line isDark={isDark} />
      </Container>
    </>
  );
}
