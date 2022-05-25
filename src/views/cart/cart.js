//merge할 때 파일 경로 준서님껄로 수정
import {quantityControlBox} from './quantityControlBox.js'; 

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
if(inCartList.length < 1) {
    cartList.innerHTML = `장바구니가 비어 있습니다:(`;
} else {
    let itemList = await getitemList();
    inCartList = inCartList.slice(2).map(x => Object.values(x)).flat();
    console.log(itemList);
    
    inCartList.forEach((cart) => {
        const foundItem = itemList.find(item => {
            if(item.oid == cart.id) {
                let itemName = item.name;
                let itemPrice = item.price;
                let itemImg = item.img;
                return {itemName, itemPrice, itemImg};
            }
        })
        const totalItemPrice = parseInt(foundItem.price) * (cart.quantity) * 1000;

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
    