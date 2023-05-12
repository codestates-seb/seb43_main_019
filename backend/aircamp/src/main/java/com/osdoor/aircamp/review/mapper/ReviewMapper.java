package com.osdoor.aircamp.review.mapper;

import com.osdoor.aircamp.review.dto.ReviewPatchDto;
import com.osdoor.aircamp.review.dto.ReviewPostDto;
import com.osdoor.aircamp.review.dto.ReviewResponseDto;
import com.osdoor.aircamp.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);
    List<ReviewResponseDto> reviewToReviewResponseDtos(List<Review> reviews);
}
