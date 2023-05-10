import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export default function Profile() {
  const [userId, setUserId] = useState();
  const [nickname, setNickname] = useState();

  const getProfile = async () => {
    try {
      let data = await window.Kakao.API.request({ url: "/v2/user/me" });

      setUserId(data.id);
      setNickname(data.properties.nickname);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  useEffect(() => {
    (async () => {
      getProfile();
    })();
  });

  return (
    <div>
      <h2>{userId}</h2>
      <h2>{nickname}</h2>
    </div>
  );
}
