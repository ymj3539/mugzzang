import * as Api from "/api.js";

const deleteBtn = document.querySelector("#deleteBtn");
const passwordInput = document.querySelector("#passwordInput");

addAllElements();
addAllEvents();

async function addAllElements() {
  loginConfirm();
}

function addAllEvents() {
  deleteBtn.addEventListener("click", signout);
}

function loginConfirm() {
  if (!sessionStorage.getItem("id")) {
    alert("로그인한 유저만 사용할 수 있는 서비스입니다.");
    window.location.href = "/login";
  }
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
