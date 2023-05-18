import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import { dummyReviews } from "../Dummy/DummyDatas";
import { useRef } from "react";
import Review from "../Components/Review";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const Form = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid var(--gray-400);
`;

const Infos = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--gray-100);
`;

const Info = styled.h4``;

const MyReviewBtn = styled.div`
  overflow: hidden;
  border: 1px solid var(--black);
  color: var(--black-700);
  font-size: 13px;
  line-height: 13px;
  padding: 16px 16px 15px;
  text-decoration: none;
  cursor: pointer;
  background: var(--white-50);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;
  width: 80px;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const Inputs = styled.form`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 6fr 1fr 1fr;
  gap: 10px;
  padding: 0 10px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 18px;
  padding-left: 10px;
  background-color: var(--white);
  color: var(--black);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;
  margin: 0 auto;

  &:focus {
    border-bottom: 2px solid var(--black);
    border-radius: 4px 4px 2px 2px;
    border-color: var(--black-700);
  }
  &:hover {
    outline: 1px solid lightgrey;
    border: 1px solid var(--black-700);
  }
`;

const ScoreInput = styled.select`
  border-radius: 10px;
`;

const PostBtn = styled.button`
  overflow: hidden;
  border: 1px solid var(--black);
  color: var(--black-700);
  font-size: 13px;
  line-height: 13px;
  padding: 16px 16px 15px;
  text-decoration: none;
  cursor: pointer;
  background: var(--white-50);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const Reviews = styled.div``;

const getProductId = () => {
  return new Date().getTime();
};

export default function Test() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const selectRef = useRef(null);
  const userState = useSelector((state) => state.userReducer);

  const handleWriteReview = (event) => {
    setContent((prev) => event.target.value);
  };

  // 리뷰 작성 후 리뷰를 등록하는 함수입니다.
  const postReview = async (event) => {
    event.preventDefault();

    if (content.length === 0) {
      alert("리뷰를 작성해주세요.");
      return;
    }

    if (selectRef.current.value === "-") {
      alert("별점을 선택해주세요.");
      return;
    }

    const newReview = {
      content,
      score: +selectRef.current.value,
      // memberId: userState.userInfo.memberId,
      memberId: 1,
      productId: getProductId(),
    };

    // const success = await handlePostReview(newReview);
    const success = true;

    if (success === true) {
      newReview.createdAt = new Date().toISOString();
      console.log(newReview.createdAt);

      setReviews((prev) => [newReview, ...prev]);
    } else {
      alert("리뷰 작성이 실패했습니다.");
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      setReviews((prev) => [...dummyReviews]);
      // const result = await getAllReview(1, 10000);
      // 리뷰를 filter 등을 이용해 한 번 거른다.
      // setReviews((prev) => [...result]);

      setIsLoading((prev) => false);
    })();
  }, []);

  const getMyReviews = () => {
    return;

    const myMemberId = userState.userInfo.memberId;

    const myReviews = reviews.filter(
      (review) => review.memberId === myMemberId
    );

    setReviews((prev) => [...myReviews]);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Container>
          <Form>
            <Infos>
              <Info>현재 리뷰 21</Info>
              <MyReviewBtn onClick={getMyReviews}>My 리뷰</MyReviewBtn>
            </Infos>
            <Inputs onSubmit={postReview}>
              <TextInput
                value={content}
                onChange={handleWriteReview}
                placeholder="리뷰를 작성해 주세요."
              />
              <ScoreInput ref={selectRef}>
                <option value="-">별점</option>
                <option value="0.0">0.0</option>
                <option value="0.5">0.5</option>
                <option value="1.0">1.0</option>
                <option value="1.5">1.5</option>
                <option value="2.0">2.0</option>
                <option value="2.5">2.5</option>
                <option value="3.0">3.0</option>
                <option value="3.5">3.5</option>
                <option value="4.0">4.0</option>
                <option value="4.5">4.5</option>
                <option value="5.0">5.0</option>
              </ScoreInput>
              <PostBtn>리뷰 작성</PostBtn>
            </Inputs>
          </Form>
          <Reviews>
            {reviews.map((review) => (
              <Review key={review.reviewId + ""} review={review} />
            ))}
          </Reviews>
        </Container>
      )}
    </Wrapper>
  );
}
