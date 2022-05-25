import * as Api from "/api.js";
import { randomId } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const logoutBtn = document.querySelector("#logoutBtn");
const testBtn = document.querySelector("#testBtn"); //테스트 버튼

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  mypageInfo();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutBtn.addEventListener("click", logout);
  testBtn.addEventListener("click", testfun);
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get("/api/user/data");
  const random = randomId();

  console.log({ data });
  console.log({ random });
}

function logout() {
  //로그아웃 버튼 클릭시 세션스토리지 삭제
  if (sessionStorage.getItem("token")) {
    console.log(sessionStorage.getItem("id"));
    sessionStorage.clear();
    alert("로그아웃 하였습니다.");
    window.location.href = "/";
  }
}

async function testfun() {
  //테스트버튼
  const result = await Api.get(`api/userinfo/test2@test2.com`);
  console.log(result);
}

async function mypageInfo() {
  const userName = document.querySelector(".userName");
  const userEmail = document.querySelector(".userEmail");

  const result = await Api.get(`api/userinfo/test@test.com`);

  console.log(result);

  //   userName.innerHTML = "";
  //   userEmail.innerHTML = "";
}
