package com.osdoor.aircamp.reservation.service;

import com.osdoor.aircamp.auth.utils.AuthorizationUtils;
import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.service.MemberService;
import com.osdoor.aircamp.product.entity.Product;
import com.osdoor.aircamp.product.service.ProductService;
import com.osdoor.aircamp.reservation.dto.ReservationDto;
import com.osdoor.aircamp.reservation.dto.ReservationExistenceDto;
import com.osdoor.aircamp.reservation.dto.ReservationPostDto;
import com.osdoor.aircamp.reservation.mapper.ReservationMapper;
import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.entity.ReservationStatus;
import com.osdoor.aircamp.reservation.repository.ReservationRepository;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class ReservationService {
    private final MemberService memberService;
    private final ReservationRepository reservationRepository;
    private final ProductService productService;
    private final AuthorizationUtils authorizationUtils;
    private final ReservationMapper reservationMapper;

    public ReservationService(MemberService memberService,
                              ReservationRepository reservationRepository,
                              ProductService productService,
                              AuthorizationUtils authorizationUtils,
                              ReservationMapper reservationMapper) {
        this.memberService = memberService;
        this.reservationRepository = reservationRepository;
        this.productService = productService;
        this.authorizationUtils = authorizationUtils;
        this.reservationMapper = reservationMapper;
    }

    // 새로운 예약을 생성
    public Reservation createReservation(ReservationPostDto reservationPostDto) {
        Member member = memberService.findMember(reservationPostDto.getMemberId());
        Product product = productService.findProduct(reservationPostDto.getProductId());

        // 기존에 동일한 productId와 reservationDate를 가진 예약이 있는지 조회
        Optional<Reservation> existingReservationOpt = reservationRepository.findReservationByProductProductIdAndReservationDate(
                reservationPostDto.getProductId(),
                reservationPostDto.getReservationDate());

        if (existingReservationOpt.isPresent()) {
            // 기존 예약이 존재하면 version 값을 증가
            Reservation existingReservation = existingReservationOpt.get();
            existingReservation.setVersion(existingReservation.getVersion() + 1);
            reservationRepository.save(existingReservation);
        }

        Reservation reservation = reservationMapper.reservationPostDtoToReservation(reservationPostDto);
        reservation.setMember(member);
        reservation.setProduct(product);

        // 새로운 예약을 저장
        Reservation savedReservation;
        try {
            savedReservation = reservationRepository.save(reservation);
        } catch (ObjectOptimisticLockingFailureException e) {
            throw new OptimisticLockingFailureException("예약 생성 중 경합 상황 발생");
        }

        return savedReservation;
    }

    // 중복된 예약이 있는지 확인
    public boolean isDuplicateReservation(ReservationPostDto reservationPostDto) {
        // 중복 예약으로 간주되는 ReservationStatus 리스트
        List<ReservationStatus> statusList = Arrays.asList(
                // 예약이 진행중이거나 완료되었다면, 중복 예약의 첫 번째 조건으로 간주함
                ReservationStatus.RESERVATION_IN_PROGRESS,
                ReservationStatus.RESERVATION_COMPLETE);

        // productId, reservationDate 가 일치하며 예약이 진행중이거나 완료되었다면, Optional 객체에 담음
        Optional<Reservation> reservationOptional =
                reservationRepository.findByProductProductIdAndReservationDateAndReservationStatusIn(
                        reservationPostDto.getProductId(), reservationPostDto.getReservationDate(), statusList);

        // reservationOptional 객체의 값이 존재하면 중복 예약으로 간주함
        return reservationOptional.isPresent();
    }

    public Reservation updateReservation(Reservation reservation) {
        Reservation findReservation = findVerifiedReservation(reservation.getReservationId());
        authorizationUtils.verifyAuthorizedMember(findReservation.getMember().getEmail());

        Optional.ofNullable(reservation.getReservationStatus())
                .ifPresent(reservationStatus -> findReservation.setReservationStatus(reservationStatus));
        return reservationRepository.save(findReservation);
    }

    public Reservation findReservation(long reservationId) {
        Reservation findReservation = findVerifiedReservation(reservationId);
        authorizationUtils.verifyAuthorizedMember(findReservation.getMember().getEmail());

        return findReservation;
    }

    public Page<Reservation> findReservations(int page, int size) {
        return reservationRepository.findAll(PageRequest.of(page, size,
                Sort.by("reservationId").descending()));
    }

    public void cancelReservation(long reservationId) {
        Reservation findReservation = findVerifiedReservation(reservationId);
        authorizationUtils.verifyAuthorizedMember(findReservation.getMember().getEmail());

        int step = findReservation.getReservationStatus().getStepNumber();

        // ReservationStatus의 step이 3인 경우(RESERVATION_CANCEL)에는 예약 취소가 되지 않도록한다.
        if (step == 3) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CANCEL_RESERVATION);
        }
        findReservation.setReservationStatus(ReservationStatus.RESERVATION_CANCEL);
        reservationRepository.save(findReservation);
    }

    private Reservation findVerifiedReservation(long reservationId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        Reservation findReservation =
                optionalReservation.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND));
        return findReservation;
    }

    private void verifyReservation(Reservation reservation) {
        // 회원이 존재하는지 확인
        memberService.findVerifiedMember(reservation.getMember().getMemberId());

        // 상품이 존재하는지 확인
        productService.findVerifiedProduct(reservation.getProduct().getProductId());
    }

    private Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void completeReservation(Long reservationId) {
        Reservation reservation = findReservation(reservationId);
        reservation.setReservationStatus(ReservationStatus.RESERVATION_COMPLETE);
    }

    private void updateUsageCount(Reservation reservation) {
        Member member = memberService.findMember(reservation.getMember().getMemberId());
        int usageCount = member.getUsageCount() + 1;

        member.setUsageCount(usageCount);

        memberService.updateMember(member);
    }

    @Transactional(readOnly = true)
    public Reservation verifyPaymentStatus(long reservationId) {
        Reservation reservation = findVerifiedReservation(reservationId);
        if (reservation.getPaymentStatus().getCode() > 1) { // 1=결제전, 2=결제완료, 3=결제취소
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_PAY);
        }
        return reservation;
    }

    public List<ReservationDto> getReservationsByMemberId(Long memberId) {
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations.stream()
                .filter(reservation -> reservation.getMember().getMemberId().equals(memberId))
                .map(ReservationDto::fromEntity)
                .collect(Collectors.toList());
    }

    //
    public boolean checkReservationExistence(ReservationExistenceDto existenceDto) {
        List<ReservationStatus> statusList = Arrays.asList(
                ReservationStatus.RESERVATION_IN_PROGRESS,
                ReservationStatus.RESERVATION_COMPLETE);

        return reservationRepository.findByProductProductIdAndReservationDateAndReservationStatusIn(
                existenceDto.getProductId(),
                existenceDto.getReservationDate(),
                statusList).isPresent();
    }
}

