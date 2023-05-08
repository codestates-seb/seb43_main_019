package com.osdoor.aircamp.product.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ProductPatchDto {

    private Long productId;
    private String productName;
    private String address;
    private String location;
    private String content;
    private Integer capacity;
    private LocalDateTime cancellationDeadline;
    private Integer productPrice;
    private String productPhone;
    private Double latitude;
    private Double longitude;
    private String modifiedBy;
    private String imageUrl;

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
