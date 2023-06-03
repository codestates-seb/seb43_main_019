import styled from "@emotion/styled";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../Redux/Actions";
import { CommonButton } from "../Common/Button";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import { getAllCampgroundsInfo } from "../../utils/ProductFunctions";
import Spinner from "../Common/Spinner";
import ModeBtn from "./ModeBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.header`
  width: 100%;
  height: 160px;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
  position: fixed;
  top: 0;
  left: 0;
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
  @media screen and (max-width: 400px) {
    padding-top: 20px;
    padding-bottom: 40px;
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

export default function Header({
  searchCategory,
  setSearchCategory,
  keyword,
  setKeyword,
}) {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.ModeReducer);
  const userState = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(handleLogout());
      toast("로그아웃 되셨습니다.");
    } catch (error) {
      toast("로그아웃에 실패하셨습니다.");
      return;
    }
  };

  return (
    <>
      <Container isDark={isDark}>
        <Top isDark={isDark}>
          <Logo
            onClick={() => {
              setKeyword("");
              navigate("/");
            }}
            src={isDark ? "/img/Logo_Dark.png" : "/img/Logo_Light.png"}
          />
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
          <ModeBtn />
          <Searchbar
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </Bottom>
        <Line isDark={isDark} />
        <ToastContainer /> {/* 알림 메시지 컨테이너 */}
      </Container>
    </>
  );
}
