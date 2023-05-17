import styled from "@emotion/styled";

const Input = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

// Modal에 있던 Input입니다.
export default function Input01({
  width = "200px",
  height = "50px",
  placeholder = "Input01",
}) {
  return <Input width={width} height={height} placeholder={placeholder} />;
}
