package com.osdoor.aircamp.review.controller;

import com.osdoor.aircamp.common.dto.MultiResponseDto;
import com.osdoor.aircamp.review.dto.ReviewPatchDto;
import com.osdoor.aircamp.review.dto.ReviewPostDto;
import com.osdoor.aircamp.review.entity.Review;
import com.osdoor.aircamp.review.mapper.ReviewMapper;
import com.osdoor.aircamp.review.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@Validated
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewMapper mapper;

    public ReviewController(ReviewService reviewService, ReviewMapper mapper) {
        this.reviewService = reviewService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postReview(@Valid @RequestBody ReviewPostDto requestBody) {
        Review review = reviewService.createReview(mapper.reviewPostDtoToReview(requestBody));

        URI uri = UriComponentsBuilder.newInstance()
                .path("/api/reviews/" + review.getReviewId())
                .build().toUri();

        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity patchReview(@PathVariable @Positive long reviewId,
                                      @Valid @RequestBody ReviewPatchDto requestBody) {
        requestBody.setReviewId(reviewId);
        Review review = reviewService.updateReview(mapper.reviewPatchDtoToReview(requestBody));

        return new ResponseEntity(mapper.reviewToReviewResponseDto(review), HttpStatus.OK);

    }

    @GetMapping("/{reviewId}")
    public ResponseEntity getReview(@PathVariable @Positive long reviewId) {
        Review review = reviewService.findReview(reviewId);

        return new ResponseEntity(mapper.reviewToReviewResponseDto(review), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getReviews(@RequestParam int page,
                                      @RequestParam int size) {
        Page<Review> pageReviews = reviewService.findReviews(page, size);
        List<Review> reviews = pageReviews.getContent();

        return new ResponseEntity(
                new MultiResponseDto(mapper.reviewToReviewResponseDtos(reviews), pageReviews), HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity deleteReview(@PathVariable @Positive long reviewId) {
        reviewService.deleteReview(reviewId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
