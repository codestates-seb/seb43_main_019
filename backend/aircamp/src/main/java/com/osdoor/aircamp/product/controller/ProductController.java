package com.osdoor.aircamp.product.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.osdoor.aircamp.common.dto.MultiResponseDto;
import com.osdoor.aircamp.product.dto.ProductPatchDto;
import com.osdoor.aircamp.product.dto.ProductPostDto;
import com.osdoor.aircamp.product.entity.Product;
import com.osdoor.aircamp.product.mapper.ProductMapper;
import com.osdoor.aircamp.product.service.ProductService;
import com.osdoor.aircamp.common.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@Validated
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;

    @PostMapping
    public ResponseEntity postProduct(@RequestParam("images") MultipartFile multipartFile,
                                      @RequestParam("jsonData") String jsonData) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        try {
            ProductPostDto requestBody = objectMapper.readValue(jsonData, ProductPostDto.class);

            Product product = productService.createProduct(mapper.productPostToProduct(requestBody), multipartFile);

            URI location = UriCreator.createUri("/api/products", product.getProductId());

            return ResponseEntity.created(location).build();
        } catch (Exception e) {
            log.info("# postProduct Error={}", e.getMessage());
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/{productId}")
    public ResponseEntity patchProduct(@PathVariable @Positive long productId,
                                       @RequestParam("images") MultipartFile multipartFile,
                                       @RequestParam("jsonData") String jsonData) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        try {
            ProductPatchDto requestBody = objectMapper.readValue(jsonData, ProductPatchDto.class);
            requestBody.setProductId(productId);

            Product product = productService.updateProduct(mapper.productPatchToProduct(requestBody), multipartFile);

            return new ResponseEntity(mapper.productToProductResponse(product), HttpStatus.OK);
        } catch (Exception e) {
            log.info("# patchProduct Error={}", e.getMessage());
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{productId}")
    public ResponseEntity getProduct(@PathVariable @Positive long productId) {
        Product product = productService.findProduct(productId);

        return new ResponseEntity(mapper.productToProductResponse(product), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getProducts(@RequestParam @Positive int page,
                                      @RequestParam @Positive int size) {
        Page<Product> pageProducts = productService.findAll(page, size);
        List<Product> products = pageProducts.getContent();

        return new ResponseEntity(
                new MultiResponseDto(mapper.productToProductResponses(products), pageProducts), HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteProduct(@PathVariable @Positive long productId) {
        productService.deleteProduct(productId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
