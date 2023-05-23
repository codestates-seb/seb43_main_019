// 현재 날짜를 문자열로 반환하는 함수
// 예) "2023-05-06"
export const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;

  return dateString;
};

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

// 돈에 쉼표를 찍어서 반환하는 함수입니다.
// 쉼표가 찍힌 문자열을 반환합니다. (예를 들어 30000 => 30,000)
export const formatPrice = (price) => {
  return "₩ " + price.toLocaleString();
};

// 랜덤(사실 랜덤 아님)한 id를 반환하는 함수입니다.
// 숫자형의 값을 반환합니다.
export const getRandomId = () => {
  return new Date().getTime();
};

// 사업자 등록 번호의 패턴이 유효한지 판별하는 함수입니다.
export const validBusinessNumber = (code) => {
  const codePattern = /^\d{3}-\d{2}-\d{5}$/;

  return codePattern.test(code);
};

// 사업자 등록 일자의 패턴이 유효한지 판별하는 함수입니다.
export const validBusinessDate = (date) => {
  const codePattern = /^\d{4}-\d{2}-\d{2}$/;

  return codePattern.test(date);
};

// 위도/경도가 유효한지 판별하는 함수입니다.
export const validCoordinate = (coord) => {
  const coordPattern = /^\d*\.?\d*$/;

  return coordPattern.test(coord);
};
