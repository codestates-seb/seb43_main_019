package com.osdoor.aircamp.validator;

import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ReviewScoreValidator implements ConstraintValidator<ReviewScore, Double> {

    @Override
    public void initialize(ReviewScore constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
    @Override
    public boolean isValid(Double value, ConstraintValidatorContext context) {
        return value == 0.0 || value == 0.5 || value == 1.0 || value == 1.5 || value == 2.0
                || value == 2.5 || value == 3.0 || value == 3.5 || value == 4.0 || value == 4.5
                || value == 5.0;
    }
}
