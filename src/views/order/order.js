import { addCommas } from '../useful-functions.js'

const $itemInfo = document.querySelector('.itemInfo');
const $priceInfo = document.querySelector('.priceInfo');

function getItems() {
  const cartObject = Object.keys(sessionStorage).filter((e) => e.slice(0, 5) === 'order'); 
  const itemPrice = JSON.parse(sessionStorage.getItem('itemPrice'));
  const delivery = JSON.parse(sessionStorage.getItem('delivery'));

  cartObject.forEach((e, i) => {
    const item = JSON.parse(sessionStorage.getItem(cartObject[i]));
    const {title, quantity} = item
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
getItems();

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
