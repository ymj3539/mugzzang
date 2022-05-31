import * as Api from "/api.js";
const $itemSection = document.getElementById("itemlist_section");
const $categoryContainer = document.getElementById("categorySection");
let $itemListFlexbox = document.getElementsByClassName("itemlist_flexbox");
let $article;
let CategoryFlag = null;

// 데이터 불러오기
const itemList = await Api.get("/api/product/list");
showContent(8); // 랜딩했을 때 최초 상품 8개 띄우기

// 각 상품에 해당하는 상품 상세 페이지로 리다이렉션하는 이벤트 추가하기
function locationItemInfo() {
  $itemListFlexbox.addEventListener("click", (e) => {
    let target = e.target;
    if (target.className === "itemlist_flexbox") return;
    while (!target.classList.contains("itemlist")) {
      target = target.parentNode;
      if (target === "body") {
        return;
      }
    }
    window.location.href = `http://localhost:8000/itemInfo/?=${target.dataset.oid}`;
  });
}

// 상품 화면에 띄우는 함수
async function showContent(index, category) {
  console.log("쇼컨텐츠");
  sessionStorage.setItem(`chosenCategory`, JSON.stringify("도매"));
  const selectedList = itemList.filter((e) => e.category[0] === "도매");
  $article = document.querySelectorAll("#itemlist");
  $itemListFlexbox = document.querySelector(".itemlist_flexbox");
  // 화면에 상품 띄우고 싶은 만큼 data에서 slice하기
  let sliceItem = selectedList.slice($article.length, $article.length + index);

  // category값이 true일 경우, category 값으로 data 필터링
  if (category) {
    const categorizingItem = itemList.filter((e) => e.category[1] === category);
    sliceItem = categorizingItem.slice(
      $article.length,
      $article.length + index
    );
  }

  // 상품 목록 개수와 추출한 데이터 개수가 일치한다면 이스케이프
  if ($article.length === sliceItem.length) return;
  sliceItem.forEach((e) => {
    const { shortId, manufacturer, prod_title, price, img, category } = e;
    $itemListFlexbox.insertAdjacentHTML(
      "beforeend",
      `<article data-oid=${shortId} data-cg=${category[1]} id="itemlist" class="itemlist">
     <div>
        <img src=${img} alt="itemImg" />
        <div>
          <p class='manufacturer'>${manufacturer}</p>
          <p class='prod_title'>${prod_title}</h2>
          <p class='price'>${price}</p>
        </div>
      </div>
      </a>
    </article>`
    );
  });
  locationItemInfo();
}

// 카테고리 버튼 이벤트리스너 콜백함수
const showCategoryItem = async (e) => {
  if (!e.target.classList.contains("category")) return;
  // button 태그의 dataset(category 값과 동일함)을 flag 변수로 이용
  CategoryFlag = e.target.dataset.num;
  // 기존 상품 목록 노드 전부 지우고 재생성
  $itemListFlexbox = document.querySelector(".itemlist_flexbox");
  // console.log($itemListFlexbox);
  // console.log(document.getElementById('itemlist_flexbox'));
  $itemListFlexbox.remove();
  const flexbox = document.createElement("div");
  flexbox.className = "itemlist_flexbox";
  $itemSection.appendChild(flexbox);
  // 변화한다는 효과를 주기 위해 일단 비동기 처리하였음
  // showContent 함수로 카테고리에 맞는 상품 띄우기
  // 기존 노드가 삭제됨으로서 intersectionObserver가 관찰하고 있는 관찰 대상이 없음. 다시 관찰 대상 추가해주기
  setTimeout(() => {
    showContent(8, CategoryFlag); // button 태그의 dataset
    observeLastItem(io, document.querySelectorAll("#itemlist"));
  }, 50);
};

// intersectionObserver 콜백함수
function ioCallback(entries, io) {
  $article = document.querySelectorAll("#itemlist");
  const { isIntersecting, target } = entries[0];
  if (isIntersecting) {
    io.unobserve(target); // 기존 관찰 대상을 취소해줘야 스크롤 했을 때 콜백함수가 생성됨 관찰 대상이 유지된다면 스크롤 안해도 계속 콜백함수가 실행됨.
    setTimeout(() => {
      // 비동기 처리
      showContent(4, CategoryFlag);
      observeLastItem(io, $article);
    }, 700);
  }
}

// 관찰 대상 상품 리스트 마지막 요소로 변경
function observeLastItem(io, items) {
  console.log("옵저버라스트");
  let lastItem = items[items.length - 1];
  io.observe(lastItem);
}
const io = new IntersectionObserver(ioCallback, { threshold: 0.9 });
observeLastItem(io, document.querySelectorAll("#itemlist"));
$categoryContainer.addEventListener("click", showCategoryItem);

// css
const $buttons = document.querySelectorAll("#categorySection button");
$buttons.forEach((e) =>
  e.classList.add("category", "button", "is-large", "is-success", "is-light")
);
