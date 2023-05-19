import React from "react";
import styled from "@emotion/styled";

const ImageWrapper = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
  width: 500px;
  height: 500px;
  border-radius: 30px;
`;

function DetailImage(props) {
  return <ImageWrapper src={props.src} />;
}

export default DetailImage;
