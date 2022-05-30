import * as Api from "/api.js";

// 요소(element), input 혹은 상수

// const logoutBtn = document.querySelector("#logoutBtn"); //로그아웃 버튼

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  // logoutBtn.addEventListener("click", logout); 로그아웃 이벤트
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
