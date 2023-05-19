package com.osdoor.aircamp.product.service;

import com.osdoor.aircamp.auth.utils.AuthorizationUtils;
import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.service.MemberService;
import com.osdoor.aircamp.product.repository.ProductRepository;
import com.osdoor.aircamp.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final AuthorizationUtils authorizationUtils;

    public Product createProduct(Product product) {
        return repository.save(product);
    }

    public Product updateProduct(Product product) {
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
        Optional.ofNullable(product.getLatitude()).ifPresent(findProduct::setLatitude);
        Optional.ofNullable(product.getLongitude()).ifPresent(findProduct::setLongitude);
        Optional.ofNullable(product.getImageUrl()).ifPresent(findProduct::setImageUrl);

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
}
