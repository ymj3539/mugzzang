// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "/api.js";
import { randomId } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const landingDiv = document.querySelector("#landingDiv");
const greetingDiv = document.querySelector("#greetingDiv");
const navBar = document.querySelector("#navbar");
const logoutBtn = document.querySelector("#logoutBtn");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertTextToLanding();
  insertTextToGreeting();
  loginTrue();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  landingDiv.addEventListener("click", alertLandingText);
  greetingDiv.addEventListener("click", alertGreetingText);
  logoutBtn.addEventListener("click", logout);
}

function insertTextToLanding() {
  landingDiv.insertAdjacentHTML(
    "beforeend",
    `
      <h2>n팀 쇼핑몰의 랜딩 페이지입니다. 자바스크립트 파일에서 삽입되었습니다.</h2>
    `
  );
}

function insertTextToGreeting() {
  greetingDiv.insertAdjacentHTML(
    "beforeend",
    `
      <h1>반갑습니다! 자바스크립트 파일에서 삽입되었습니다.</h1>
    `
  );
}

function alertLandingText() {
  alert("n팀 쇼핑몰입니다. 안녕하세요.");
}

function alertGreetingText() {
  alert("n팀 쇼핑몰에 오신 것을 환영합니다");
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get("/api/user/data");
  const random = randomId();

  console.log({ data });
  console.log({ random });
}

//내가 작업 한 부분 시작
function logout() {
  //로그아웃 버튼 클릭시 세션스토리지 삭제
  console.log(sessionStorage.getItem("id"));
  sessionStorage.clear();
  alert("로그아웃 하였습니다.");
  window.location.href = "/";
}

function loginTrue() {
  //세션스토리지에 토큰 유무로 로그인 상태와 비로그인 상태 구분
  if (!sessionStorage.getItem("token")) {
    navBar.insertAdjacentHTML(
      "afterbegin",
      `
        <li><a href="/login">로그인</a></li>
        <li><a href="/register">회원가입</a></li>
      `
    );
  } else if (sessionStorage.getItem("token")) {
    navBar.insertAdjacentHTML(
      "afterbegin",
      `
      <li>
        <a href="#cart" aria-current="page">
          <span class="icon">
            <i class="fas fa-cart-shopping"></i>
          </span>
          <span>카트</span>
        </a>
      </li>
      <li><a id="logoutBtn" >로그아웃</a></li>
      `
    );
  }
}

//내가 작업 한 부분 끝
