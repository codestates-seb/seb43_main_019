import React, { useEffect, useState } from "react";
import { getCampgroundInfo } from "../utils/ProductFunctions";
import styled from "@emotion/styled";

const { kakao } = window;

const MapContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 200px 200px 200px;
  @media (max-width: 1111px) {
    padding: 0px 100px 100px 100px;
  }

  @media (max-width: 400px) {
    display: none;
  }
`;

function Map({ productId }) {
  const [campgroundInfo, setCampgroundInfo] = useState(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(
    new kakao.maps.LatLng(33.450701, 126.570667)
  );
  const [mapSize, setMapSize] = useState({ width: 800, height: 650 });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newWidth = Math.max(Math.min(windowWidth, 1800), 320);
      const newHeight = Math.round((newWidth / 800) * 650); // 비율을 유지하여 높이 계산
      setMapSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로드 시 크기 설정

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCampgroundInfo = async () => {
      const data = await getCampgroundInfo(productId);
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

  return (
    <MapContainer>
      <div
        id="map"
        style={{ width: mapSize.width, height: mapSize.height }}
      ></div>
    </MapContainer>
  );
}

export default Map;
