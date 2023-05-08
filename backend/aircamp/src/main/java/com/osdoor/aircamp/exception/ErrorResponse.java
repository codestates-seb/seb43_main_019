package com.osdoor.aircamp.exception;

import com.osdoor.aircamp.exception.ExceptionCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
//@AllArgsConstructor  // GlobalExceptionHandler에서 ResponseEntity로 넘겨줄 때, ErrorResponse의 객체에 담은상태로 넘겨줘야함. 그때 필요.
public class ErrorResponse {
    List<com.osdoor.aircamp.exception.ErrorResponse.FieldError> fieldErrors;
    List<com.osdoor.aircamp.exception.ErrorResponse.ConstraintViolationError> violationErrors;
    private String reason;

    private ErrorResponse(List<com.osdoor.aircamp.exception.ErrorResponse.FieldError> fieldErrors, List<com.osdoor.aircamp.exception.ErrorResponse.ConstraintViolationError> violationErrors) {
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    private ErrorResponse(String reason) {
        this.reason = reason;
    }
    public static com.osdoor.aircamp.exception.ErrorResponse of(BindingResult bindingResult) {
        return new com.osdoor.aircamp.exception.ErrorResponse(com.osdoor.aircamp.exception.ErrorResponse.FieldError.of(bindingResult), null);}
    public static com.osdoor.aircamp.exception.ErrorResponse of(Set<ConstraintViolation<?>> constraintViolations) {
        return new com.osdoor.aircamp.exception.ErrorResponse(null, com.osdoor.aircamp.exception.ErrorResponse.ConstraintViolationError.of(constraintViolations));}

    public static com.osdoor.aircamp.exception.ErrorResponse of(ExceptionCode exceptionCode) {
        return new com.osdoor.aircamp.exception.ErrorResponse(exceptionCode.getMessage());
    }
    public static com.osdoor.aircamp.exception.ErrorResponse of(HttpStatus httpStatus) {
        return new com.osdoor.aircamp.exception.ErrorResponse(httpStatus.getReasonPhrase());
    }
    public static com.osdoor.aircamp.exception.ErrorResponse of(String message) {
        return new com.osdoor.aircamp.exception.ErrorResponse(message);
    }
    @Getter
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;

        private FieldError(String field, Object rejectedValue, String reason) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<com.osdoor.aircamp.exception.ErrorResponse.FieldError> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(error -> new com.osdoor.aircamp.exception.ErrorResponse.FieldError(error.getField(),error.getRejectedValue(),error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }

    }

    @Getter
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private ConstraintViolationError(String propertyPath, Object rejectedValue, String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<com.osdoor.aircamp.exception.ErrorResponse.ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new com.osdoor.aircamp.exception.ErrorResponse.ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(), constraintViolation.getInvalidValue(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }


    }
}
