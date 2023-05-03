import styled from "styled-components";

const Container = styled.header`
  width: 100%;
  height: 120px;
  position: fixed;
  background-color: var(--emerald-700);
`;

export default function Header() {
  return <Container></Container>;
}
