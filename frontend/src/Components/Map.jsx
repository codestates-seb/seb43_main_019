import React, { useEffect, useState } from "react";
import { getCampgroundInfo } from "../utils/ProductFunctions";

const { kakao } = window;

function Map({ productId }) {
  const [campgroundInfo, setCampgroundInfo] = useState(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(
    new kakao.maps.LatLng(33.450701, 126.570667)
  );

  useEffect(() => {
    const fetchCampgroundInfo = async () => {
      const data = await getCampgroundInfo(productId);
      console.log(data);
      setCampgroundInfo(data);
      if (data && data.latitude && data.longitude) {
        const { latitude, longitude } = data;
        setCenter(new kakao.maps.LatLng(latitude, longitude));
      }
    };
    fetchCampgroundInfo();
  }, [productId]);

  useEffect(() => {
    if (center) {
      const container = document.getElementById("map");
      const options = {
        center,
        level: 3,
      };
      const newMap = new kakao.maps.Map(container, options);
      setMap(newMap);

      return () => {
        kakao.maps.event.removeListener(newMap, "click");
      };
    }
  }, [center]);

  useEffect(() => {
    if (campgroundInfo && map) {
      const { latitude, longitude } = campgroundInfo;
      const markerPosition = new kakao.maps.LatLng(latitude, longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [campgroundInfo, map]);

  return <div id="map" style={{ width: "1000px", height: "800px" }}></div>;
}

export default Map;
