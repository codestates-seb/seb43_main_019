package com.osdoor.aircamp.member.controller;

import com.osdoor.aircamp.dto.SingleResponseDto;
import com.osdoor.aircamp.member.dto.MemberPatchDto;
import com.osdoor.aircamp.member.dto.MemberPostDto;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.helper.email.VerificationEmail;
import com.osdoor.aircamp.member.mapper.MemberMapper;
import com.osdoor.aircamp.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto requestBody) {
        Member member = memberService.createMember(mapper.memberPostDtoToMember(requestBody));

        URI uri = UriComponentsBuilder.newInstance()
                .path("/api/members/" + member.getMemberId())
                .build().toUri();

        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/email-verify")
    @ResponseBody
    public ResponseEntity mailConfirm(@RequestParam("email") String email) throws Exception {
        return new ResponseEntity(new SingleResponseDto<>(memberService.sendVerificationCode(email))
                , HttpStatus.OK);
    }

    @PatchMapping("/{memberId}")
    public ResponseEntity patchMember(@PathVariable @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(requestBody));

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);

    }

    @GetMapping("/{memberId}")
    public ResponseEntity getMember(@PathVariable @Positive long memberId) {
        Member member = memberService.findMember(memberId);

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers() {
        List<Member> members = memberService.findMembers();

        return new ResponseEntity(mapper.memberToMemberResponseDtos(members), HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity deleteMember(@PathVariable @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
