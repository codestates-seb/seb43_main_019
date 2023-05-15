import styled from "@emotion/styled";
import User from "./User";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function UserManagement() {
  return (
    <Container>
      <User />
      <User />
      <User />
      <User />
      <User />
    </Container>
  );
}
