![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&text=AIRCAMP&height=300&fontSize=90&animation=twinkling)
# 🏕️ AIRCAMP : 캠핑장 예약과 판매를 자유롭게
---
## 캠핑장 예약&판매 웹 서비스 개발 프로젝트<br>
- 개발 기간 : 23.04.28 - 23.05.25
- 프로젝트에 대한 문서는 깃허브 [Wiki](https://github.com/codestates-seb/seb43_main_019/wiki)에 있습니다. 
- 배포링크 : [AIRCAMP](http://aircamp-codestates-019.s3-website.ap-northeast-2.amazonaws.com/)
- 테스트 계정 : 하단 표 참조

|구분|ID|PW|
|:---:|:---:|:---:|
|admin<br>(어드민 권한)|admin@email.com|test1234@A|
|seller<br>(판매자 권한)|seller@email.com|test1234@A|
|testUser<br>(유저 권한)|test@email.com|test1234@A|
<br>

## 서비스 소개

AIRCAMP는 캠핑장을 예약하고 결제할 수 있는 웹 서비스입니다. 

AIRCAMP는 캠핑장을 예약하는 구매자와 캠핑장을 판매 및 등록하는 판매자가 존재합니다.
통합회원가입 후 판매자로 등록을 마치면 캠핑장 상품 등록 및 판매를 할 수 있는 권한이 부여됩니다. 

<br>

## 서비스 기능 요약

- 상세 서비스 메뉴얼은 깃허브 [Wiki](https://github.com/codestates-seb/seb43_main_019/wiki)에 있습니다. 

|기능|설명|진입방법|
| :---: | :--- | :---: |
|회원가입|- 일반 회원 가입<br>: 이메일 인증과정을 거쳐 일반 회원 가입이 가능합니다.<br><br>- 소셜 회원 가입<br>: '카카오 로그인'클릭 시 카카오 계정으로 소셜 회원 가입이 가능합니다.|메인페이지<br>⬇️<br>우측상단 SignUp|
|로그인|- 일반 회원으로 로그인<br>: 일반회원으로 로그인이 가능합니다.<br><br>- 소셜 회원으로 로그인<br>: '카카오 로그인'클릭 시 카카오 계정으로 소셜 로그인이 가능합니다.|메인페이지<br>⬇️<br>우측상단 Login|
|메인<br>페이지|- 등록되어있는 캠핑장의 목록을 조회할 수 있습니다.|메인페이지<br>진입시 노출|
|캠핑장<br>상세검색|- 상단 검색창에 마우스 커서를 위치하면 태그가 나타나고, 이를 클릭하여 해당 태그로 캠핑장 상세검색이 가능합니다.|메인페이지<br>상단 검색창|
|캠핑장<br>상세<br>페이지|- 캠핑장의 대표 이미지를 보여줍니다.<br>- 카카오맵을 통해 캠핑장의 위치를 안내합니다.<br>- 예약하고 싶은 날짜를 선택할 수 있습니다.|메인페이지<br>⬇️<br>원하는 캠핑장<br>카드 클릭|
|예약|- 원하는 날짜를 선택하고 예약하기 버튼을 누릅니다.<br>- 예약자명, 이메일, 연락처를 입력하고 결제하기 버튼을 누릅니다.|캠핑장 상세페이지<br>⬇️<br>날짜선택, 예약하기 클릭<br>⬇️<br>주문자 정보 입력|
|결제|- 카카오페이로 결제하기 버튼을 누르면 카카오페이로 결제가 가능합니다.(개발자 테스트용 지갑으로 결제됩니다.)|예약페이지<br>⬇️<br>주문자 정보 입력, 결제하기 클릭|
|마이<br>페이지|- 개인정보 관리 버튼을 클릭하여 회원정보를 수정할 수 있습니다.<br>- 예약관리 버튼을 클릭하여 본인이 예약한 캠핑장 내역을 확인할 수 있습니다.<br>- 판매자 등록/수정<br>: 사업자번호와 날짜를 입력하면 판매자 계정으로 등록이 가능합니다.<br>판매자 계정 등록을 완료하면 캠핑장 상품을 등록할 수 있습니다. |메인페이지<br>⬇️<br>우측상단 Mypage|
|판매등록|- 판매자로 등록된 계정은 캠핑장 상품 등록이 가능합니다.<br>- 캠핑장의 대표 이미지, 이름, 주소, 위치, 가격, 취소 기한, 수용인원, 소개글을 입력하여 캠핑장을 등록할 수 있습니다.|마이페이지<br>⬇️<br>판매자 등록/수정|
|리뷰|- 캠핑장의 상세페이지에서 리뷰를 작성하고 별점을 등록 할 수 있습니다.<br>- 리뷰 중 내가 작성한 리뷰만 선별하여 볼 수 있습니다. |상품상세페이지 하단|
|AI와 채팅|- AI와 채팅을 할 수 있습니다. |메인페이지 우측하단 상담사 아이콘|
|회원탈퇴|- 회원탈퇴를 할 수 있습니다. <br>- 탈퇴한 아이디(이메일)로는 다시 가입할 수 없습니다.|마이페이지<br>⬇️<br>개인정보관리<br>⬇️<br>회원탈퇴|
|관리자 페이지|- 관리자는 모든 유저의 정보를 조회할 수 있고 회원 삭제가 가능합니다.<br>- 관리자는 모든 상품의 정보를 조회할 수 있고 상품 삭제가 가능합니다. |관리자는 AIRCAMP 사이트 도메인에<br> /admin 을 붙여서 관리자 <br>페이지에 진입 할 수 있습니다.|
|다크모드|- 다크모드 전환 아이콘을 클릭하여 다크모드로 전환 할 수 있습니다.<br>- AIRCAMP 사이트의 기본 설정은 LIGHT 모드 입니다. |메인페이지 좌측상단|

![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&text=OS%20DOOR&height=300&fontSize=90&animation=twinkling)
# 🚪Team OS DOOR<br>
- 안녕하세요 팀 OS DOOR 입니다.
- 팀 규칙에 대한 정보는 깃허브 [Wiki](https://github.com/codestates-seb/seb43_main_019/wiki)에 있습니다. 

| 주재민<br>(FE, FE팀장) | 오준석<br>(FE) | 김정환<br>(FE) | 유한별<br>(BE, BE팀장) | 조현우<br>(BE) | 변상현<br>(BE) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <img alt="주재민" src="https://avatars.githubusercontent.com/u/69967974?v=4" height="100" width="100"> | <img alt="오준석" src="https://avatars.githubusercontent.com/u/84076925?v=4" height="100" width="100"> | <img alt="김정환" src="https://avatars.githubusercontent.com/u/78897615?v=4" height="100" width="100"> | <img alt="유한별" src="https://avatars.githubusercontent.com/u/120434232?v=4" height="100" width="100"> | <img alt="조현우" src="https://avatars.githubusercontent.com/u/108291609?v=4" height="100" width="100"> |<img alt="변상현" src="https://avatars.githubusercontent.com/u/103120984?v=4" height="100" width="100"> |
| [@als982001](https://github.com/als982001) |   [@JS2L](https://github.com/JS2L) | [@wjdghksdigh](https://github.com/wjdghksdigh) | [@exertivestar](https://github.com/exertivestar) | [@mikiehw](https://github.com/mikiehw) |[@SHyeonCoding](https://github.com/SHyeonCoding) |
|<p align="left">- Frontend </p> | <p align="left">- Frontend </p>| <p align="left">- Frontend </p> | <p align="left">- Backend </p> | <p align="left">- Backend </p>| <p align="left">- Backend </p>|

##  기술 스택

### 🔨 Front-end
| Html | JavaScript | React |
| :---: | :---: | :---: |
| <img alt="Html" src ="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/440px-HTML5_logo_and_wordmark.svg.png" width="65" height="65" /> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /></div> |

### ⛏ Back-end
| Java | mySQL | Rest | AWS | Spring | Spring<br>Boot |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/java-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /></div> | <img alt="spring logo" src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" height="50" width="50" > | <img alt="spring-boot logo" src="https://t1.daumcdn.net/cfile/tistory/27034D4F58E660F616" width="65" height="65" > |
<br/>

- Java 11
- Spring FrameWork (Spring Boot, Spring MVC, Spring Security, Spring Data) version 2.7.11
- Gradle
- MySQL 8.0.32
- tomcat 9.0.74
- AWS EC2, RDS, S3
- Git, GitHub Actions

![footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=250&animation=twinkling&section=footer)
