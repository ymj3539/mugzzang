# 쇼핑몰 웹 서비스 프로젝트

복합한 상품 발주 과정으로 인해 어려움을 겪는 소상공인을 위해 구상하였으며,
다양한 식품을 도매,소매로 구분하여 판매하는 쇼핑몰 웹 서비스 프로젝트입니다. <br />

- 서비스 링크 : http://kdt-sw2-seoul-team04.elicecoding.com/

<br>

## 구현한 기능 소개 <br>

### ** : 추가 및 개선 기능입니다.
#### 1. 회원가입, 로그인, 회원정보 수정 <br>
    1.1 email, password 유효성 검증 **
        프론트엔드, 백엔드 정책 통일

    1.2 admin 계정 별도 관리 **
        프론트에서 일반 계정으로 로그인한 사용자는 관리자용 화면을 볼 수 없음 <br>
        -->  어드민경로로 직접 접근시 화면은 보이지만 팝업 에러

    1.3 회원정보 수정 유효성 검증 
        1.1과 동일

    1.4 회원정보 주소 등록 **
        다음 api 를 이용해 우편번호, 주소지를 등록

    1.5 일반 유저에게 관리자 경로 제공x 
        마이페이지에서 일반 유저는 관리자 페이지로 이동하는 경로 삭제

#### 2. [제품 목록 페이지](https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/itemList)  <br>
    2.1 카테고리 클릭 시 해당하는 상품 출력 
    2.2 Intersection Observer를 활용한 무한 스크롤 구현 **

#### 3. [제품 상세 페이지](https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/itemInfo) <br>
    3.1 수량 조절 기능 구현 
    3.2 장바구니 기능 (sessionStorage 활용)

#### 4. [장바구니 페이지](https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/cart)<br>
    4.1 sessionStroage로 장바구니 목록 렌더링

    4.2 수량 조절 및 삭제 기능
        개별 수량 조절 및 개별 삭제, 선택 삭제, 일괄 삭제 기능, 새로고침해도 적용 수량 유지
        -> 이벤트 위임 방식으로 DOM 최적화 **

    4.3 결제금액 0원일 시 주문 불가 및 주문 완료 후 뒤로가기로 장바구니 페이지 접근 시 오류 처리 **

#### 5. [결제 페이지](https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/cart)<br>
    5.1 주소 및 우편번호 검색 기능(Daum 주소 API 사용) **

    5.2 기본 배송지 정보 불러오기 기능 **
        불러오기 버튼 클릭 시 마이페이지에 미리 입력된 배송지 정보 자동입력

    5.2 배송 정보 유효성 검사

    5.3 주문 완료 시 정보 DB로 전송 및 주문완료 페이지 이동
        주문 완료 페이지에서 주문조회 페이지로 이동 가능

#### 6. 유저 주문기록 확인 기능<br>
    6.1 **주문 기록 열람, 취소** 
        로그인 계정의 주문 기록을 상세히 나타냄

#### 7. [어드민 페이지](https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/adminPage)
    7.1 상품 CRUD 기능
        상품 아이디 검색을 통해 특정 상품 수정/삭제가 가능합니다. (주문 조회에서 상품 아이디 확인)
    7.2 주문 조회/취소
    7.3 기능별 모듈로 관리
    7.4 jwt 토큰을 통한 user role 확인

####  백엔드<br>
    8.1 admin required 미들웨어 ** 
        상품등록, 상품정보 수정, 삭제와 장바구니 전체목록 조회, 전체 유저 목록 조회에 관리자 외 접근 차단 
        
    8.2  validator 기능 추가 ** 
        사용자 이메일, 비밀번호에 대해 프론트의 요청 재검증 및 브라우저 외의 불법 경로로 서버접근 차단  
        상품 정보 중 가격에 대해 타입 체크

    8.3 error handler 강화 ** 
        예상 가능한 에러 처리에 대한 기능 강화 

    8.4 path alias로 경로 정리 ** 
        백엔드 경로는 alias 처리 
    
    8.5 **asyncHandler 활용 확대** 
        복잡한 try ~ catch 문 정리 
    
    8.6 **ES6 import export 문법 사용** 
        모듈 호출에 require 대신 최신 문법 적용 
    

## 주요 사용 기술

### 1. 프론트엔드

- **Vanilla javascript**, html, css (**Bulma css**)
- Font-awesome 
- Daum 도로명 주소 api 

### 2. 백엔드 

- **Express**
- Mongodb, Mongoose
- cors
- nginx

### 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에 express로 실행**


### 프로젝트 역할 분담
|이름|역할|구현 기능|
|---|---|---|
|이준서|**L/Frontend**|1. 팀 프로젝트 리딩 <br> <a href='https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/itemList'>2. 제품 목록 페이지</a> <br> <a href='https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/itemInfo'>3. 제품 상세 페이지</a> <br> <a href='https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/adminPage'>4. 어드민 페이지</a>|
| 성경주 | Frontend | |
| 황채림 | Frontend |<a href='https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/home'>1. 메인페이지</a> <br> <a href='https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/cart'>2. 장바구니</a> <br> <a href='https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/order'>3. 결제</a> 및 <a href='https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team4/team4/-/tree/main/src/views/orderComplete'>주문완료</a>|
| 권필주 | Backend | |
| 윤민주 | Backend | |






## 설치 방법

1. **.env 파일 설정 (MONGODB_URL 환경변수를, 개인 로컬 혹은 Atlas 서버 URL로 설정해야 함)**

2. express 실행

```bash
# npm 을 쓰는 경우 
npm install
npm run start

# yarn 을 쓰는 경우
yarn
yarn start
```

<br>

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.

