package com.osdoor.aircamp.product.service;

import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.service.MemberService;
import com.osdoor.aircamp.product.repository.ProductRepository;
import com.osdoor.aircamp.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final MemberService memberService;

    public Product createProduct(Product product) {
        Member member = memberService.findMember(product.getMember().getMemberId());

        return repository.save(product);
    }

    public Product updateProduct(Product product) {
        Product findProduct = findVerifiedProduct(product.getProductId());

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

    public Product findProduct(long productId) {
        return findVerifiedProduct(productId);
    }

    public Page<Product> findAll(int page, int size) {
        return repository.findAll(PageRequest.of(page - 1, size, Sort.by("productId").descending()));
    }

    public void deleteProduct(long productId) {
        Product findProduct = findVerifiedProduct(productId);

        findProduct.setDeleted(true);
    }

    public Product findVerifiedProduct(long productId) {
        Optional<Product> findProduct = repository.findById(productId);

        return findProduct.orElseThrow();
    }
}
