const $itemListFlexbox = document.querySelector('.itemlist_flexbox');
const $category1 = document.querySelector('#category_1');
const $category2 = document.querySelector('#category_2');
let $article = document.querySelectorAll('#itemlist');
// 데이터 불러오기
const res = await fetch('./data.json');
const itemList = await res.json();
const showContent = (index) => {
  for (let i = 0; i < index; i++) {
    const {oid, brand, name, price, img, category} = itemList[i];
    $itemListFlexbox.insertAdjacentHTML(
      'beforeend',
      `<article data-oid=${oid} id="itemlist" class="itemlist">
        <a href="#">
        <div>
          <img src=${img} alt="itemImg" />
          <div>
            <h2>${brand}</h2>
            <h2>${name}</h2>
            <p>${price}</p>
          </div>
        </div>
        </a>
      </article>`
    );
  }
};
showContent(8);
// 스크롤이 일정 부분까지 진행됐을 때 추가할 컨텐츠
const addNewContent = () => {
  console.log('실행');
  let $article = document.querySelectorAll('#itemlist');
  for (let i = 0; i < 4; i++) {
    // 더 추가될 컨텐츠가 없는 경우(false인 경우), for문 break
    if (itemList[$article.length + i]) {
      const {oid, brand, name, price, img} = itemList[$article.length + i];
      $itemListFlexbox.insertAdjacentHTML(
        'beforeend',
        `<article data-oid=${oid} id="itemlist" class="itemlist">
      <a href="#">
      <div>
        <img src=${img} alt="itemImg" />
        <div>
          <h2>${brand}</h2>
          <h2>${name}</h2>
          <p>${price}</p>
        </div>
      </div>
      </a>
    </article>`
      );
    } else break;
  }
};

// intersectionObserver 콜백함수
const ioCallback = (entries, io) => {
  let scrollId;
  $article = document.querySelectorAll('#itemlist');
  const {isIntersecting, target} = entries[0];
  // isIntersecting이 진행중인 경우 observering 해제
  // 더 추가될 컨텐츠가 있는 경우, 마지막 상품 dom모델을 기준으로 observing 시작
  if (isIntersecting) {
    if ($article.length !== itemList.length) {
      scrollId = setTimeout(() => {
        addNewContent();
        observeLastItem(io, $article);
      }, 700);
    }
    io.unobserve(target);
  }
};

const observeLastItem = (io, items) => {
  let lastItem = items[items.length - 1];
  io.observe(lastItem);
};

const io = new IntersectionObserver(ioCallback, {threshold: 0.9});
observeLastItem(io, document.querySelectorAll('#itemlist'));
