import { addCommas, convertToNumber } from '../useful-functions.js'
import * as Api from '/api.js';
let items = [];
let prodId = [];

const $itemInfo = document.querySelector('.itemInfo');
const $priceInfo = document.querySelector('.priceInfo');
const $orderBtn = document.querySelector('.ordering');

const userEmail = sessionStorage.getItem('id');

function getItems() {
  const cartObject = Object.keys(sessionStorage).filter((e) => e.slice(0, 5) === 'order'); 
  const itemPrice = JSON.parse(sessionStorage.getItem('itemPrice'));
  const delivery = JSON.parse(sessionStorage.getItem('delivery'));

  cartObject.forEach((key, i) => {
    prodId[i] = key.slice(6);
    items[i] = JSON.parse(sessionStorage.getItem(cartObject[i]));
    const {title, quantity, price} = items[i]; 
    $itemInfo.insertAdjacentHTML('beforeend', `<p>${title} × ${quantity}</p>`);
  });
  $priceInfo.insertAdjacentHTML('beforeend', 
      `
      <p>상품 금액 ${addCommas(itemPrice)}원</p>
      <p>배송비 ${addCommas(delivery)}원</p>
      <p>총 ${addCommas(itemPrice+delivery)}원</p>
      `
    );
}

async function sendDataToDb() {
  const deliveryName = document.getElementById('nameInput').value;
  const deliveryPhone = document.getElementById('phonenumInput').value;
  const deliveryZipCode = document.getElementById('zipCodeInput').value;
  const deliveryAdd = document.getElementById('addInput').value;
  const deliveryDeAdd = document.getElementById('detailedAddInput').value;

  const deliveryAddFull = `(${deliveryZipCode}) ${deliveryAdd} ${deliveryDeAdd}`;
  const deliveryInfo = { name: deliveryName, phoneNumber: deliveryPhone, address: deliveryAddFull };

  for (let i = 0; i < items.length; i++ ) {
    const {title, quantity, price} = items[i];
    let numPrice= convertToNumber(price);
    let productId = prodId[i];
    const orderId = `${Date.now()}_${userEmail}`
    const data = {"email": userEmail, "productName": title, "productCount": quantity, "priceEach": numPrice, "delivery": deliveryInfo, "productShortId": productId, "orderId": orderId };

    try {
      let res = await Api.post('/api/order/', data);
      alert('주문이 완료되었습니다. 메인 페이지로 돌아갑니다.');
      console.log(res);
      // location.href = '../home/home.html';
    } catch (error) {
      console.log(error);
    }; 
  }
}

getItems();
$orderBtn.addEventListener('click', sendDataToDb);

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
