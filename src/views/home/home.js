import * as Api from "/api.js";

// 요소(element), input 혹은 상수
const navBar = document.querySelector("#navbar");
// const logoutBtn = document.querySelector("#logoutBtn"); //로그아웃 버튼

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  loginTrue();
  creatLogout();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  // logoutBtn.addEventListener("click", logout); 로그아웃 이벤트
}

function loginTrue() {
  //세션스토리지에 토큰 유무로 nev에 보여야할 옵션 변경(로그인 상태와 비로그인 상태 구분)
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
        <a href="/cart" aria-current="page">
          <span class="icon"> <i class="fas fa-cart-shopping"></i> </span
          ><span>장바구니</span>
        </a>
      </li>
      <li><a href="/mypage" id="mypageBtn">mypage</a></li>
      `
    );
  }
}

function creatLogout() {
  const logoutbtn = document.createElement("a");
  logoutbtn.innerHTML = "로그아웃";
  logoutbtn.id = "logoutBtn";
  logoutbtn.onclick = function () {
    if (sessionStorage.getItem("token")) {
      sessionStorage.clear();
      alert("로그아웃 하였습니다.");
      window.location.href = "/";
    }
  };
  if (sessionStorage.getItem("id")) {
    navBar.appendChild(logoutbtn);
  }
}

//메인 배너
var slider = document.querySelector("#slider");
var slides = slider.querySelector(".slides");
var slide = slides.querySelectorAll(".slide");
var leftButton = document.querySelector(".sliderArrowLeft");
var rightButton = document.querySelector(".sliderArrowRight");

var currentSlide = 0;

setInterval(function () {
  var from = -(1024 * currentSlide);
  var to = from - 1024;
  slides.animate(
    {
      marginLeft: [from + "px", to + "px"],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  currentSlide++;
  if (currentSlide === slide.length - 1) {
    currentSlide = 0;
  }
}, 3000);
