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


export default function Header({ setSearchResults }) {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.modeReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleSignOut = async () => {
    try {
      const result = await axios.post("http://localhost:4000/user/logout");

      dispatch(handleLogout());

      if (Math.floor(result.status / 100) === 2) {
        alert("로그아웃에 상공했습니다.");
      }
    } catch (error) {
      const { status } = error.response;

      alert(`Error Status: ${status}`);

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
