import React from "react";
import styled from "@emotion/styled";

const ImageWrapper = styled.div`
  background-image: url(https://yeyak.seoul.go.kr/cmsdata/web_upload/svc/20230329/1680050914280HZAYFX8GLLMTVZI2H6BD0WGPV_IM02.jpg);
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
