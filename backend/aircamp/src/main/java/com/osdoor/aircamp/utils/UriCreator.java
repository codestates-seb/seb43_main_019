package com.osdoor.aircamp.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

// 주어진 기본 URL과 리소스 ID를 사용하여 URI를 생성하는 유틸리티 클래스
public class UriCreator {
    public static URI createUri(String defaultUrl, long resourceId) { // String defaultUrl: 기본 URL 로, 생성할 URI 의 기본 경로, long resourceId: 리소스 ID로, 생성할 URI 에 추가될 식별자.
        return UriComponentsBuilder
                .newInstance()  // 새로운 UriComponentsBuilder 인스턴스를 생성
                .path(defaultUrl + "/{resource-id}") // 기본 URL에 리소스 ID 경로를 추가. 여기서 {resource-id}는 템플릿 변수로, 실제 리소스 ID 값으로 대체됨.
                .buildAndExpand(resourceId) // 템플릿 변수 {resource-id}를 실제 resourceId 값으로 대체하고, 이를 바탕으로 UriComponents 인스턴스를 생성.
                .toUri(); // UriComponents 인스턴스를 URI 객체로 변환.
    }
}


