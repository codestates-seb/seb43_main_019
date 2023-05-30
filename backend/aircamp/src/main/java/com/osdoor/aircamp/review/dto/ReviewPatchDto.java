package com.osdoor.aircamp.review.dto;

import com.osdoor.aircamp.common.validator.NotSpace;
import com.osdoor.aircamp.common.validator.ReviewScorePatch;
import lombok.AllArgsConstructor;
import lombok.Getter;

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
