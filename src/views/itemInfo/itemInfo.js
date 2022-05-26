import {quantityControlBox} from './quantityControlBox.js';
const $itemImg = document.querySelector('#itemInfo_img');
const $itemInfoSection = document.querySelector('#itemInfo_section');

async function setData() {
  try {
    const res = await fetch('../itemList/data.json');
    const itemList = await res.json();
    return itemList[0];
  } catch (err) {
    console.error(err);
  }
}

setData()
  .then((res) => {
    const {oid, brand, name, price, img} = res;
    $itemInfoSection.insertAdjacentHTML(
      'beforeend',
      `<picture class="itemInfo_img_container">
      <source />
      <img
        id="itemInfo_img"
        class="itemInfo_img"
        src=${img}
      />
    </picture>
    <article data-id=${oid} id= "itemInfo_information" class="itemInfo_information">
      <h2>
        <p>${name}</p>
        <p>정말 멋진 신발</p>
      </h2>
      <h2>
        <p>${price}원</p>
      </h2>
      <p class="itemInfo_description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sed sint exercitationem maxime fuga velit, corporis voluptatum rem aut consequuntur
        saepe, iste voluptatibus harum iure quo quia. Vel, quo praesentium.
      </p>
      <div class="itemInfo_btn">
        <div class="itemInfo_btn_updown">
          <button id="quantityDown" class="button is-danger is-light">-</button>
          <input id="quantityInput" class="input" type="text" value="1" />
          <button id="quantityUp" class="button is-info is-light">+</button>
        </div>
        <button id='itemInfo_cart'>장바구니</a></button>
        <button id='itemInfo_buyNow'><a href="#">바로구매</a></button>
      </div>
    </article>`
    );
    return document;
  })
  .then((doc) => {
    // 수량 조절 버튼 모듈입니다.
    quantityControlBox(doc);
    return doc;
  })
  .then((document) => {
    const $quantityInput = document.querySelector('#quantityInput').value; // 수량 조절 버튼의 input값 추출
    const $itemInfoInformation = document.querySelector('#itemInfo_information').dataset.id; // 상품의 고유 아이디 추출
    const $itemInfoCart = document.querySelector('#itemInfo_cart'); // 장바구니 버튼
    const $itemInfoBuyNow = document.querySelector('#itemInfo_buyNow'); // 바로구매 버튼
    $itemInfoCart.addEventListener('click', (e) => {
      const $quantityInput = document.querySelector('#quantityInput').value;
      moveItemToCart($quantityInput, $itemInfoInformation, e);
    });
    $itemInfoBuyNow.addEventListener('click', (e) => {
      const $quantityInput = document.querySelector('#quantityInput').value;
      moveItemToCart($quantityInput, $itemInfoInformation, e);
    });
  })
  .catch((err) => console.error(err));

// 세션 스토리지에 장바구니 데이터를 넣는 함수
function moveItemToCart(quantity, id, e) {
  let item = {quantity, id};
  // 같은 상품의 장바구니 데이터가 있는 경우 기존 sessionStorage데이터 삭제 후 다시 넣기
  if (!sessionStorage.getItem(`cart.${id}`)) sessionStorage.setItem(`cart.${id}`, JSON.stringify(item));
  else {
    sessionStorage.removeItem(`cart.${id}`);
    sessionStorage.setItem(`cart.${id}`, JSON.stringify(item));
  }
  // 바로구매 버튼을 누른 경우, 장바구니 페이지로 바로 이동
  if (e.target.textContent === '바로구매') {
    console.log('장바구니 페이지로 이동합니다.');
  }
}
