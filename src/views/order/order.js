import { addCommas, convertToNumber } from '../useful-functions.js'

const $itemInfo = document.querySelector('.itemInfo');

function getItems() {
  let buyingList = [];
  const cartObject = Object.keys(sessionStorage).filter((e) => e.slice(0, 5) === 'order'); //세션스토리지 하나에 저장할거면 필요없음
  cartObject.forEach((e, i) => {
    buyingList.push(JSON.parse(sessionStorage.getItem(cartObject[i])));
  });
  $itemInfo.insertAdjacentHTML('beforeend', `${buyingList}`);
  console.log(buyingList, );
}
getItems();