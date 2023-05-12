package com.osdoor.aircamp.review.repository;

import com.osdoor.aircamp.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review,Long> {
}
