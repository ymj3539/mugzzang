import * as Api from '/api.js';
import {quantityControlBox} from './quantityControlBox.js';
const domain = window.location.host;
const $itemInfoSection = document.getElementById('itemInfo_section');
const params = window.location.href.split('?=')[1];

async function setData() {
  try {
    const itemList = await Api.get('/api/product/list', `${params}`);
    return itemList;
  } catch (err) {
    console.error(err);
  }
}

async function createItemInfoElements() {
  try {
    const res = await setData();
    const {shortId, manufacturer, prod_title, price, img, description} = res;
    $itemInfoSection.insertAdjacentHTML(
      'beforeend',
      `<picture class="itemInfo_img_container">
      <source />
      <img
        id="itemInfo_img"
        class="itemInfo_img"
        src='http://${domain}/static/${img}'
      />
    </picture>
    <article data-id=${shortId} id= "itemInfo_information" class="itemInfo_information">
      <h2>
        <p class='item_manufacturer'>${manufacturer}</p>
        <p class='item_title'>${prod_title}</p>
      </h2>
      <h2>
        <p class='item_price'>${Number(price)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
      </h2>
      <p class="itemInfo_description">
        ${description}
      </p>
      <div class="itemInfo_btn">
        <div class="itemInfo_btn_updown" id="updownBtnBox">
         <button id="quantityDown" class="button is-success is-light">-</button>
         <input id="quantityInput" class="input" type="text" value="1" />
         <button id="quantityUp" class="button is-success is-light">+</button>
        </div>
        <div class='itemInfo_cartBuy_Btn'>
          <button class='is-outlined is-success' id='itemInfo_cart'>장바구니</button>
          <button id='itemInfo_buyNow' class='is-success'>바로구매</button>
        </div>
      </div>
    </article>`
    );
    return document;
  } catch (err) {
    console.error(err);
  }
}

async function addquantityControlEvent() {
  const doc = await createItemInfoElements();
  // 수량 조절 버튼 모듈입니다.
  quantityControlBox(document);
  const $itemInfoInformation = document.getElementById('itemInfo_information').dataset.id; // 상품의 고유 아이디 추출
  const $itemInfoCart = document.getElementById('itemInfo_cart'); // 장바구니 버튼
  const $itemInfoBuyNow = document.getElementById('itemInfo_buyNow'); // 바로구매 버튼
  $itemInfoCart.addEventListener('click', (e) => {
    const $quantityInput = document.getElementById('quantityInput').value;
    moveItemToCart($quantityInput, $itemInfoInformation, e); // 수량 조절 버튼의 input값 추출
  });
  $itemInfoBuyNow.addEventListener('click', (e) => {
    const $quantityInput = document.getElementById('quantityInput').value;
    moveItemToCart($quantityInput, $itemInfoInformation, e); // 수량 조절 버튼의 input값 추출
  });
  const $itemInfo_btn = document.querySelectorAll('.itemInfo_btn button');

  $itemInfo_btn.forEach((e) => e.classList.add('button', 'is-large', 'buyCart'));
}

// 세션 스토리지에 장바구니 데이터를 넣는 함수
function moveItemToCart(quantity, id, e) {
  let item = {quantity, id};
  // 같은 상품의 장바구니 데이터가 있는 경우 기존 sessionStorage데이터 삭제 후 다시 넣기
  if (!sessionStorage.getItem(`cart.${id}`)) {
    sessionStorage.setItem(`cart.${id}`, JSON.stringify(item));
  } else {
    sessionStorage.removeItem(`cart.${id}`);
    sessionStorage.setItem(`cart.${id}`, JSON.stringify(item));
  }
  // 바로구매 버튼을 누른 경우, 장바구니 페이지로 바로 이동
  if (e.target.textContent === '바로구매') {
    return (window.location.href = `/cart`);
  }
  alert('장바구니에 추가되었습니다!');
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis a dolore, possimus consequuntur nemo consequatur cum? Eum, eligendi! Soluta voluptatum eveniet enim illum quam ut necessitatibus laboriosam vitae, veniam error, molestiae amet numquam suscipit quia esse eligendi exercitationem et, totam beatae voluptate rem sequi. Quibusdam similique pariatur eius consectetur tenetur!

addquantityControlEvent();
