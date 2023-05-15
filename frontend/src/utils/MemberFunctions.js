import axios from "axios";
import { REST_API_KEY, REDIRECT_URI } from "../secret";

const BACK = "ec2-3-34-91-147.ap-northeast-2.compute.amazonaws.com";
const LOCAL = "http://localhost:4000";

let isLocal = true;

// 비밀번호가 유효한지 판별하는 함수입니다.
// 비밀번호를 인자로 받습니다.
// 유효하다면 true를 반환합니다.
// 유효하지 않다면 false를 반환합니다.
export const checkValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return regex.test(password);
};

// 전화번호가 유효한지 판별하는 함수입니다.
// 전화번호를 인자로 받습니다.
// 유효하다면 true를 반환합니다.
// 유효하지 않다면 false를 반환합니다.
export const checkValidPhone = (phone) => {
  const phonePattern = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/;

  return phonePattern.test(phone);
};

// 로그인을 위한 함수입니다.
// 이메일, 비밀번호로 구성된 객체를 인자로 받습니다.
// 로그인 성공 시 유저 정보를 반환합니다.
// 로그인 실패 시 null을 반환합니다.
export const handleStartLogin = async (data) => {
  const { email, password } = data;
  const loginInfo = { email, password };

  try {
    if (isLocal) {
      const result = await axios.post(`${LOCAL}/user/login`, loginInfo);

      const userInfo = result.data;

      return userInfo;
    } else {
      // 백엔드에게서 result를 받아온다.
      const result = await axios.post(`${BACK}/api/login`, loginInfo);

      const authToken = result.Authorization;
      const refreshToken = result.Refresh;

      const validToken = authToken.slice(7);

      const decoded = JSON.parse(atob(validToken.split(".")[1]));

      return decoded;
    }
  } catch (error) {
    return null;
  }
};

// 이메일 인증 코드를 받아오는 함수입니다.
// 이메일을 인자로 받습니다.
// 성공 시 인증 코드를 반환합니다.
// 실패 시 null을 반환합니다.
export const getEmailCode = async (email) => {
  try {
    const result = await axios.get(
      `${BACK}/api/members/email-verify?email=${email}`
    );

    const code = result.data;
    return code;
  } catch (error) {
    return null;
  }
};

// 회원가입을 하는 함수입니다.
// 회원가입에 필요한 정보들을 인자로 받습니다.
// 성공 시 treu를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleJoin = async (joinInfo) => {
  try {
    if (isLocal) {
      await axios.post(`${LOCAL}/user/join`, { joinInfo });
      return true;
    } else {
      await axios.post(`${BACK}/api/members`, joinInfo);
    }
  } catch (error) {
    return false;
  }
};

// 특정 멤버 정보를 업데이트 하는 함수입니다.
// 업데이트된 정보를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleUpdateMemberInfo = async (updatedInfo) => {
  try {
    await axios.patch(`${BACK}/api/members/1`, updatedInfo);
    return true;
  } catch (error) {
    return false;
  }
};

// 특정 멤버의 정보를 조회하는 함수입니다.
// 유저 id를 인자로 받습니다.
// 성공 시 user의 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const getMemberInfo = async (memberId) => {
  try {
    const userInfo = await axios.get(`${BACK}/api/members/${memberId}`);

    return userInfo;
  } catch (error) {
    return null;
  }
};

// 모든 멤버의 정보를 받아오는 함수입니다.
// 성공 시 모든 유저 정보가 담긴 배열을 반환합니다.
// 실패 시 null을 반환합니다.
export const getAllMemberInfo = async () => {
  try {
    const userInfos = await axios.get(`${BACK}/api/members`);

    return userInfos;
  } catch (error) {
    return null;
  }
};

// 특정 회원 정보를 삭제(탈퇴)하는 함수입니다.
// 멤버 id를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleUserWithdrawal = async (memberId) => {
  try {
    await axios.delete(`${BACK}/api/members/${memberId}`);

    return true;
  } catch (error) {
    return false;
  }
};

// 카카오 로그인을 진행하는 함수입니다.
// 카카오 인게 코드를 인자로 받습니다.
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
