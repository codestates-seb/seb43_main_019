import styled from "@emotion/styled";

const Button = styled.button`
  border-radius: 25px;
  color: var(--white);
  border: none;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: bold;
  border: 0;
  padding: 0.68em;
  border-radius: 14px;
  font-weight: bold;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor};
`;

// Login에 있던 버튼입니다.
export default function Button02({
  width = "210px",
  height = "40px",
  bgColor = "var(--black)",
  text = "Button02",
}) {
  return (
    <Button width={width} height={height} bgColor={bgColor}>
      {text}
    </Button>
  );
}
