import styled from "@emotion/styled";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { handleLogout } from "../Redux/Actions";
import { CommonButton } from "../Components/Button";

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
  /* grid-template-columns: 1fr 1fr 1fr; */
  justify-items: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    height: 40px;
    display: flex;
  }
`;

const Line = styled.hr`
  width: 90%;
  margin: 0 auto;
  border: none;
  border-top: 1px solid ${(props) => (props.isDark ? "var(--white)" : "var(--black-500)")};
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

// const Icon = styled(FontAwesomeIcon)`
//   font-size: 30px;

//   &:hover {
//     cursor: pointer;
//   }

//   @media screen and (max-width: 900px) {
//     display: none;
//   }
// `;

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
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 100px;
  /* background-color: ${(props) =>
    props.isDark ? "var(--black-700)" : "var(--white-50)"}; */

  @media screen and (max-width: 900px) {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }
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
  justify-content: center; /* 중앙 정렬을 위한 코드 */

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Input = styled.input`
  max-width: 600px;
  width: 500px;
  background-color: var(--white-100);
  color: var(--black);
  padding: .15rem .5rem;
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
    border-color : var(--black-700);
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

// const CancelIcon = styled(FontAwesomeIcon)`
//   font-size: 30px;

//   @media screen and (max-width: 900px) {
//     position: absolute;
//     right: 180px;
//   }

//   &:hover {
//     cursor: pointer;
//   }
// `;

// const ShortPage = styled.div`
//   display: flex;
//   align-items: center;

//   @media screen and (min-width: 900px) {
//     display: none;
//   }
// `;

// const ShortPageIcon = styled(FontAwesomeIcon)`
//   position: absolute;
//   right: 180px;

//   &:hover {
//     cursor: pointer;
//   }
// `;

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
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const isDark = useSelector((state) => state.modeReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

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

  return (
    <>
      <Container isDark={isDark}>
        <Top isDark={isDark}>
          <Link to="/">
            <Logo src={isDark ? "/img/Logo_Dark.png" : "/img/Logo_Light.png"} />
            <Logo src="/img/Camp.png" />
          </Link>
          {userState.login === false? (
          <UserStatus>
            <Link to="/login">
            <CommonButton> Login </CommonButton>
            </Link>
            <Link to="/SignUp">
            <CommonButton> SignUp </CommonButton>
            </Link>
            </UserStatus>
            ) : (        
              <UserStatus  >
              <CommonButton
                onClick={() => {
                handleSignOut();
                navigate("/");
                }}>
                   Logout
              </CommonButton>
              <Link to="/Mypage">
              <CommonButton> Mypage </CommonButton>
              </Link>
              </UserStatus>        
            )}
        </Top>
        <Bottom isDark={isDark}>

          <InputSpace>
              <Input placeholder="Search..." />
              </InputSpace>

          {/* {userState.login ? (
            <Menu pos={"top"}>
              <Link to="/">
                <Item isDark={isDark}>Home</Item>
              </Link>
              <Item
                onClick={() => {
                  handleSignOut();
                  navigate("/");
                }}
                isDark={isDark}
              >
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
          </MenuBtn> */}
          {/* <ShortPage>
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
          </ShortPage> */}
        </Bottom>
        <Line isDark={isDark} />
      </Container>
      {/* {showInput && <ShortPageInput isDark={isDark} />}
      {showMenu &&
        (userState.login ? (
          <Menu isDark={isDark} pos={"bottom"}>
            <Link to="/">
              <Item isDark={isDark}>Home</Item>
            </Link>
            <Item isDark={isDark}>Log Out</Item>
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
        ))} */}
    </>
  );
}
