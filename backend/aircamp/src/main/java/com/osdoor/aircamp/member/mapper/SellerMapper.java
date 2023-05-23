package com.osdoor.aircamp.member.mapper;

import com.osdoor.aircamp.member.dto.MemberResponseDto;
import com.osdoor.aircamp.member.dto.SellerPatchDto;
import com.osdoor.aircamp.member.dto.SellerPostDto;
import com.osdoor.aircamp.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SellerMapper {
    Member sellerPostDtoToMember(SellerPostDto sellerPostDto);
    Member sellerPatchDtoToMember(SellerPatchDto sellerPatchDto);
    MemberResponseDto memberToMemberResponseDto(Member member);
}
