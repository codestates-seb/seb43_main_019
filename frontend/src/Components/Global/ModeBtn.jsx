import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { handleMode } from "../../Redux/Actions";

const Container = styled.div`
  font-size: 20px;
  width: 80px;
  height: 40px;
  border-radius: 50px;
  position: fixed;
  left: 50px;
  background-color: ${(props) =>
    props.isDark ? "var(--white)" : "var(--white)"};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border: ${(props) =>
    props.isDark ? "1px solid var(--white)" : "1px solid var(--black-500)"};
  &:hover {
    cursor: pointer;

    @media screen and (max-width: 400px) {
      width: 40px; /* Adjust the width to the desired value for mobile devices */
      height: 20px;
    }
  }
`;

const Icon = styled.span`
  transition: all 0.3s ease-in-out;
  transform: ${(props) =>
    props.isDark ? "translateX(-20px)" : "translateX(20px)"};
`;

export default function ModeBtn() {
  const isDark = useSelector((state) => state.ModeReducer);
  const dispatch = useDispatch();

  const handleModeChange = () => {
    dispatch(handleMode(!isDark));
  };

  return (
    <Container onClick={handleModeChange} isDark={isDark}>
      <Icon isDark={isDark}> {isDark ? "🌙" : "🌞"}</Icon>
    </Container>
  );
}
