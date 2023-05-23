package com.osdoor.aircamp.member.controller;

import com.osdoor.aircamp.member.dto.SellerPatchDto;
import com.osdoor.aircamp.member.dto.SellerPostDto;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.mapper.SellerMapper;
import com.osdoor.aircamp.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/api/sellers")
@Validated
public class SellerController {
    private final MemberService memberService;
    private final SellerMapper mapper;

    public SellerController(MemberService memberService, SellerMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/{memberId}")
    public ResponseEntity postSeller(@PathVariable @Positive long memberId,
                                     @Valid @RequestBody SellerPostDto requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.sellerPostDtoToMember(requestBody));

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }
    @PatchMapping("/{memberId}")
    public ResponseEntity patchSeller(@PathVariable @Positive long memberId,
                                      @Valid @RequestBody SellerPatchDto requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.sellerPatchDtoToMember(requestBody));

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);

    }
}
