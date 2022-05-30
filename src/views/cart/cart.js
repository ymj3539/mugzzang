// import {get} from 'express/lib/response';
import {addCommas, convertToNumber} from '../useful-functions.js';
import * as Api from '/api.js';
let $quantityInput = document.getElementById('quantityInput');
const $cartList = document.querySelector('.cartList');
const $cartContainer = document.getElementById('cartContainer');
const $payInfo = document.querySelector('.payInfo');
let totalItemPrice;
let totalItemQuantity = 0;
let totalPrice = 0;
let total = 0;
let delivery = 3000;
let checkEventFlag = false;

//장바구니, 전체 상품 리스트 불러오기
async function getList() {
  try {
    const cartList = [];
    const itemList = await Api.get('/api/product/list'); //전체 상품 목록
    const cartObject = Object.keys(sessionStorage).filter((e) => e.slice(0, 4) === 'cart');
    cartObject.forEach((e, i) => {
      cartList.push(JSON.parse(sessionStorage.getItem(cartObject[i])));
    });
    return [cartList, itemList];
  } catch (err) {
    console.error(err);
    $cartList.innerText = `불러오기에서 무언가 잘못되었습니다! \n${err}`;
  }
}

async function createCartElements() {
  const res = await getList();
  const [incartList, initemList] = res;
  if (incartList.length < 1) return $cartList.insertAdjacentHTML('beforeEnd', `장바구니가 비었습니다:(`);
  //장바구니 목록을 돌면서 전체 상품 중 id 일치하는 제품 가져오기
  incartList.forEach((cart, i) => {
    const foundItem = initemList.find((item) => {
      const {img, price, prod_title} = item;
      if (item.shortId == cart.id) {
        let itemName = prod_title;
        let itemPrice = price;
        let itemImg = img;
        return {itemName, itemPrice, itemImg};
      }
    });
    //상품 수량 및 가격 계산
    totalItemPrice = foundItem.price * convertToNumber(cart.quantity); //제품 별 총 금액
    totalItemQuantity += parseInt(cart.quantity);
    totalPrice += totalItemPrice; //총 상품 금액
    total = totalPrice + 3000; //총 주문금액

    //장바구니 목록
    $cartContainer.insertAdjacentHTML(
      'beforeend',
      `
        <div class="item cartItem" id="item_${i}">
          <label>
            <input type="checkbox" name="buy" value="${i}">
          </label>
          <a href="#">
            <img class="itemInfo" src="${foundItem.img}"/>
          </a>    
          <a href="#">
            <span class="itemInfo">${foundItem.prod_title}</span>
          </a>  
          <div id="controlBox" class="itemInfo_btn_updown itemInfo">
            <button data-quantity=${i} id="quantityDown" class="button is-danger is-light">-</button>
            <input data-quantity=${i} id="quantityInput" class="input" type="text" value="${cart.quantity}" />
            <button data-quantity=${i} id="quantityUp" class="button is-info is-light">+</button>
          </div>
          <span data-priceid=${i} class="itemInfo eachPrice">${foundItem.price}</span>
          <span data-calcprice=${i} class="itemInfo totalItemPrice" id="calcItemPrice">${totalItemPrice}</span>  
          <button class="trash"><i class="fa-solid fa-trash-can"></i></button>           
        </div>`
    );
  });
  $payInfo.insertAdjacentHTML(
    'beforeend',
    `
  <div class="payInfoTitle">결제정보</div>
  <div class="totalPrice">상품 금액 ${totalPrice}원</div>
  <div class="shipping">배송비 ${delivery}원</div>
  <div class="total">총 ${total}원</div>
  <button type="button">주문하기</button>
`
  );
  return document;
}

async function controlQuantityBox() {
  await createCartElements();
  const $cartItems = document.querySelectorAll('.cartItem');
  $cartItems.forEach((e) => e.addEventListener('click', controlCartInfo));
  function controlCartInfo(e) {
    const {quantity} = e.target.dataset;
    const $quantityInput = document.querySelectorAll('#quantityInput');
    const $eachPrice = document.querySelectorAll('.eachPrice');
    const $totalPrice = document.querySelectorAll('.totalItemPrice');
    if (e.target.id !== 'quantityUp' && e.target.id !== 'quantityDown') return;
    if (e.target.id === 'quantityUp') {
      $quantityInput[quantity].value = Number($quantityInput[quantity].value) + 1;
    } else if (e.target.id === 'quantityDown' && $quantityInput[quantity].value > 1) {
      $quantityInput[quantity].value = Number($quantityInput[quantity].value) - 1;
    }
    $totalPrice[quantity].textContent = Number($eachPrice[quantity].textContent) * Number($quantityInput[quantity].value);
    calcTotalPrice($totalPrice);
  }
}

function calcTotalPrice($totalPrice) {
  totalPrice = 0;
  const totalEl = document.querySelector('.total');
  const totalPriceEl = document.querySelector('.totalPrice');
  $totalPrice.forEach((e) => (totalPrice += Number(e.textContent)));
  totalPriceEl.textContent = `상품 금액 ${totalPrice}원`;
  totalEl.textContent = `총 ${totalPrice + delivery}원`;
}

//선택삭제 및 전체삭제 버튼
async function deleteItem() {
  await controlQuantityBox();
  const $cartList = document.getElementById('cartList');
  const $delSomBtn = document.querySelector('.deleteSom');
  const $delAllBtn = document.querySelector('.deleteAll');

  $cartList.addEventListener('click', (e) => {
    const {className} = e.target;
    if (className !== 'trash' && className !== 'deleteAll' && className !== 'deleteSom') return;
    if (className === 'deleteAll') {
      document.querySelectorAll('.item').forEach((item) => item.remove());
    }
  });

  $delAllBtn.addEventListener('click', () => {
    $cartContainer.remove();
    //서버에 데이터 전송
    //전송 성공하면 합계 수량 및 가격 재계산
  });
}
deleteItem();
//   $delSomBtn.addEventListener('click', () => {
//     let checkedBtn = document.querySelectorAll('input[name=buy]:checked');
//     checkedBtn.forEach((item) => {
//       item.parentElement.parentElement.remove();
//     });
//     //서버에 데이터 전송
//     //전송 성공하면 합계 수량 및 가격 재계산
//   });

//서버에 데이터 전송
//전송 성공하면 합계 수량 및 가격 재계산
// });

//   // 장바구니 행 삭제 버튼
//   document.querySelectorAll('.trash').forEach((trashBtn, i) => {
//     trashBtn.className = i;
//     trashBtn.addEventListener('click', (e) => {
//       document.getElementById(`item_${i}`).remove();
//       // document.querySelector(#item.${i}).remove();
//       //합계 수량 및 가격 재계산
//     });
//   });
// });
