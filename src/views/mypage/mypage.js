import * as Api from "/api.js";

// 요소(element), input 혹은 상수
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userAdd = document.getElementById("userAdd");
const userPhonenum = document.getElementById("userPhonenum");
const mypageNav = document.getElementById("mypageNav");

addAllElements();
addAllEvents();

async function addAllElements() {
  mypageInfo();
}

function addAllEvents() {}

//마이페이지 유저 정보 출력
async function mypageInfo() {
  if (!sessionStorage.getItem("id")) {
    alert("로그인한 유저만 사용할 수 있는 서비스입니다.");
    window.location.href = "/login";
  }

  const resUser = await Api.get(
    `/api/user/userlist/${sessionStorage.getItem("id")}`
  );

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
  if (resUser.role === "admin") {
    mypageNav.insertAdjacentHTML(
      "beforeend",
      `
      <a href="/adminPage" class="navlink">관리자</a>
        `
    );
  }
}
