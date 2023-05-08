import { css } from "styled-components";

// 사용 예시 : background-color: var(--gray-200);
// 원하는 컬러가 있다면 여기서 추가하시고 사용해주시길 바랍니다(주석처리 필수)

const variables = css`
  --white: rgb(255 255 255); // white
  --white-50: rgb(248 250 252); // white dark
  --white-100: rgb(241 245 249); // white deep dark
  --gray-100: rgb(243 244 246); // modal용
  --gray-200: rgb(229 231 235);
  --gray-300: rgb(209 213 219);
  --gray-400: rgb(156 163 175);
  --emerald-600: rgb(4 120 87); // main color - light
  --emerald-700: rgb(4 120 87); // main color primary
  --emerald-800: rgb(6 95 70); // main color - dark
  --black: rgb(0 0 0); // one color
  --black-500: rgb(203 213 225); // black light
  --black-600: rgb(71 85 105); // black primary
  --black-700: rgb(51 65 85); // black dark
`;

export default variables;
