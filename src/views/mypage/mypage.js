import * as Api from "/api.js";

// 요소(element), input 혹은 상수
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userAdd = document.querySelector("#userAdd");
const userPhonenum = document.querySelector("#userPhonenum");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  mypageInfo();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

//마이페이지에 쓰일 로그인 유저의 정보 get (세션 스토리지값을 이용)
async function mypageInfo() {
  if (!sessionStorage.getItem("id")) {
    alert("로그인한 유저만 사용할 수 있는 서비스입니다.");
    window.location.href = "/login";
  }
  // if (sessionStorage.getItem("token")) 토큰 값을 이용해 admin 파악하는법 찾고 admin 페이지로 가는 버튼 만들기
  const resUser = await Api.get(
    `/api/user/userlist/${sessionStorage.getItem("id")}`
  );
  console.log(resUser);

  userName.innerHTML = `이름: ${resUser.fullName}`;
  userEmail.innerHTML = `이메일: ${resUser.email}`;

  if (resUser.address === undefined || resUser.address.address1 === "") {
    userAdd.innerHTML = `주소: 주소를 등록해주세요`;
  } else {
    userAdd.innerHTML = `주소: ${resUser.address.address1} ${resUser.address.address2}`;
  }

  if (resUser.phoneNumber === undefined) {
    userPhonenum.innerHTML = `전화번호: 전화번호를 등록해주세요`;
  } else {
    userPhonenum.innerHTML = `전화번호: ${resUser.phoneNumber}`;
  }
}
