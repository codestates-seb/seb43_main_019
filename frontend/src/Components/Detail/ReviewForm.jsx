import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Review from "../Detail/Review";
import { useSelector } from "react-redux";
import { getAllReview, handlePostReview } from "../../utilss/ReviewFunctions";
import { toast } from "react-toastify";
import Spinner from "../Common/Spinner";

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 400px) {
    margin-top: 100px;
  }
`;

const Form = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  /* border-bottom: 1px solid var(--gray-400); */
`;

const Infos = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: var(--gray-100); */
`;

const Info = styled.h4``;

const MyReviewBtn = styled.div`
  overflow: hidden;
  /* border: 1px solid var(--black); */
  /* color: var(--black-700); */
  font-size: 13px;
  line-height: 13px;
  padding: 16px 16px 15px;
  text-decoration: none;
  cursor: pointer;
  /* background: var(--white-50); */
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
  cursor: pointer;
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
  font-size: 15px;
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
  border-radius: 3px;
`;

const PostBtn = styled.button`
  overflow: hidden;
  color: var(--white);
  font-size: 13px;
  line-height: 11px;
  padding: 16px 16px 15px;
  text-decoration: none;
  cursor: pointer;
  background: #27374d;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media screen and (max-width: 868px) {
    flex-direction: column;
  }
`;

export default function ReviewForm({ productId }) {
  const [reviews, setReviews] = useState([]); // 현재 보여줄 리뷰들입니다.
  const [isLoading, setIsLoading] = useState(false); // 보여줄 리뷰들이 로딩중인지를 저장하는 state입니다.
  const [content, setContent] = useState(""); // 작성할 리뷰의 내용입니다.
  const [showMine, setShowMine] = useState(false); // 현재 나의 리뷰만을 보여주는지 저장할 state입니다.
  const [isReviewWritten, setIsReviewWritten] = useState(false);
  const selectRef = useRef(null); // 별점을 참조합니다.
  const userState = useSelector((state) => state.UserReducer); // 유저정보

  const handleWriteReview = (event) => {
    setContent((prev) => event.target.value);
  };

  // 현재 상품에 대한 모든 리뷰를 가져오는 함수입니다.
  const showAllReviews = async () => {
    const result = await getAllReview(1, 10000);

    const filtered = result.filter((review) => {
      return review.productId === Number(productId);
    });

    return filtered;
  };

  // 리뷰 작성 후 리뷰를 등록하는 함수입니다.
  const postReview = async (event) => {
    event.preventDefault();

    if (content.length === 0) {
      toast("리뷰를 작성해주세요.");
      return;
    }

    if (selectRef.current.value === "-") {
      toast("별점을 선택해주세요.");
      return;
    }

    const newReview = {
      content,
      score: +selectRef.current.value,
      memberId: userState.userInfo.memberId,
      productId,
    };

    const success = await handlePostReview(newReview);

    if (success === true) {
      toast("리뷰를 작성했습니다.");
      window.location.reload();
    } else {
      toast("리뷰 작성이 실패했습니다.");
    }
  };

  // 자기 자신이 작성한 리뷰들을 보여주는 함수입니다.
  const getMyReviews = async () => {
    if (showMine) {
      // 만약, 현재 자신의 리뷰를 보여주는 상황이라면
      // 다시 전체 리뷰를 보여줍니다.
      // 즉, 자신의 리뷰 -> 전체 리뷰로 전환합니다.

      setShowMine((prev) => false);

      const filtered = await showAllReviews();

      setReviews((prev) => [...filtered]);
    } else {
      // 만약, 현재 모든 리뷰를 보여주는 상황이라면
      // 자신의 리뷰만을 보여줍니다.
      // 즉, 모든 리뷰 -> 자신의 리뷰로 전환합니다.

      setShowMine((prev) => true);

      const { memberId } = userState.userInfo;

      // 현재 reviews에는 모든 리뷰가 저장 되어 있습니다.
      const myReviews = reviews.filter(
        (review) => review.memberId === memberId
      );

      setReviews((prev) => [...myReviews]);
    }
  };

  // 가장 먼저 리뷰들을 가져오는 부분입니다.
  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const filtered = await showAllReviews();

      setReviews((prev) => [...filtered]);

      let isMine = false;
      if (userState.login) {
        filtered.forEach((review) => {
          if (review.memberId === userState.userInfo.memberId) {
            isMine = true;
          }
        });
      }

      setIsReviewWritten((prev) => isMine);

      setIsLoading((prev) => false);
    })();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Container>
      <Form>
        <Infos>
          <Info>{`후기 ${reviews.length}개`}</Info>
          {userState.login && (
            <MyReviewBtn showMine={showMine} onClick={getMyReviews}>
              My 리뷰
            </MyReviewBtn>
          )}
        </Infos>
        {userState.login && (
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
            <PostBtn disabled={isReviewWritten}>리뷰 작성</PostBtn>
          </Inputs>
        )}
      </Form>
      <Reviews>
        {reviews.map((review) => (
          <Review
            key={review.reviewId + ""}
            review={review}
            userId={userState.userInfo ? userState.userInfo.memberId : -1}
          />
        ))}
      </Reviews>
    </Container>
  );
}
