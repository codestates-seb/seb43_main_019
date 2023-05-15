import axios from "axios";
import { REST_API_KEY, REDIRECT_URI } from "../secret";

const BACK = "ec2-3-34-91-147.ap-northeast-2.compute.amazonaws.com";
const LOCAL = "http://localhost:4000";

let isLocal = true;

export const handleStartLogin = async (data) => {
  try {
    if (isLocal) {
      const { id, password } = data;
      const loginInfo = { userId: id, password };

      const result = await axios.post(`${LOCAL}/user/login`, { loginInfo });

      const userInfo = result.data;

      return userInfo;
    } else {
      // 백엔드에게서 result를 받아온다.
      const result =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImVtYWlsIjoidGVzdDJAZW1haWwuY29tIiwic3ViIjoidGVzdDJAZW1haWwuY29tIiwiaWF0IjoxNjg0MTE0MzM4LCJleHAiOjE2ODQxMTYxMzh9.g-v7ScuoVlEFp43WbuWm-WN_NHZIaFVFjjyMML5scuY";
      const validToken = result.slice(7);

      const decoded = JSON.parse(atob(validToken.split(".")[1]));

      return decoded;
    }
  } catch (error) {
    return null;
  }
};

export const handleKakaoLogin = async (KAKAO_CODE) => {
  try {
    if (isLocal) {
      /*
      // 1. 백엔드에서 다 해주는 경우
      const result = await axios.post("http://localhost:4000/user/kakaologin", {
        KAKAO_CODE,
      });
      const userInfo = result.data;
      return userInfo;
      // =====
      */

      // 2. 여기서 카카오 유저 정보 받아오는 거까지 하는 경우
      const result = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
      });

      const data = await result.json();

      console.log("=== Data!!! ===");
      console.log(data);
      console.log("===============");

      const { access_token } = data;

      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      console.log("=== headers!!! ===");
      console.log(headers);
      console.log("===============");

      // 여기서 CORS 에러 => 백엔드에서

      const userResponse = await axios.get(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers,
        }
      );

      console.log("=== userResponse!!! ===");
      console.log(userResponse);
      console.log("===============");

      const kakaoUserData = userResponse.data;

      /*
      // kakao usre data
      {
        id: 2782028774,
        connected_at: '2023-05-09T06:34:49Z',
        properties: {
          nickname: '사람이름',
          profile_image: 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
          thumbnail_image: 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg'
        },
        kakao_account: {
          profile_nickname_needs_agreement: false,
          profile_image_needs_agreement: false,
          profile: {
            nickname: '사람이름',
            thumbnail_image_url: 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
            profile_image_url: 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
            is_default_image: true
          },
          has_email: true,
          email_needs_agreement: false,
          is_email_valid: true,
          is_email_verified: true,
          email: 'testmail@naver.com',
          has_age_range: true,
          age_range_needs_agreement: false,
          age_range: '20~29',
          has_birthday: true,
          birthday_needs_agreement: false,
          birthday: '0101',
          birthday_type: 'SOLAR'
        }
      }
      */

      // 이제 이 데이터를 보내기만 하면 된다.

      return kakaoUserData;

      // =====
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// 이하 메모들
/*
token: response.headers.authorization,
refresh: response.headers.refresh,

export const getMemberId = () => {
  const authorization = getCookie("token").slice(7);

  const decoded = buffer.from(authorization, "base64").toString("utf-8");

  const memberId = Number(
    decoded.slice(decoded.indexOf("memberId") + 10, decoded.indexOf("sub") - 2)
  );

  return memberId;
};

*/
