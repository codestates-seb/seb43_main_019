package com.osdoor.aircamp.reservation.service;

import com.osdoor.aircamp.auth.utils.AuthorizationUtils;
import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.service.MemberService;
import com.osdoor.aircamp.product.service.ProductService;
import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.entity.ReservationStatus;
import com.osdoor.aircamp.reservation.repository.ReservationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class ReservationService {
    private final MemberService memberService;
    private final ReservationRepository reservationRepository;
    private final ProductService productService;
    private final AuthorizationUtils authorizationUtils;

    public ReservationService(MemberService memberService,
                              ReservationRepository reservationRepository,
                              ProductService productService, AuthorizationUtils authorizationUtils) {
        this.memberService = memberService;
        this.reservationRepository = reservationRepository;
        this.productService = productService;
        this.authorizationUtils = authorizationUtils;
    }

    public Reservation createReservation(Reservation reservation) {
        verifyReservation(reservation);
        Reservation savedReservation = saveReservation(reservation);

        return savedReservation;
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

        // ReservationStatus의 step이 4인 경우(RESERVATION_CANCEL)에는 예약 취소가 되지 않도록한다.
        if (step == 4) {
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
}

