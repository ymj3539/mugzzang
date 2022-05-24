let $itemListFlexbox = document.querySelector('.itemlist_flexbox');
const $itemSection = document.querySelector('#itemlist_section');
const $category1 = document.querySelector('#category_1');
const $category2 = document.querySelector('#category_2');
let $article = document.querySelectorAll('#itemlist');
let flag = null;
// 데이터 불러오기
const res = await fetch('./data.json');
const itemList = await res.json();
const showContent = (index, category) => {
  $article = document.querySelectorAll('#itemlist');
  let $itemListFlexbox = document.querySelector('.itemlist_flexbox');
  let sliceItem = itemList.slice($article.length, $article.length + index);
  if (category) {
    const categorizingItem = itemList.filter((e) => e.category === category);
    sliceItem = categorizingItem;
  }
  if ($article.length === sliceItem.length) return;
  sliceItem.forEach((e) => {
    const {oid, brand, name, price, img, category} = e;
    $itemListFlexbox.insertAdjacentHTML(
      'beforeend',
      `<article data-oid=${oid} data-cg=${category} id="itemlist" class="itemlist">
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
  });
};

const showCategoryItem = (e) => {
  flag = Number(e.target.parentNode.dataset.num);
  $itemListFlexbox = document.querySelector('.itemlist_flexbox');
  $itemListFlexbox.remove();
  const flexbox = document.createElement('div');
  flexbox.className = 'itemlist_flexbox';
  $itemSection.appendChild(flexbox);
  setTimeout(() => {
    showContent(8, flag); // button 태그의 dataset
    observeLastItem(io, document.querySelectorAll('#itemlist'));
    console.log('실행');
  }, 100);
};

showContent(8);

// intersectionObserver 콜백함수
const ioCallback = (entries, io) => {
  console.log('check');
  let scrollId;
  $article = document.querySelectorAll('#itemlist');
  const {isIntersecting, target} = entries[0];
  // isIntersecting이 진행중인 경우 observing 해제
  // 더 추가될 컨텐츠가 있는 경우, 마지막 상품 dom모델을 기준으로 observing 시작
  if (isIntersecting) {
    io.unobserve(target);
    setTimeout(() => {
      showContent(4, flag);
      observeLastItem(io, $article);
    }, 800);
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
