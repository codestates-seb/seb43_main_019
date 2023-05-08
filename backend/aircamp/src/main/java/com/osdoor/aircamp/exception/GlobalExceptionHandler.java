package com.osdoor.aircamp.exception;

import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public com.osdoor.aircamp.exception.ErrorResponse handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        return com.osdoor.aircamp.exception.ErrorResponse.of(e.getBindingResult());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public com.osdoor.aircamp.exception.ErrorResponse handleConstraintViolationException(
            ConstraintViolationException e) {
        return com.osdoor.aircamp.exception.ErrorResponse.of(e.getConstraintViolations());

    }

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(
            BusinessLogicException e) {
        com.osdoor.aircamp.exception.ErrorResponse response = com.osdoor.aircamp.exception.ErrorResponse.of(e.getExceptionCode());
        return new ResponseEntity<>(response,HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public com.osdoor.aircamp.exception.ErrorResponse handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {

        final com.osdoor.aircamp.exception.ErrorResponse response = com.osdoor.aircamp.exception.ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public com.osdoor.aircamp.exception.ErrorResponse handleHttpMessageNotReadableException(
            HttpMessageNotReadableException e) {

        final com.osdoor.aircamp.exception.ErrorResponse response = com.osdoor.aircamp.exception.ErrorResponse.of("Required request body is missing");

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public com.osdoor.aircamp.exception.ErrorResponse handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e) {

        final com.osdoor.aircamp.exception.ErrorResponse response = com.osdoor.aircamp.exception.ErrorResponse.of(e.getMessage());

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public com.osdoor.aircamp.exception.ErrorResponse handleException(Exception e) {
        // 위에 명시한 예외처리 외의 예외가 애플리케이션에서 발생했을 경우를 대비해서 Exception으로 받았음.

        log.error("# handle Exception", e);
        //  애플리케이션의 에러는 에러 로그를 로그에 기록하는 것이 좋다고 함...
        return ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
