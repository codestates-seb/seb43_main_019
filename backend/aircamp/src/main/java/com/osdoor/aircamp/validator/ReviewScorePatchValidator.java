package com.osdoor.aircamp.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ReviewScorePatchValidator implements ConstraintValidator<ReviewScorePatch, Double> {

    @Override
    public void initialize(ReviewScorePatch constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
    @Override
    public boolean isValid(Double value, ConstraintValidatorContext context) {
        if(value==null) return true;
        return value == 0.0 || value == 0.5 || value == 1.0 || value == 1.5 || value == 2.0
                || value == 2.5 || value == 3.0 || value == 3.5 || value == 4.0 || value == 4.5
                || value == 5.0;
    }
}