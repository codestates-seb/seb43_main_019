import styled from "@emotion/styled";

const Input = styled.input`
  max-width: ${(props) => props.maxWidth};
  width: ${(props) => props.width};
  background-color: var(--white);
  color: var(--black);
  padding: 0.15rem 0.5rem;
  min-height: ${(props) => props.minHeight};
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;
  margin: 0 auto;

  &:focus {
    border-bottom: 2px solid var(--black);
    border-radius: 4px 4px 2px 2px;
    border-color: var(--black-700);
  }
  &:hover {
    outline: 1px solid lightgrey;
    border: 1px solid var(--black-700);
  }

  background-color: ${(props) =>
    props.isDark ? "var(--black)" : "var(--white"};
  color: ${(props) => (props.isDark ? "var(--white)" : "var(--black")};
`;

// Modal에 있던 Input입니다.
export default function Input02({
  width = "500px",
  maxWidth = "600px",
  minHeight = "40px",
  height = "40px",
  placeholder = "Input02",
}) {
  return (
    <Input
      width={width}
      maxWidth={maxWidth}
      minHeight={minHeight}
      placeholder={placeholder}
    />
  );
}
