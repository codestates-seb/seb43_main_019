package com.osdoor.aircamp.member.mapper;

import com.osdoor.aircamp.member.dto.MemberPatchDto;
import com.osdoor.aircamp.member.dto.MemberPostDto;
import com.osdoor.aircamp.member.dto.MemberResponseDto;
import com.osdoor.aircamp.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberDto);
    Member memberPatchDtoToMember(MemberPatchDto memberDto);
    MemberResponseDto memberToMemberResponseDto(Member member);
    List<MemberResponseDto> memberToMemberResponseDtos(List<Member> members);
}
