import * as Api from "/api.js";

//회원정보 input 모음
const nameInput = document.querySelector("#nameInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const postalCode = document.querySelector("#postalNumber");
const address1 = document.querySelector("#addInput1");
const address2 = document.querySelector("#addInput2");
const phonenumInput = document.querySelector("#phonenumInput");
//현재 비밀번호 확인 input
const currentPw = document.querySelector("#currentPassword");
//정보수정 관련 버튼
const infoChangeBtn = document.querySelector("#infoChangeBtn");
const findAddressBtn = document.querySelector("#findAddress");

addAllElements();
addAllEvents();

async function addAllElements() {
  securityInfo();
}

function addAllEvents() {
  infoChangeBtn.addEventListener("click", changSubmit);
  findAddressBtn.addEventListener("click", addressFind);
}

//회원정보 수정페이지 접속시 이전에 있던 정보 가져오기
async function securityInfo() {
  if (!sessionStorage.getItem("id")) {
    alert("로그인한 유저만 사용할 수 있는 서비스입니다.");
    window.location.href = "/login";
  }

  const resUser = await Api.get(
    `/api/user/userlist/${sessionStorage.getItem("id")}`
  );
  console.log(resUser);

  nameInput.value = `${resUser.fullName}`;

  if (resUser.address === undefined) {
    postalCode.value = "";
  } else {
    postalCode.value = `${resUser.address.postalCode}`;
    address1.value = `${resUser.address.address1}`;
    address2.value = `${resUser.address.address2}`;
  }

  if (resUser.phoneNumber === undefined) {
    phonenumInput.value = "";
  } else {
    phonenumInput.value = `${resUser.phoneNumber}`;
  }
}

//유저정보 patch기능
async function changSubmit(e) {
  e.preventDefault();

  const resUser = await Api.get(
    `/api/user/userlist/${sessionStorage.getItem("id")}`
  );
  const email = resUser.email;

  const fullName = nameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const address = {
    postalCode: postalCode.value,
    address1: address1.value,
    address2: address2.value,
  };
  const phoneNumber = phonenumInput.value;
  const currentPassword = currentPw.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = password.length >= 4;
  const isPasswordValidlength = password.length <= 10;
  const isPasswordSame = password === passwordConfirm;

  if (fullName) {
    if (!isFullNameValid) {
      return alert("이름은 2글자 이상이어야 합니다.");
    }
  }

  if (password) {
    if (!isPasswordValid || !isPasswordValidlength) {
      return alert("비밀번호는 4글자 이상, 10글자 이하이어야 합니다.");
    }
    if (!isPasswordSame) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
  }

  try {
    const data = {
      fullName,
      email,
      password,
      address,
      phoneNumber,
      currentPassword,
    };

    await Api.patch(
      `/api/user/userlist`,
      `${sessionStorage.getItem("id")}`,
      data
    );

    alert(`정상적으로 수정이 되었습니다.`);

    // 마이 페이지 이동
    window.location.href = "/mypage";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

//주소 입력 기능
function addressFind() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우
        addr = data.jibunAddress;
      }
      document.getElementById("postalNumber").value = data.zonecode;
      document.getElementById("addInput1").value = addr;

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        document.getElementById("addInput1").value += extraAddr;
      } else {
        document.getElementById("addInput1").value += "";
      }
      document.getElementById("addInput2").focus();
    },
  }).open();
}
