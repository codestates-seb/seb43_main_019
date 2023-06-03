import styled from "@emotion/styled";
import User from "./User";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMemberInfo } from "../../Utils/MemberFunctions";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.UserReducer);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const reuslt = await getAllMemberInfo(userState.userInfo);

      const usersInfo = reuslt.filter(
        (user) => user.memberStatus !== "MEMBER_QUIT"
      );
      setUsers((prev) => usersInfo);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : users && users.length > 0 ? (
        <>
          {users.map((user) => (
            <User user={user} key={user.memberId + ""} />
          ))}
        </>
      ) : (
        <h1>유저가 없습니다.</h1>
      )}
    </Container>
  );
}
