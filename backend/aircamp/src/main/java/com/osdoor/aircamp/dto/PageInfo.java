package com.osdoor.aircamp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageInfo {

    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}
