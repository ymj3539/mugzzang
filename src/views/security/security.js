import * as Api from '/api.js';
import {randomId} from '/useful-functions.js';

// 요소(element), input 혹은 상수
const logoutBtn = document.querySelector('#logoutBtn');

const nameInput = document.querySelector('#nameInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const addInput = document.querySelector('#addInput');
const phonenumInput = document.querySelector('#phonenumInput');

const infoChangeBtn = document.querySelector('#infoChangeBtn');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  securityInfo();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutBtn.addEventListener('click', logout);
  infoChangeBtn.addEventListener('click', changSubmit);
}

function logout() {
  //로그아웃 버튼 클릭시 세션스토리지 삭제
  if (sessionStorage.getItem('token')) {
    console.log(sessionStorage.getItem('id'));
    sessionStorage.clear();
    alert('로그아웃 하였습니다.');
    window.location.href = '/';
  }
}

//마이페이지에 쓰일 로그인 유저의 정보 get (세션 스토리지값을 이용)
async function securityInfo() {
  const resUser = await Api.get(`/api/userlist/${sessionStorage.getItem('id')}`);
  console.log("resUser:", resUser);

  nameInput.value = `${resUser.fullName}`;

  if (resUser.add === undefined) {
    addInput.value = '';
  } else {
    addInput.value = `${resUser.add}`;
  }
  if (resUser.phoneNum === undefined) {
    phonenumInput.value = '';
  } else {
    phonenumInput.value = `${resUser.phoneNum}`;
  }
}

async function changSubmit(e) {
  e.preventDefault();

  const resUser = await Api.get(`/api/userlist/${sessionStorage.getItem('id')}`);
  const email = resUser.email;

  const fullName = nameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const add = addInput.value;
  const phonenum = phonenumInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }
  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  try {
    const data = {fullName, email, password, add, phonenum};

    await Api.patch(`/api/users`, `${sessionStorage.getItem('id')}`, data);

    alert(`정상적으로 수정이 되었습니다.`);

    // 마이 페이지 이동
    window.location.href = '/mypage';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
