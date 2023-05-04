import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCampground,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Container = styled.header`
  width: 100%;

  @media screen and (min-width: 900px) {
    height: 140px;
  }

  @media screen and (max-width: 900px) {
    height: 100px;
  }
`;

const Top = styled.div`
  width: 100%;
  height: 60px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Bottom = styled.div`
  width: 100%;
  background-color: var(--white-100);

  position: relative;

  @media screen and (min-width: 900px) {
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
  }

  @media screen and (max-width: 900px) {
    height: 40px;
    display: flex;
    align-items: center;
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

  @media screen and (max-width: 900px) {
    font-size: 20px;
  }

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    display: ${[(props) => props.disappear && "none"]};

    position: absolute;
    right: 200px;
  }
`;

const Menu = styled.ul`
  @media screen and (min-width: 900px) {
    max-width: 500px;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
    display: ${(props) => props.pos === "bottom" && "none"};
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 350px;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    background-color: #def7ff;

    display: ${(props) => props.pos === "top" && "none"};
  }
`;

const Item = styled.li`
  &:hover {
    cursor: pointer;
  }

  @media screen and (min-width: 900px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 50px;
  }
`;

const SomeActionBtn = styled.div`
  width: 120px;
  height: 35px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: absolute;
  right: 100px;

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
  width: 80px;
  height: 30px;
  background-color: white;
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
  @media screen and (min-width: 900px) {
    display: none;
  }
`;

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const isDark = useSelector((state) => state.modeReducer);

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Top>
          <Logo src="/img/Logo_Light.png" />
          <SomeActionBtn>Some Action</SomeActionBtn>
        </Top>
        <Bottom>
          <InputSpace>
            {showInput ? (
              <>
                <Input />
                <CancelIcon
                  onClick={() => setShowInput((prev) => false)}
                  icon={faXmark}
                />
              </>
            ) : (
              <Icon
                icon={faMagnifyingGlass}
                disappear={false}
                onClick={() => setShowInput((prev) => true)}
              />
            )}
          </InputSpace>
          <Menu pos={"top"}>
            <Item>Home</Item>
            <Item>About</Item>
            <Item>Services</Item>
            <Item>Login</Item>
            <Item>Contact</Item>
          </Menu>
          <Icon icon={faCampground} disappear={true} />
          <MenuBtn onClick={() => handleMenu()}>Menu</MenuBtn>
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
      {showInput && <ShortPageInput />}
      {showMenu && (
        <Menu pos={"bottom"}>
          <Item>Home</Item>
          <Item>About</Item>
          <Item>Services</Item>
          <Item>Login</Item>
          <Item>Contact</Item>
        </Menu>
      )}
    </>
  );
}
