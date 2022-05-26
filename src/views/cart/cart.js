const $cartList = document.querySelector('.cartList');
const $payInfo = document.querySelector('.payInfo');
let count = 0;

//장바구니, 전체 상품 리스트 불러오기
async function getList() {
  try {
    const cartListJson = await fetch('./tempData_cartList.json'); //장바구니 목록
    const itemListJson = await fetch('./tempData_itemList.json'); //전체 상품 목록

    const cartList = await cartListJson.json();
    const itemList = await itemListJson.json();
    return [cartList, itemList];
  } catch (err) {
    console.error(err);
    $cartList.innerText = `불러오기에서 무언가 잘못되었습니다! \n${err}`;
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
      incartList = incartList //token, id값 빼고 cart값만 가져오기
        .slice(2)
        .map((x) => Object.values(x))
        .flat();

      count = incartList.length;

      //장바구니 목록을 돌면서 전체 상품 중 id 일치하는 제품 가져오기
      incartList.forEach((cart, i) => {
        const foundItem = initemList.find((item) => { 
          if (item.oid == cart.id) {
            let itemName = item.name;
            let itemPrice = item.price;
            let itemImg = item.img;
            return {itemName, itemPrice, itemImg};
          }
        });
        //
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

// $payInfo.insertAdjacentHTML(
//   'beforeend',
//   `
//     <div><h2>결제정보</h2></div>
//     <div>상품 수량 ${totalItemQuantity}</div>
//     <div>상품 금액 ${totalPrice}원</div>
//     <div>배송비 3,000원</div>
//     <div>총 ${total}원</div>
//     <button type="button">주문하기</button>
// `
// );

// if (document.readyState !== 'loading') {
//   console.log('document is already ready');
//   testfunc();
// } else {
//   document.addEventListener('DOMContentLoaded', function () {
//     console.log('document was not ready yet');
//     testfunc();
//   });
// }
// function testfunc() {
//   const quantityInput = document.querySelector('#0stQuantityInput').value;
//   console.log(quantityInput);
// }

// function quantityControlButton(i) {
// const $upButton = document.querySelector(`#${i}stQuantityUp`);
// console.log($upButton);
// const $downButton = document.querySelector(`#${i}stQuantityDown`);
// const $quantityInput = document.querySelector(`#${i}stQuantityInput`);
// $upButton.addEventListener('click', controlQuantity);
// $downButton.addEventListener('click', controlQuantity);

//     function controlQuantity(e) {
//       if (e.target.id == 'quantityUp') {
//         $quantityInput.value = Number($quantityInput.value) + 1;
//       } else if (e.target.id == 'quantityDown' && $quantityInput.value != 1) {
//         $quantityInput.value = Number($quantityInput.value) - 1;
//       }
//     }
//     return $quantityInput;
// }
