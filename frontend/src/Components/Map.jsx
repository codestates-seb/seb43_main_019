/* global kakao */
import React, { useEffect } from "react";

const { kakao } = window;

function Map() {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    return () => {
      kakao.maps.event.removeListener(map, "click");
    };
  }, []);

  return <div id="map" style={{ width: "1000px", height: "800px" }}></div>;
}

export default Map;
