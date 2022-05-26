// import {quantityControlBox} from '../itemInfo/quantityControlBox';

const $cartList = document.querySelector('.cartList');
const $payInfo = document.querySelector('.payInfo');
let count = 0;
//장바구니 리스트 불러오기
async function getList() {
  try {
    const cartListJson = await fetch('./tempData_cartList.json');
    const itemListJson = await fetch('./tempData_itemList.json');

    const cartList = await cartListJson.json();
    const itemList = await itemListJson.json();
    return [cartList, itemList];
  } catch (err) {
    console.error(err);
    // $cartList.innerText = `장바구니 불러오기에서 무언가 잘못되었습니다: \n${err}`;
    //$cartList.innerText = `제품 정보 불러오기에서 무언가 잘못되었습니다: \n${err}`;
  }
}

getList()
  .then((res) => {
    let [incartList, initemList] = res;
    let totalItemQuantity = 0;
    let totalPrice = 0;
    let total = 0;
    if (incartList.length < 1) {
      $cartList.innerHTML = `장바구니가 비었습니다:(`;
    } else {
      incartList = incartList
        .slice(2)
        .map((x) => Object.values(x))
        .flat();
      count = incartList.length;
      incartList.forEach((cart, i) => {
        const foundItem = initemList.find((item) => {
          if (item.oid == cart.id) {
            let itemName = item.name;
            let itemPrice = item.price;
            let itemImg = item.img;
            return {itemName, itemPrice, itemImg};
          }
        });
        const totalItemPrice = parseInt(foundItem.price) * parseInt(cart.quantity) * 1000;
        totalItemQuantity += parseInt(cart.quantity);
        totalPrice += totalItemPrice;
        total = totalPrice + 3000;

        $cartList.insertAdjacentHTML(
          'beforeend',
          `
          <div class="item">
              <a href="#">
                  <img class="itemInfo" src="${foundItem.img}"/>
              </a>    
              <a href="#">
                  <span class="itemInfo">${foundItem.name}</span>
              </a>  
              <span class="itemInfo">${cart.quantity}</span>
              <div class="itemInfo_btn_updown itemInfo">
                  <button id="QuantityDown" class="button is-danger is-light">-</button>
                  <input id="QuantityInput" class="input" type="number" value="${cart.quantity}" />
                  <button id="QuantityUp" class="button is-info is-light">+</button>
              </div>
              <span class="itemInfo">${foundItem.price}</span>
              <span class="itemInfo">${totalItemPrice}</span>             
          </div>`
        );
      });
    }

    return document;
  })
  .then((document) => {
    const $downButton = document.querySelectorAll('#QuantityDown');
    const $upButton = document.querySelectorAll('#QuantityUp');
    const countItem = (e) => {
      let inputValue = e.target.parentNode.childNodes[3];
      if (e.target.textContent === '+') {
        inputValue.value = Number(inputValue.value) + 1;
      } else if (e.target.textContent === '-' && inputValue.value >= 1) {
        inputValue.value = Number(inputValue) - 1;
      }
    };

    $downButton.forEach((e) => e.addEventListener('click', countItem));
    $upButton.forEach((e) => e.addEventListener('click', countItem));
  });