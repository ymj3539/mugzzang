import * as Api from "/api.js";

// 요소(element), input 혹은 상수

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  mypageInfo();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

//마이페이지에 쓰일 로그인 유저의 정보 get (세션 스토리지값을 이용)
async function mypageInfo() {}
