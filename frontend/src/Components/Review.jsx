import styled from "@emotion/styled";
import { FcBusinessman } from "react-icons/fc";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-400);
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
  background-color: var(--gray-200);
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-100);
  margin-right: 10px;
`;

const UserName = styled.h4`
  font-size: 15px;
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
`;

const ReviewInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: var(--gray-100);
`;

const Score = styled.h4``;

const DateDisplay = styled.h4``;

const getScore = (score) => {
  if ((score * 10) % 10 === 0) return score + 0.5;
  else return score;
};

const getDate = (date) => {
  return date.slice(0, 10);
};

export default function Review({ review }) {
  return (
    <Container>
      <UserInfo>
        <UserIcon>
          <FcBusinessman size={"30px"} />
        </UserIcon>
        <UserName>홍길동</UserName>
      </UserInfo>
      <Content>{review.content}</Content>
      <ReviewInfo>
        <Score>{`별점: ${getScore(review.score)}`}</Score>
        <DateDisplay>{`작성일: ${getDate(review.createdAt)}`}</DateDisplay>
      </ReviewInfo>
    </Container>
  );
}
