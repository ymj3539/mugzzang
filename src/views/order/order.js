import { addCommas } from '../useful-functions.js'
import * as Api from '/api.js';

const $itemInfo = document.querySelector('.itemInfo');
const $priceInfo = document.querySelector('.priceInfo');
// const userId = JSON.parse(sessionStorage.getItem('id'));
const userId = sessionStorage.getItem('id');

const deliveryName = document.getElementById('nameInput').value;
const deliveryPhone = document.getElementById('phonenumInput').value;
const deliveryZipCode = document.getElementById('zipCodeInput').value;
const deliveryAdd = document.getElementById('addInput').value;
const deliveryDeAdd = document.getElementById('detailedAddInput').value;

function getItems() {
  const cartObject = Object.keys(sessionStorage).filter((e) => e.slice(0, 5) === 'order'); 
  const itemPrice = JSON.parse(sessionStorage.getItem('itemPrice'));
  const delivery = JSON.parse(sessionStorage.getItem('delivery'));

  cartObject.forEach((e, i) => {
    const item = JSON.parse(sessionStorage.getItem(cartObject[i]));
    const {title, quantity, price} = item
    $itemInfo.insertAdjacentHTML('beforeend', `<p>${title} × ${quantity}</p>`);
    // sendDataToDb(title, quantity, price);
  });
  $priceInfo.insertAdjacentHTML('beforeend', 
      `
      <p>상품 금액 ${addCommas(itemPrice)}원</p>
      <p>배송비 ${addCommas(delivery)}원</p>
      <p>총 ${addCommas(itemPrice+delivery)}원</p>
      `
    );
}
getItems();

// function sendDataToDb(title, quantity, price) {
//   const data = {userId, title, quantity, price, { , }
//   };
//   /*
//   {"email":"this@is.com",
//     "productName": "여름용샌달",
//     "productCount": 1,
//     "priceEach": 20000,
//     "delivery" : {"name" : "정형돈",
//                 "phoneNumber" : "01012345678",
//                 "address" : "경기도 고양시"},
//     "productShortId" : "aweawffgreag",
//     "orderId" : "yVoJh-lIUWtwh18I7IAWLaaaaaa"
//   }
//   */
//   await Api.post('/api/order', data);
// }
// sendDataToDb();

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
