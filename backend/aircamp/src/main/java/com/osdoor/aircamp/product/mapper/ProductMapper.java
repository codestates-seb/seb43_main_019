package com.osdoor.aircamp.product.mapper;

import com.osdoor.aircamp.product.dto.ProductPatchDto;
import com.osdoor.aircamp.product.dto.ProductPostDto;
import com.osdoor.aircamp.product.dto.ProductResponseDto;
import com.osdoor.aircamp.product.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product productPostToProduct(ProductPostDto productPostDto);
    Product productPatchToProduct(ProductPatchDto productPatchDto);
    ProductResponseDto productToProductResponse(Product product);
    List<ProductResponseDto> productToProductResponses(List<Product> products);
}
