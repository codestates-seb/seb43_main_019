package com.osdoor.aircamp.product.service;

import com.osdoor.aircamp.common.auth.utils.AuthorizationUtils;
import com.osdoor.aircamp.common.aws.S3Upload;
import com.osdoor.aircamp.common.exception.BusinessLogicException;
import com.osdoor.aircamp.common.exception.ExceptionCode;
import com.osdoor.aircamp.helper.api.KakaoRestApiHelper;
import com.osdoor.aircamp.product.repository.ProductRepository;
import com.osdoor.aircamp.product.entity.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository repository;
    private final AuthorizationUtils authorizationUtils;
    private final KakaoRestApiHelper kakaoRestApiHelper;
    private final S3Upload s3Upload;


    public Product createProduct(Product product, MultipartFile multipartFile) {
        product.setImageUrl(handleProductImageUpload(product, multipartFile));

        String[] coordinateFromAddress = kakaoRestApiHelper.getCoordinateFromAddress(product.getAddress());
        product.setLongitude(Double.valueOf(coordinateFromAddress[0]));
        product.setLatitude(Double.valueOf(coordinateFromAddress[1]));

        return repository.save(product);
    }

    public Product updateProduct(Product product, MultipartFile multipartFile) {
        Product findProduct = findVerifiedProduct(product.getProductId());
        authorizationUtils.verifyAuthorizedMember(findProduct.getMember().getEmail());

        Optional.ofNullable(product.getProductName()).ifPresent(findProduct::setProductName);
        Optional.ofNullable(product.getAddress()).ifPresent(findProduct::setAddress);
        Optional.ofNullable(product.getLocation()).ifPresent(findProduct::setLocation);
        Optional.ofNullable(product.getContent()).ifPresent(findProduct::setContent);
        Optional.ofNullable(product.getCapacity()).ifPresent(findProduct::setCapacity);
        Optional.ofNullable(product.getCancellationDeadline()).ifPresent(findProduct::setCancellationDeadline);
        Optional.ofNullable(product.getProductPrice()).ifPresent(findProduct::setProductPrice);
        Optional.ofNullable(product.getProductPhone()).ifPresent(findProduct::setProductPhone);

        findProduct.setImageUrl(handleProductImageUpload(findProduct, multipartFile));

        String[] coordinateFromAddress = kakaoRestApiHelper.getCoordinateFromAddress(product.getAddress());
        findProduct.setLongitude(Double.valueOf(coordinateFromAddress[0]));
        findProduct.setLatitude(Double.valueOf(coordinateFromAddress[1]));

        return repository.save(findProduct);
    }

    @Transactional(readOnly = true)
    public Product findProduct(long productId) {
        return findVerifiedProduct(productId);
    }

    @Transactional(readOnly = true)
    public Page<Product> findAll(int page, int size) {
        return repository.findAll(PageRequest.of(page - 1, size, Sort.by("productId").descending()));
    }

    public void deleteProduct(long productId) {
        Product findProduct = findVerifiedProduct(productId);
        authorizationUtils.verifyAuthorizedMember(findProduct.getMember().getEmail());

        findProduct.setDeleted(true);
    }

    public Product findVerifiedProduct(long productId) {
        Optional<Product> findProduct = repository.findById(productId);

        return findProduct.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }

    private String handleProductImageUpload(Product product, MultipartFile multipartFile) {
        String imageUrl = product.getImageUrl();
        try {
            if(!multipartFile.isEmpty())  {
                imageUrl = s3Upload.upload(multipartFile);
            }
        } catch (IOException e) {
            log.info("# s3Upload.upload Error={}", e.getMessage());
        }

        return imageUrl;
    }
}
