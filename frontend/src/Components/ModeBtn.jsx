import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { handleMode } from "../Redux/Actions";

const Container = styled.div`
  font-size: 20px;
  width: 100px;
  height: 50px;
  border-radius: 50px;
  position: fixed;
  bottom: 20px;
  left: 50px;
  background-color: ${(props) =>
    props.isDark ? "var(--black-700)" : "var(--white)"};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border: ${(props) =>
    props.isDark ? "1px solid var(--white)" : "1px solid var(--black)"};
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.span`
  transition: all 0.3s ease-in-out;
  transform: ${(props) =>
    props.isDark ? "translateX(-20px)" : "translateX(20px)"};
`;

export default function ModeBtn() {
  const isDark = useSelector((state) => state.modeReducer);
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
