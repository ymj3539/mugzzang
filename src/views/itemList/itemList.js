import * as Api from '/api.js';
const $itemSection = document.getElementById('itemlist_section');
const $category1 = document.getElementById('category_1');
const $category2 = document.getElementById('category_2');
let $itemListFlexbox = document.getElementsByClassName('itemlist_flexbox');
let $article;
let flag = null;

// 데이터 불러오기
const itemList = await Api.get('/api/product/list');
showContent(8); // 랜딩했을 때 최초 상품 8개 띄우기

// 각 상품에 해당하는 상품 상세 페이지로 리다이렉션하는 이벤트 추가하기
function locationItemInfo() {
  $itemListFlexbox.addEventListener('click', (e) => {
    let target = e.target;
    if (target.className === 'itemlist_flexbox') return;
    while (!target.classList.contains('itemlist')) {
      target = target.parentNode;
      if (target === 'body') {
        return;
      }
    }
    window.location.href = `http://localhost:8000/itemInfo/?=${target.dataset.oid}`;
  });
}

// 상품 화면에 띄우는 함수
function showContent(index, category) {
  sessionStorag.setItem();
  $article = document.querySelectorAll('#itemlist');
  $itemListFlexbox = document.querySelector('.itemlist_flexbox');
  // 화면에 상품 띄우고 싶은 만큼 data에서 slice하기
  let sliceItem = itemList.slice($article.length, $article.length + index);

  // category값이 true일 경우, category 값으로 data 필터링
  if (category) {
    const categorizingItem = itemList.filter((e) => e.category[0] === category);
    sliceItem = categorizingItem.slice($article.length, $article.length + index);
  }

  // 상품 목록 개수와 추출한 데이터 개수가 일치한다면 이스케이프
  if ($article.length === sliceItem.length) return;
  sliceItem.forEach((e) => {
    const {shortId, manufacturer, prod_title, price, img, category} = e;
    $itemListFlexbox.insertAdjacentHTML(
      'beforeend',
      `<article data-oid=${shortId} data-cg=${category} id="itemlist" class="itemlist">
     <div>
        <img src=${img} alt="itemImg" />
        <div>
          <h2>${manufacturer}</h2>
          <h2>${prod_title}</h2>
          <p>${price}</p>
        </div>
      </div>
      </a>
    </article>`
    );
  });
  locationItemInfo();
}

// 카테고리 버튼 이벤트리스너 콜백함수
const showCategoryItem = (e) => {
  // button 태그의 dataset(category 값과 동일함)을 flag 변수로 이용
  flag = e.target.parentNode.dataset.num;
  // 기존 상품 목록 노드 전부 지우고 재생성
  $itemListFlexbox = document.querySelector('.itemlist_flexbox');
  // console.log($itemListFlexbox);
  // console.log(document.getElementById('itemlist_flexbox'));
  $itemListFlexbox.remove();
  const flexbox = document.createElement('div');
  flexbox.className = 'itemlist_flexbox';
  $itemSection.appendChild(flexbox);

  // 변화한다는 효과를 주기 위해 일단 비동기 처리하였음
  // showContent 함수로 카테고리에 맞는 상품 띄우기
  // 기존 노드가 삭제됨으로서 intersectionObserver가 관찰하고 있는 관찰 대상이 없음. 다시 관찰 대상 추가해주기
  setTimeout(() => {
    showContent(8, flag); // button 태그의 dataset
    observeLastItem(io, document.querySelectorAll('#itemlist'));
  }, 100);
};

// intersectionObserver 콜백함수
const ioCallback = (entries, io) => {
  $article = document.querySelectorAll('#itemlist');
  const {isIntersecting, target} = entries[0];
  if (isIntersecting) {
    io.unobserve(target); // 기존 관찰 대상을 취소해줘야 스크롤 했을 때 콜백함수가 생성됨 관찰 대상이 유지된다면 스크롤 안해도 계속 콜백함수가 실행됨.
    setTimeout(() => {
      // 상품이 추가된다는 느낌을 주고 싶어서 setTimeout 처리하였음
      showContent(4, flag);
      observeLastItem(io, $article);
    }, 700);
  }
};

// 관찰 대상 상품 리스트 마지막 요소로 변경
const observeLastItem = (io, items) => {
  let lastItem = items[items.length - 1];
  io.observe(lastItem);
};

const io = new IntersectionObserver(ioCallback, {threshold: 0.9});
observeLastItem(io, document.querySelectorAll('#itemlist'));
$category1.addEventListener('click', showCategoryItem);
$category2.addEventListener('click', showCategoryItem);

// window.onload = () => {
//   switch (sessionStorage.getItem('chosenCategory')) {

//     default
//     break
//   }
// };
