import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mode } from "../Redux/Store/modeSlice";

const Container = styled.div`
  font-size: 35px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  position: fixed;
  bottom: 100px;
  left: 100px;
  background-color: ${(props) => (props.isDark ? "black" : "yellow")};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export default function ModeBtn() {
  const isDark = useSelector((state) => {
    return state.mode.isDark;
  });
  const dispatch = useDispatch();

  const handleModeChange = () => {
    dispatch(mode(!isDark));
  };

  return (
    <Container onClick={handleModeChange} isDark={isDark}>
      {isDark ? "🌞" : "🌙"}
    </Container>
  );
}
