import * as Api from "/api.js";

// 요소(element), input 혹은 상수
const deleteBtn = document.querySelector("#deleteBtn");
const passwordInput = document.querySelector("#passwordInput");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  deleteBtn.addEventListener("click", signout);
}

//계정삭제
async function signout() {
  const password = passwordInput.value;
  const data = { password };

  try {
    if (confirm("정말 삭제하시겠습니까?") == true) {
      await Api.delete(
        "/api/user/userlist",
        sessionStorage.getItem("id"),
        data
      );
      sessionStorage.clear();
      alert("계정이 삭제되었습니다.");
      window.location.href = "/";
    } else {
      return false;
    }
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
