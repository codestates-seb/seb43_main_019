import styled from "@emotion/styled";

const Input = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  font-size: 13px;
  outline: 0;
  background: rgb(255, 255, 255);
  box-shadow: transparent 0px 0px 0px 1px inset;
  padding: 0.6em;
  border-radius: 14px;
  border: 1px solid #333;
  color: black;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

export default function Input03({
  width = "210px",
  height = "40px",
  placeholder = "Input03",
}) {
  return <Input width={width} height={height} placeholder={placeholder} />;
}
