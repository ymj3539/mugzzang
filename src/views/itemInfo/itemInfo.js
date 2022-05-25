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
    <article class="itemInfo_information">
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
        <button><a href="#">장바구니</a></button>
        <button><a href="#">바로구매</a></button>
      </div>
    </article>`
    );
    return document;
  })
  .then((doc) => {
    quantityControlBox(doc);
  })
  .catch((err) => console.error(err));
