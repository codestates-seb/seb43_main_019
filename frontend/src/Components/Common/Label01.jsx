import styled from "@emotion/styled";

const Label = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  justify-content: start;
  align-items: center;
`;

export default function Label01({
  width = "120px",
  height = "50px",
  text = "Label01",
  htmlFor = "",
}) {
  return (
    <Label width={width} height={height}>
      <label htmlFor={htmlFor}>{text}</label>
    </Label>
  );
}
