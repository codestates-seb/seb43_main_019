package com.osdoor.aircamp.review.dto;

import com.osdoor.aircamp.validator.NotSpace;
import com.osdoor.aircamp.validator.ReviewScore;
import com.osdoor.aircamp.validator.ReviewScorePatch;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
@Getter
@AllArgsConstructor
public class ReviewPatchDto {
    private Long reviewId;
    @NotSpace
    private String content;

    @ReviewScorePatch
    private Double score;
    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }
}
