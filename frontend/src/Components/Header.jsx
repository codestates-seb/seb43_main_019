import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCampground,
  faMagnifyingGlass,
  faXmark,
  faUser,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Container = styled.header`
  width: 100%;
  height: 140px;
  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};

  @media screen and (max-width: 900px) {
    height: 100px;
  }
`;

const Top = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${(props) =>
    props.isDark ? "var(--black-500)" : "var(--white-50)"};
  transition: all 0.5s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Bottom = styled.div`
  width: 100%;
  background-color: ${(props) =>
    props.isDark ? "var(--black-600)" : "var(--white-100)"};
  transition: all 0.5s linear;
  position: relative;
  height: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    height: 40px;
    display: flex;
  }
`;

const Logo = styled.img`
  height: 50px;
  width: auto;

  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 30px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Menu = styled.ul`
  @media screen and (min-width: 900px) {
    max-width: 500px;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    display: ${(props) => props.pos === "bottom" && "none"};
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 210px;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    background-color: ${(props) =>
      props.isDark ? "var(--black-600)" : "var(--white-50)"};
    display: ${(props) => props.pos === "top" && "none"};
  }
`;

const Item = styled.li`
  &:hover {
    cursor: pointer;
  }

  color: ${(props) => (props.isDark ? "var( --white)" : "var(--black)")};
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;

  @media screen and (min-width: 900px) {
    height: 100%;
    justify-content: center;
  }

  @media screen and (max-width: 900px) {
    height: 70px;
    justify-content: start;
    padding-left: 50px;
  }
`;

const UserStatus = styled.div`
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: absolute;
  right: 100px;
  background-color: ${(props) =>
    props.isDark ? "var(--black-700)" : "var(--white-100)"};
  border: 0.5px solid black;

  @media screen and (max-width: 900px) {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

const UserStatusIcon = styled(FontAwesomeIcon)`
  transition: all 0.3s ease-in-out;
  transform: ${(props) =>
    props.isLogin ? "translateX(20px)" : "translateX(-20px)"};
`;

const MenuBtn = styled.div`
  position: absolute;
  right: 50px;
  width: 60px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDark ? "var(--black-600)" : "var(--white-50)"};
  box-shadow: ${(props) =>
      props.isDark ? "var(--black-600)" : "var(--white-50)"}
    0px 3px 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 900px) {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

const InputSpace = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  margin-right: 10px;
  padding-left: 10px;
  border-radius: 10px;

  border: none;
  outline: none;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3);
  transition: 300ms ease-in-out;

  &:focus {
    transform: scale(1.05);
    box-shadow: 13px 13px 100px #969696, -13px -13px 100px #ffffff;
  }

  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black")};
`;

const CancelIcon = styled(FontAwesomeIcon)`
  font-size: 30px;

  @media screen and (max-width: 900px) {
    position: absolute;
    right: 180px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ShortPage = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: 900px) {
    display: none;
  }
`;

const ShortPageIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 180px;

  &:hover {
    cursor: pointer;
  }
`;

const ShortPageInput = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 20px;

  outline: none;
  background: #e8e8e8;
  box-shadow: 5px 5px 17px #c8c8c8, -5px -5px 17px #ffffff;
  border: none;
  border-radius: 10px;
  transition: all 0.5s;

  &:focus {
    box-shadow: inset 5px 5px 17px #c8c8c8, inset -5px -5px 17px #ffffff;
  }

  @media screen and (min-width: 900px) {
    display: none;
  }

  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black")};
`;

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const isDark = useSelector((state) => state.modeReducer);

  // 임시
  const [isLogin, setIsLogin] = useState(false);

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <Container isLogin={isLogin} isDark={isDark}>
        <Top isDark={isDark}>
          <Logo src={isDark ? "/img/Logo_Dark.png" : "/img/Logo_Light.png"} />
          <UserStatus
            onClick={() => setIsLogin((prev) => !prev)}
            isDark={isDark}
          >
            <UserStatusIcon
              icon={isLogin ? faUser : faPersonRays}
              isLogin={isLogin}
            />
          </UserStatus>
        </Top>
        <Bottom isDark={isDark}>
          <InputSpace>
            {showInput ? (
              <>
                <Input isDark={isDark} />
                <CancelIcon
                  onClick={() => setShowInput((prev) => false)}
                  icon={faXmark}
                />
              </>
            ) : (
              <Icon
                icon={faMagnifyingGlass}
                onClick={() => setShowInput((prev) => true)}
              />
            )}
          </InputSpace>
          {isLogin ? (
            <Menu pos={"top"}>
              <Link to="/">
                <Item isDark={isDark}>Home</Item>
              </Link>
              <Item isDark={isDark} onClick={() => setIsLogin((prev) => false)}>
                Log Out
              </Item>
              <Link to="/mypage">
                <Item isDark={isDark}>My Page</Item>
              </Link>
            </Menu>
          ) : (
            <Menu pos={"top"}>
              <Link to="/">
                <Item isDark={isDark}>Home</Item>
              </Link>
              <Link to="/login">
                <Item isDark={isDark}>Log In</Item>
              </Link>
              <Link to="signup">
                <Item isDark={isDark}>Sign Up</Item>
              </Link>
            </Menu>
          )}
          <Icon icon={faCampground} />
          <MenuBtn isDark={isDark} onClick={() => handleMenu()}>
            Menu
          </MenuBtn>
          <ShortPage>
            {showInput ? (
              <CancelIcon
                icon={faXmark}
                onClick={() => setShowInput((prev) => false)}
              />
            ) : (
              <ShortPageIcon
                icon={faMagnifyingGlass}
                onClick={() => setShowInput((prev) => true)}
              />
            )}
          </ShortPage>
        </Bottom>
      </Container>
      {showInput && <ShortPageInput isDark={isDark} />}
      {showMenu &&
        (isLogin ? (
          <Menu isDark={isDark} pos={"bottom"}>
            <Link to="/">
              <Item isDark={isDark}>Home</Item>
            </Link>
            <Item isDark={isDark} onClick={() => setIsLogin((prev) => false)}>
              Log Out
            </Item>
            <Link to="/mypage">
              <Item isDark={isDark}>My Page</Item>
            </Link>
          </Menu>
        ) : (
          <Menu isDark={isDark} pos={"bottom"}>
            <Link to="/">
              <Item isDark={isDark}>Home</Item>
            </Link>
            <Link to="/login">
              <Item isDark={isDark}>Log In</Item>
            </Link>
            <Link to="signup">
              <Item isDark={isDark}>Sign Up</Item>
            </Link>
          </Menu>
        ))}
    </>
  );
}
