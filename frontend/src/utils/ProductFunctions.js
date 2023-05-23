import axios from "axios";
import { BACK } from "../config";

// 캠핑장 정보를 등록하는 함수입니다.
// 캠프장 정보와 멤버 정보를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handlePostCampground = async (campground, memberInfo) => {
  try {
    // body에 필요한 것
    // images라는 이름의 FormData // key: images, value: 실제 이미지
    // jsonData라는 이름의 FormData // key: 나머지 원래 있어야 하는 키들, value: 나머지 원래 있어야 하는 값들

    console.log(campground.images.get("images"));
    console.log(campground.jsonData.get("jsonData"));
    console.log(memberInfo);

    await axios.post(`${BACK}/api/products`, campground, {
      headers: {
        Authorization: memberInfo.accessToken,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 캠핑장 정보를 수정하는 함수입니다.
// 수정된 정보를 인자로 받습니다.
// 성공 시 업데이트된 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const handleUpdateCampground = async (productId, updatedInfo) => {
  try {
    const response = await axios.post(
      `${BACK}/api/products/${productId}`,
      updatedInfo
    );
    const { data } = response;

    return data;
  } catch (error) {
    return false;
  }
};

// 특정 캠핑장 정보를 조회하는 함수입니다.
// 캠핑장 id를 인자로 받습니다.
// 성공 시 캠핑장 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const getCampgroundInfo = async (productId) => {
  try {
    const response = await axios.get(`${BACK}/api/products/${productId}`);
    const { data } = response;
    return data;
  } catch (error) {
    return false;
  }
};

// 모든 캠핑장 정보를 조회하는 함수입니다.
// 페이지 번호와 사이즈를 인자로 받습니다.
// 성공 시 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const getAllCampgroundsInfo = async (page, size) => {
  try {
    const response = await axios.get(
      `${BACK}/api/products?page=${page}&size=${size}`
    );

    const infos = response.data.data;

    return infos;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 캠핑장 정보를 삭제하는 함수입니다.
// 캠핑장 아이디를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleDeleteCampground = async (productId) => {
  try {
    await axios.delete(`${BACK}/api/products/${productId}`);

    return true;
  } catch (error) {
    return false;
  }
};

// 카카오페이 post
export const postPaymentData = async (data) => {
  try {
    const response = await axios.post(`${BACK}/api/payment`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 새로운 예약 등록
export const postReservationsData = async (data, memberInfo) => {
  try {
    console.log("Post Reservation Data");
    console.log(data);
    console.log(memberInfo);

    const response = await axios.post(`${BACK}/api/reservations`, data, {
      headers: {
        Authorization: memberInfo.accessToken,
      },
    });
    console.log(response.data);
    const { reservation_id } = response.data;
    return reservation_id;
  } catch (error) {
    console.error(error);
  }
};
