import styled from "@emotion/styled";
import User from "./User";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMemberInfo } from "../../utils/MemberFunctions";
import { dummyUsers } from "../../Dummy/DummyDatas";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      // const usersInfo = await getAllMemberInfo();
      // setUsers((prev) => usersInfo);
      setUsers((prev) => dummyUsers);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {users.map((user) => (
            <User user={user} key={user.memberId + ""} />
          ))}
        </>
      )}
    </Container>
  );
}
