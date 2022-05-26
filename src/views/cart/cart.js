const $cartList = document.querySelector('.cartList');
const $payInfo = document.querySelector('.payInfo');

//장바구니 리스트 불러오기
async function getcartList() {
    try {
        const res = await fetch('./tempData_cartList.json');
        const fetchedcartList = await res.json();
        return fetchedcartList;
    } catch(err) {
        $cartList.innerText = `장바구니 불러오기에서 무언가 잘못되었습니다: \n${err}`;
    }
}
//제품 목록 리스트 불러오기
async function getitemList() {
    try {
        const res = await fetch('./tempData_itemList.json');
        const fetchedItemList = await res.json();
        return fetchedItemList;
    } catch(err) {
        $cartList.innerText = `제품 정보 불러오기에서 무언가 잘못되었습니다: \n${err}`;
    }
}

let incartList = await getcartList();
let totalItemQuantity = 0;
let totalPrice = 0;   
let total = 0;

if(incartList.length < 1) {
    $cartList.innerHTML = `장바구니가 비었습니다:(`;
} else {
    let itemList = await getitemList();
    incartList = incartList.slice(2).map(x => Object.values(x)).flat();
    incartList.forEach((cart, i) => {
        const foundItem = itemList.find(item => {
            if(item.oid == cart.id) {
                let itemName = item.name;
                let itemPrice = item.price;
                let itemImg = item.img;
                return {itemName, itemPrice, itemImg};
            }
        })
        const totalItemPrice = parseInt(foundItem.price) * parseInt(cart.quantity) * 1000;
        totalItemQuantity += parseInt(cart.quantity);
        totalPrice += totalItemPrice;
        total = totalPrice + 3000;

        $cartList.insertAdjacentHTML('beforeend', `
        <div class="item">
            <a href="#">
                <img class="itemInfo" src="${foundItem.img}"/>
            </a>    
            <a href="#">
                <span class="itemInfo">${foundItem.name}</span>
            </a>  
            <span class="itemInfo">${cart.quantity}</span>
            <div class="itemInfo_btn_updown itemInfo">
                <button id="${i}stQuantityDown" class="button is-danger is-light">-</button>
                <input id="${i}stQuantityInput" class="input" type="text" value="${cart.quantity}" />
                <button id="${i}stQuantityUp" class="button is-info is-light">+</button>
            </div>
            <span class="itemInfo">${foundItem.price}</span>
            <span class="itemInfo">${totalItemPrice}</span>
            
        </div>`);
    });   
}

$payInfo.insertAdjacentHTML('beforeend', `
    <div><h2>결제정보</h2></div>
    <div>상품 수량 ${totalItemQuantity}</div>
    <div>상품 금액 ${totalPrice}원</div>
    <div>배송비 3,000원</div>
    <div>총 ${total}원</div>
    <button type="button">주문하기</button>
`);

if (document.readyState !== 'loading') {
    console.log('document is already ready');
    testfunc();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready yet');
        testfunc();
    });
}
function testfunc() {
    const quantityInput = document.querySelector('#0stQuantityInput').value;
    console.log(quantityInput);
};

// function quantityControlButton(i) {
//     const $upButton = document.querySelector(`#${i}stQuantityUp`);
//     console.log($upButton);
//     const $downButton = document.querySelector(`#${i}stQuantityDown`);
//     const $quantityInput = document.querySelector(`#${i}stQuantityInput`);
//     $upButton.addEventListener('click', controlQuantity);
//     $downButton.addEventListener('click', controlQuantity);
  
//     function controlQuantity(e) {
//       if (e.target.id == 'quantityUp') {
//         $quantityInput.value = Number($quantityInput.value) + 1;
//       } else if (e.target.id == 'quantityDown' && $quantityInput.value != 1) {
//         $quantityInput.value = Number($quantityInput.value) - 1;
//       }
//     }
//     return $quantityInput;
// }