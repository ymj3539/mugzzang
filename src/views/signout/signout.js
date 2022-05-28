import * as Api from "/api.js";
import { randomId } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const logoutBtn = document.querySelector("#logoutBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const passwordInput = document.querySelector("#passwordInput");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutBtn.addEventListener("click", logout);
  deleteBtn.addEventListener("click", signout);
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

async function signout() {
  //   e.preventDefault();
  const password = passwordInput.value;
  const data = { password };

  if (confirm("정말 삭제하시겠습니까?") == true) {
    await Api.delete("/api/userlist", sessionStorage.getItem("id"), data);
    sessionStorage.clear();
    alert("계정이 삭제되었습니다.");
    window.location.href = "/";
  } else {
    return false;
  }
}
