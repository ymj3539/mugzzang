import * as Api from "/api.js";
import { randomId } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const logoutBtn = document.querySelector("#logoutBtn");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userAdd = document.querySelector("#userAdd");
const userPhonenum = document.querySelector("#userPhonenum");
const infoChangeBtn = document.querySelector("#infoChangeBtn");
const deleteBtn = document.querySelector("#userDelBtn");
const changeBtn = document.querySelector("#ChangeBtn");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  mypageInfo();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutBtn.addEventListener("click", logout);
  infoChangeBtn.addEventListener("click", infoChange);
  deleteBtn.addEventListener("click", userDel);
  changeBtn.addEventListener("click", change);
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

//마이페이지에 쓰일 로그인 유저의 정보 get (세션 스토리지값을 이용)
async function mypageInfo() {
  const resUser = await Api.get(
    `/api/userlist/${sessionStorage.getItem("id")}`
  );
  console.log(resUser);

  userName.innerHTML = `이름: ${resUser.fullName}`;
  userEmail.innerHTML = `이메일: ${resUser.email}`;
  userAdd.innerHTML = `주소: ${resUser.add}`;
  userPhonenum.innerHTML = `전화번호: ${resUser.phoneNum}`;
}

async function infoChange() {
  const resUser = await Api.get(
    `/api/userlist/${sessionStorage.getItem("id")}`
  );

  const newNameInput = document.createElement("input");
  newNameInput.id = "newname";
  newNameInput.value = `${resUser.fullName}`;
  userName.innerHTML = `이름: `;
  userName.appendChild(newNameInput);

  const newEmailInput = document.createElement("input");
  newEmailInput.id = "newemail";
  newEmailInput.value = `${resUser.email}`;
  userEmail.innerHTML = `이메일: `;
  userEmail.appendChild(newEmailInput);

  const newAddInput = document.createElement("input");
  newAddInput.value = `${resUser.add}`;
  userAdd.innerHTML = `주소: `;
  userAdd.appendChild(newAddInput);

  const newPhonenumInput = document.createElement("input");
  newPhonenumInput.value = `${resUser.phoneNum}`;
  userPhonenum.innerHTML = `전화번호: `;
  userPhonenum.appendChild(newPhonenumInput);
}

async function change() {
  const newname = document.querySelector("#newname");
  const newemail = document.querySelector("#newemail");
  const changename = newname.value;
  console.log(newname.value);
  console.log(newemail.value);

  const data = { changename };

  await Api.patch(`/api/userlist`, sessionStorage.getItem("id"), data);
}

async function userDel() {
  const usertoken = sessionStorage.getItem("token");
  const data = { usertoken };
  await Api.delete(`/api/userlist`, sessionStorage.getItem("id"), data);
}
