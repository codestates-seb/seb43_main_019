import axios from "axios";
import { REST_API_KEY, REDIRECT_URI } from "../secret";

const BACK = "ec2-3-34-91-147.ap-northeast-2.compute.amazonaws.com";
const LOCAL = "http://localhost:4000";

let isLocal = true;

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