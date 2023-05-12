package com.osdoor.aircamp.helper.event;

import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@EnableAsync
@Component
public class MemberRegistrationEventListener {

    private final JavaMailSender javaMailSender;
    private final MemberService memberService;

    public MemberRegistrationEventListener(JavaMailSender javaMailSender, MemberService memberService) {
        this.javaMailSender = javaMailSender;
        this.memberService = memberService;
    }

    @Async
    @EventListener
    public void listen(MemberRegistrationEvent event) throws Exception {

        Member member = event.getMember();
        String name = member.getName();
        String email = member.getEmail();
        String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

//        String to = member.getEmail();
//        String subject = "[AirCamp] " + name + " 고객님, " + "AirCamp 회원가입을 환영합니다.";
//        String text = "AirCamp에 회원가입해주셔서 감사합니다. \n 본인인증을 위해서 이메일 인증을 완료해주세요. \n 아래 링크에 접속하면 본인인증이 완료됩니다. \n" +
//                "http://localhost:8080/api/members/verify-email" +"?email=" + email + "&" + "token=" + token;
//
//        emailSender.sendEmail(to, subject, text);

        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, email);// 보내는 대상
        message.setSubject("[AirCamp] " + name + " 고객님, " + "AirCamp 회원가입을 환영합니다.");// 제목

        String msgg = "";
        msgg += "<div style='margin:100px;'>";
        msgg += "<h2> 안녕하세요. <strong>AirCamp</strong> 입니다.</h2>";
        msgg += "<h2> AirCamp 에 가입해 주셔서 감사합니다.</h2>";
        msgg += "<br><p><strong>";
        msgg += name + "(" + email + ")</strong> " + "고객님의 회원가입을 축하드립니다.<p>";
        msgg += "<br>";
        msgg += "<p>회원님의 가입정보는 다음과 같습니다.<p>";
        msgg += "<br>";
        msgg += "<br>";
        msgg += "<hr align='left' width=" + "\"" + "600" + "\"" +  ">";
        msgg += "<h3>가입정보</h3>";
        msgg += "<div>* 아이디(이메일) : <strong>" + email + "</strong></div>";
        msgg += "<div>* 성함 : <strong>" + name + "</strong></div>";
        msgg += "<div>* 가입일 : " + "<strong>" + date + "</strong></div>";
        msgg += "<hr align='left' width=" + "\"" + "600" + "\"" +  ">";
        msgg += "<br>";
        msgg += "<p>앞으로도 많은 관심 부탁드립니다.<p>";

        message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype
        // 보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("hwchokim9511@gmail.com", "AirCamp"));// 보내는 사람

        javaMailSender.send(message);
    }
}
