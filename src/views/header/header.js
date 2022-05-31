import * as Api from "/api.js";

const navBar = document.getElementById("navbar");
const category1 = document.getElementById("category1");
const category2 = document.getElementById("category2");

addAllElements();
addAllEvents();

async function addAllElements() {
  loginUser();
  creatLogout();
}

function addAllEvents() {
  category1.addEventListener("click", categoryBtn);
  category2.addEventListener("click", categoryBtn);
}

function loginUser() {
  //세션스토리지에 토큰 유무로 nev에 보여야할 옵션 변경(로그인 상태와 비로그인 상태 구분)
  if (!sessionStorage.getItem("token")) {
    navBar.insertAdjacentHTML(
      "beforeend",
      `
        <li class="mainlogo"><a href="/"><span>쇼핑-n팀</span></a></li>
        <li><a href="/itemlist">shop</a></li>
        <li><a href="/login">로그인</a></li>
        <li><a href="/register">회원가입</a></li>
        `
    );
  } else if (sessionStorage.getItem("token")) {
    navBar.insertAdjacentHTML(
      "beforeend",
      `
        <li class="mainlogo"><a href="/"><span>쇼핑-n팀</span></a></li>
        <li><a href="/itemlist">shop</a></li>
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

function categoryBtn(event) {
  if (event.target.innerHTML === "도매") {
    sessionStorage.setItem("chosenCategory", "도매");
  }
  if (event.target.innerHTML === "소매") {
    sessionStorage.setItem("chosenCategory", "소매");
  }
  window.location.href = "/itemlist";
}

// const headerNavbar = {
//     render: () => {
//         const token = sessionStorage.getItem("id")
//         const resUser = await Api.get(
//             `/api/user/userlist/${sessionStorage.getItem("id")}`
//           );
//         return `
//         <ul id="navbar">
//             ${
//                 token && resUser.role === 'basic-user'
//                 ? `<li><a href="/itemlist">shop</a></li>
//                 <li>
//                   <a href="/cart" aria-current="page">
//                     <span class="icon"> <i class="fas fa-cart-shopping"></i> </span
//                     ><span>장바구니</span>
//                   </a>
//                 </li>
//                 <li><a href="/mypage" id="mypageBtn">mypage</a></li>`
//                 :null
//             }
//         </ul>
//         `
//     }
// }

//메인 배너
// var slider = document.querySelector("#slider");
// var slides = slider.querySelector(".slides");
// var slide = slides.querySelectorAll(".slide");
// var leftButton = document.querySelector(".sliderArrowLeft");
// var rightButton = document.querySelector(".sliderArrowRight");

// var currentSlide = 0;

// setInterval(function () {
//   var from = -(1024 * currentSlide);
//   var to = from - 1024;
//   slides.animate(
//     {
//       marginLeft: [from + "px", to + "px"],
//     },
//     {
//       duration: 500,
//       easing: "ease",
//       iterations: 1,
//       fill: "both",
//     }
//   );
//   currentSlide++;
//   if (currentSlide === slide.length - 1) {
//     currentSlide = 0;
//   }
// }, 3000);
