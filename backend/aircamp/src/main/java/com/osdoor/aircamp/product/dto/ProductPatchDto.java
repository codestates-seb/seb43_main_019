package com.osdoor.aircamp.product.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;
import java.time.LocalDate;

@Getter
public class ProductPatchDto {

    @Positive
    private Long productId;
    private String productName;
    private String address;
    private String location;
    private String content;
    private Integer capacity;
    private LocalDate cancellationDeadline;
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
