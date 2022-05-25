//merge할 때 파일 경로 준서님껄로 수정
import {quantityControlBox} from './quantityControlBox.js'; 
// import {functions} from '../useful-functions';

const cartList = document.querySelector('.cartList');
const payInfo = document.querySelector('.payInfo');

//장바구니 리스트 불러오기
async function getCartList() {
    try {
        const res = await fetch('./tempData_cartList.json');
        const fetchedCartList = await res.json();
        return fetchedCartList;
    } catch(err) {
        cartList.innerText = `장바구니 불러오기에서 무언가 잘못되었습니다: \n${err}`;
    }
}
//제품 목록 리스트 불러오기
async function getitemList() {
    try {
        const res = await fetch('./tempData_itemList.json');
        const fetchedItemList = await res.json();
        return fetchedItemList;
    } catch(err) {
        cartList.innerText = `제품 정보 불러오기에서 무언가 잘못되었습니다: \n${err}`;
    }
}

let inCartList = await getCartList();
let totalItemQuantity = 0;
let totalPrice = 0;   
let total = 0;

if(inCartList.length < 1) {
    cartList.innerHTML = `장바구니가 비어 있습니다:(`;
} else {
    let itemList = await getitemList();
    inCartList = inCartList.slice(2).map(x => Object.values(x)).flat();

    
    
    inCartList.forEach((cart) => {
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

        cartList.innerHTML += `
        <div clas="item">
            <a href="#">
                <img class="itemImage" src="${foundItem.img}"/>
                <span class="itemName">${foundItem.name}</span>
                <span class="itemQuantity">${cart.quantity}</span>
                <span class="itemPrice">${foundItem.price}</span>
                <span class="totalItemPrice">${totalItemPrice}</span>
            </a>
        </div>`
    }) 
}

payInfo.innerHTML += `
    <div><h2>결제정보</h2></div>
    <div>상품 수량 ${totalItemQuantity}</div>
    <div>상품 금액 ${totalPrice}원</div>
    <div>배송비 3,000원</div>
    <div>총 ${total}원</div>
    <button type="button">주문하기</button>
`  
