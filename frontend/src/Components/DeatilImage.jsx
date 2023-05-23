import React from "react";
import styled from "@emotion/styled";

const ImageWrapper = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
  width: 500px;
  height: 500px;
  border-radius: 30px;
  transition: width 0.5s, height 0.5s;

  @media (max-width: 400px) {
    width: 300px;
    height: auto;
    padding-bottom: 100%;
    max-width: 500px;
  }
`;

function DetailImage(props) {
  return <ImageWrapper src={props.src} />;
}

export default DetailImage;
