package com.osdoor.aircamp.review.service;

import com.osdoor.aircamp.common.exception.BusinessLogicException;
import com.osdoor.aircamp.common.exception.ExceptionCode;
import com.osdoor.aircamp.member.service.MemberService;
import com.osdoor.aircamp.review.entity.Review;
import com.osdoor.aircamp.review.repository.ReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@Slf4j
public class ReviewService {

    private final ReviewRepository repository;
    private final MemberService memberService;

    public ReviewService(ReviewRepository repository, MemberService memberService) {
        this.repository = repository;
        this.memberService = memberService;
    }

    public Review createReview(Review review) {
        return repository.save(review);
    }
    public Review updateReview(Review review) {
        Review findReview = findVerifiedReview(review.getReviewId());

        Optional.ofNullable(review.getContent()).ifPresent(content -> findReview.setContent(content));
        Optional.ofNullable(review.getScore()).ifPresent(score -> findReview.setScore(score));

        return repository.save(findReview);
    }
    public Review findReview(long reviewId) {
        return findVerifiedReview(reviewId);
    }
    public Page<Review> findReviews(int page, int size) {
        return repository.findAll(PageRequest.of(page-1,size, Sort.by("reviewId").descending()));
    }
    public void deleteReview(long reviewId) {
        repository.delete(findVerifiedReview(reviewId));
    }

    private Review findVerifiedReview(long reviewId) {
        Optional<Review> optionalReview = repository.findById(reviewId);
        return optionalReview.orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }
}
