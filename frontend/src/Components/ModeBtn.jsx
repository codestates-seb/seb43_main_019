import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { handleMode } from "../Redux/Actions";

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
  const isDark = useSelector((state) => state.modeReducer);
  const dispatch = useDispatch();

  const handleModeChange = () => {
    dispatch(handleMode(!isDark));
  };

  return (
    <Container onClick={handleModeChange} isDark={isDark}>
      {isDark ? "🌞" : "🌙"}
    </Container>
  );
}
