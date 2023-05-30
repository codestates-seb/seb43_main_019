package com.osdoor.aircamp.product;

import com.osdoor.aircamp.product.dto.ProductResponseDto;
import com.osdoor.aircamp.product.entity.Product;
import com.osdoor.aircamp.product.mapper.ProductMapper;
import com.osdoor.aircamp.product.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("local")
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @MockBean
    private ProductMapper mapper;

    @Test
    @WithMockUser(roles = "SELLER")
    void postProductTest() throws Exception {
        MockMultipartFile imageFile = new MockMultipartFile("images", "image.jpg", "image/jpeg", "Image Content".getBytes());
        String jsonData = "{\"productName\":\"캠핑장\","
                + "\"address\":\"서울특별시\","
                + "\"location\":\"서울\","
                + "\"content\":\"캠핑장 빌려드립니다.\","
                + "\"capacity\":10,"
                + "\"cancellationDeadline\":\"2023-05-03\","
                + "\"productPrice\":30000,"
                + "\"productPhone\":\"010-1234-5337\","
                + "\"memberId\":1}";

        Product product = new Product();
        product.setProductId(1L);

        given(mapper.productPostToProduct(Mockito.any())).willReturn(new Product());
        given(productService.createProduct(Mockito.any(Product.class), Mockito.any(MockMultipartFile.class))).willReturn(product);

        ResultActions actions = mockMvc.perform(
                multipart("/api/products")
                        .file(imageFile)
                        .param("jsonData", jsonData)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/products/"))))
                .andDo(document(
                        "post-product",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParts(
                                partWithName("images").description("이미지 파일 업로드")
                        ),
                        requestParameters(
                                parameterWithName("jsonData").description("Json Data")
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }

    @Test
    @WithMockUser(roles = "SELLER")
    void patchProductTest() throws Exception {
        MockMultipartFile imageFile = new MockMultipartFile("images", "image.jpg", "image/jpeg", "Image Content".getBytes());
        String jsonData = "{\"productName\":\"캠핑장\","
                + "\"address\":\"서울특별시\","
                + "\"location\":\"서울\","
                + "\"content\":\"캠핑장 빌려드립니다.\","
                + "\"capacity\":10,"
                + "\"cancellationDeadline\":\"2023-05-03\","
                + "\"productPrice\":30000,"
                + "\"productPhone\":\"010-1234-5337\"}";

        Product product = new Product();
        product.setProductId(1L);

        ProductResponseDto productResponseDto = new ProductResponseDto(1L,
                "new 캠핑장",
                "서울특별시",
                "서울",
                "new 캠핑장 빌려드립니다.",
                10,
                LocalDate.now(),
                30000,
                "010-1234-5337",
                37.5,
                40.5,
                false,
                LocalDate.now(),
                "seller",
                LocalDate.now(),
                "seller",
                "http",
                1L);

        given(mapper.productPatchToProduct(Mockito.any())).willReturn(product);
        given(productService.updateProduct(Mockito.any(Product.class), Mockito.any(MockMultipartFile.class))).willReturn(product);
        given(mapper.productToProductResponse(Mockito.any(Product.class))).willReturn(productResponseDto);

        ResultActions actions = mockMvc.perform(
                multipart("/api/products/{productId}", productResponseDto.getProductId())
                        .file(imageFile)
                        .param("jsonData", jsonData)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .with(requestPostProcessor -> {
                            requestPostProcessor.setMethod("PATCH");
                            return requestPostProcessor;
                        })
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(product.getProductId()))
                .andDo(document(
                        "patch-product",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("productId").description("상품 식별자")
                        ),
                        requestParts(
                                partWithName("images").description("이미지 파일 업로드")
                        ),
                        requestParameters(
                                parameterWithName("jsonData").description("JSON Data").optional()
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("상품 식별자"),
                                        fieldWithPath("productName").type(JsonFieldType.STRING).description("상품명"),
                                        fieldWithPath("address").type(JsonFieldType.STRING).description("상세 주소"),
                                        fieldWithPath("location").type(JsonFieldType.STRING).description("지역"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("상품 설명"),
                                        fieldWithPath("capacity").type(JsonFieldType.NUMBER).description("수용인원수"),
                                        fieldWithPath("cancellationDeadline").type(JsonFieldType.STRING).description("취소기한"),
                                        fieldWithPath("productPrice").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("productPhone").type(JsonFieldType.STRING).description("전화번호"),
                                        fieldWithPath("latitude").type(JsonFieldType.NUMBER).description("위도"),
                                        fieldWithPath("longitude").type(JsonFieldType.NUMBER).description("경도"),
                                        fieldWithPath("deleted").type(JsonFieldType.BOOLEAN).description("상품 삭제 여부"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성일"),
                                        fieldWithPath("createdBy").type(JsonFieldType.STRING).description("생성자"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정일"),
                                        fieldWithPath("modifiedBy").type(JsonFieldType.STRING).description("수정자"),
                                        fieldWithPath("imageUrl").type(JsonFieldType.STRING).description("상품 이미지 url"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자")
                                )
                        )
                ));
    }

    @Test
    void getProductTest() throws Exception {
        Product product = new Product();
        product.setProductId(1L);

        ProductResponseDto productResponseDto = new ProductResponseDto(1L,
                "캠핑장",
                "서울특별시",
                "서울",
                "캠핑장 빌려드립니다.",
                10,
                LocalDate.now(),
                30000,
                "010-1234-5337",
                37.5,
                40.5,
                false,
                LocalDate.now(),
                "seller",
                LocalDate.now(),
                "seller",
                "http",
                1L);

        given(productService.findProduct(Mockito.anyLong())).willReturn(product);
        given(mapper.productToProductResponse(Mockito.any(Product.class))).willReturn(productResponseDto);

        ResultActions actions = mockMvc.perform(
                get("/api/products/{productId}", productResponseDto.getProductId())
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(product.getProductId()))
                .andDo(document(
                        "get-product",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("productId").description("상품 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("상품 식별자"),
                                        fieldWithPath("productName").type(JsonFieldType.STRING).description("상품명"),
                                        fieldWithPath("address").type(JsonFieldType.STRING).description("상세 주소"),
                                        fieldWithPath("location").type(JsonFieldType.STRING).description("지역"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("상품 설명"),
                                        fieldWithPath("capacity").type(JsonFieldType.NUMBER).description("수용인원수"),
                                        fieldWithPath("cancellationDeadline").type(JsonFieldType.STRING).description("취소기한"),
                                        fieldWithPath("productPrice").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("productPhone").type(JsonFieldType.STRING).description("전화번호"),
                                        fieldWithPath("latitude").type(JsonFieldType.NUMBER).description("위도"),
                                        fieldWithPath("longitude").type(JsonFieldType.NUMBER).description("경도"),
                                        fieldWithPath("deleted").type(JsonFieldType.BOOLEAN).description("상품 삭제 여부"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성일"),
                                        fieldWithPath("createdBy").type(JsonFieldType.STRING).description("생성자"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정일"),
                                        fieldWithPath("modifiedBy").type(JsonFieldType.STRING).description("수정자"),
                                        fieldWithPath("imageUrl").type(JsonFieldType.STRING).description("상품 이미지 url"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자")
                                )
                        )
                ));
    }

    @Test
    void getProductsTest() throws Exception {
        Product product1 = new Product();
        product1.setProductId(1L);

        Product product2 = new Product();
        product2.setProductId(2L);

        List<ProductResponseDto> responseDtos = List.of(
                new ProductResponseDto(1L,
                        "캠핑장",
                        "서울특별시",
                        "서울",
                        "캠핑장 빌려드립니다.",
                        10,
                        LocalDate.now(),
                        30000,
                        "010-1234-5337",
                        37.5,
                        40.5,
                        false,
                        LocalDate.now(),
                        "seller",
                        LocalDate.now(),
                        "seller",
                        "http",
                        1L),
                new ProductResponseDto(2L,
                        "캠핑장2",
                        "서울특별시",
                        "서울",
                        "캠핑장 빌려드립니다2",
                        10,
                        LocalDate.now(),
                        30000,
                        "010-1234-5678",
                        37.5,
                        40.5,
                        false,
                        LocalDate.now(),
                        "seller2",
                        LocalDate.now(),
                        "seller2",
                        "http",
                        1L)
        );

        int page = 1;
        int size = 10;

        given(productService.findAll(Mockito.anyInt(), Mockito.anyInt()))
                .willReturn(new PageImpl(responseDtos, PageRequest.of(page - 1, size, Sort.by("productId").descending()), responseDtos.size()));
        given(mapper.productToProductResponses(Mockito.anyList())).willReturn(responseDtos);

        ResultActions actions = mockMvc.perform(
                get("/api/products?page={page}&size={size}", page, size)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document(
                        "get-products",
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("페이지 번호"),
                                        parameterWithName("size").description("페이지 크기"))
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].productId").type(JsonFieldType.NUMBER).description("상품 식별자"),
                                        fieldWithPath("data[].productName").type(JsonFieldType.STRING).description("상품명"),
                                        fieldWithPath("data[].address").type(JsonFieldType.STRING).description("상세 주소"),
                                        fieldWithPath("data[].location").type(JsonFieldType.STRING).description("지역"),
                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("상품 설명"),
                                        fieldWithPath("data[].capacity").type(JsonFieldType.NUMBER).description("수용인원수"),
                                        fieldWithPath("data[].cancellationDeadline").type(JsonFieldType.STRING).description("취소기한"),
                                        fieldWithPath("data[].productPrice").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data[].productPhone").type(JsonFieldType.STRING).description("전화번호"),
                                        fieldWithPath("data[].latitude").type(JsonFieldType.NUMBER).description("위도"),
                                        fieldWithPath("data[].longitude").type(JsonFieldType.NUMBER).description("경도"),
                                        fieldWithPath("data[].deleted").type(JsonFieldType.BOOLEAN).description("상품 삭제 여부"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("생성일"),
                                        fieldWithPath("data[].createdBy").type(JsonFieldType.STRING).description("생성자"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("수정일"),
                                        fieldWithPath("data[].modifiedBy").type(JsonFieldType.STRING).description("수정자"),
                                        fieldWithPath("data[].imageUrl").type(JsonFieldType.STRING).description("상품 이미지 url"),
                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(roles = "SELLER")
    void deleteProductTest() throws Exception {
        long productId = 1L;

        doNothing().when(productService).deleteProduct(productId);

        ResultActions actions = mockMvc.perform(
                delete("/api/products/{productId}", productId)
        );

        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "delete-product",
                        pathParameters(
                                parameterWithName("productId").description("상품 식별자")
                        )
                ));
    }
}
