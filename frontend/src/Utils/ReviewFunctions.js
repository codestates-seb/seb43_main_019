import axios from "axios";
import { BACK } from "../config";

// 리뷰를 작성하는 함수입니다.
// 리뷰(객체)를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handlePostReview = async (review) => {
  // 리뷰 점수 패턴이 존재합니다. (- 평점(score) 패턴 : `평점은 0.0 부터 5.0 까지 0.5점 단위의 값만 가능`)
  // 이는 처음 정보를 입력 받을 때, 처리해주시기 바랍니다.

  try {
    await axios.post(`${BACK}/api/reviews`, review);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 리뷰를 수정하는 함수입니다.
// 리뷰 아이디와 수정된 리뷰를 인자로 받습니다/
// 성공 시 수정된 리뷰를 반환합니다.
// 실패 시 null을 반환합니다.
export const handleUpdateReview = async (reviewId, updatedReview) => {
  try {
    const response = await axios.patch(
      `${BACK}/api/reviews/${reviewId}`,
      updatedReview
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

// 특정 리뷰를 조회하는 함수입니다.
// 리뷰 아이디를 인자로 받습니다.
// 성공 시 리뷰 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const getReview = async (reviewId) => {
  try {
    const response = await axios.get(`${BACK}/api/reviews/${reviewId}`);

    return response.data;
  } catch (error) {
    return null;
  }
};

// 모든 리뷰를 조회하는 함수입니다.
// 페이지와 사이즈를 인자로 받습니다.
// 성공 시 모든 리뷰가 담긴 배열을 반환합니다.
// 실패 시 null을 반환합니다.
export const getAllReview = async (page, size) => {
  try {
    const response = await axios.get(
      `${BACK}/api/reviews?page=${page}&size=${size}`
    );
    return response.data.data;
  } catch (error) {
    return null;
  }
};

// 특정 리뷰를 삭제하는 함수입니다.
// 리뷰 아이디를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleDeleteReview = async (reviewId, memberInfo) => {
  try {
    await axios.delete(`${BACK}/api/reviews/${reviewId}`, {
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
