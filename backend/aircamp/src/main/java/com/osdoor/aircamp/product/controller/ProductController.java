package com.osdoor.aircamp.product.controller;

import com.osdoor.aircamp.dto.MultiResponseDto;
import com.osdoor.aircamp.product.dto.ProductPatchDto;
import com.osdoor.aircamp.product.dto.ProductPostDto;
import com.osdoor.aircamp.product.entity.Product;
import com.osdoor.aircamp.product.mapper.ProductMapper;
import com.osdoor.aircamp.product.service.ProductService;
import com.osdoor.aircamp.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@Validated
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;

    public ProductController(ProductService productService, ProductMapper mapper) {
        this.productService = productService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postProduct(@RequestBody ProductPostDto requestBody) {
        Product product = productService.createProduct(mapper.productPostToProduct(requestBody));

        URI location = UriCreator.createUri("/api/products", product.getProductId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{productId}")
    public ResponseEntity patchProduct(@PathVariable @Positive long productId,
                                       @RequestBody ProductPatchDto requestBody) {
        requestBody.setProductId(productId);
        Product product = productService.updateProduct(mapper.productPatchToProduct(requestBody));

        return new ResponseEntity(mapper.productToProductResponse(product), HttpStatus.OK);
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
