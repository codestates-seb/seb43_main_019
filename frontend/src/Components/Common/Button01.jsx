import styled from "@emotion/styled";

const Button = styled.button`
  overflow: hidden;
  border: 1px solid var(--black);
  color: var(--black-700);
  font-size: 13px;
  line-height: 13px;
  padding: 16px 16px 15px;
  text-decoration: none;
  cursor: pointer;
  background: var(--white-50);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Header에 있던 버튼입니다.
export default function Button01({
  width = "70px",
  height = "45px",
  text = "Button01",
}) {
  return (
    <Button width={width} height={height}>
      {text}
    </Button>
  );
}
