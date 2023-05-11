import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  min-height: 70px;
  max-height: 70px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 6fr;
  align-items: center;
  padding: 0 10px;
  gap: 15px;
`;

const PersonIcon = styled.div`
  width: 35px;
  height: 35px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--black);
  background-color: var(--gray-200);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 100%;
`;

const Chat = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 12px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--white);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &::before {
    content: "";
    position: absolute;
    top: 19px;
    left: -12px;
    border-right: 12px solid var(--white);
    border-left: 0px solid transparent;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }
`;

export default function AgentChat({ chatContent }) {
  return (
    <Container>
      <PersonIcon>
        <FontAwesomeIcon icon={faUser} />
      </PersonIcon>
      <Chat>{chatContent}</Chat>
    </Container>
  );
}
