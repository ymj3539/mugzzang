import * as Api from "/api.js";

// 요소(element), input 혹은 상수
const orderlistContainer = document.getElementById("orderlist-container");

addAllElements();

async function addAllElements() {
  mypageInfo();
}

async function mypageInfo() {
  if (!sessionStorage.getItem("id")) {
    alert("로그인한 유저만 사용할 수 있는 서비스입니다.");
    window.location.href = "/login";
  }
  const table = document.createElement("div");
  table.id = "orderInfo";
  orderlistContainer.appendChild(table);

  const res = await Api.get(`/api/order/${sessionStorage.getItem("id")}`);
  console.log(res);

  res.map((el) =>
    table.insertAdjacentHTML(
      "beforeend",
      `
  <div class="orderlist-standard">
      <span>${el.createdAt.substr(0, 10)}</span>
      <span>${el.productName}</span>
      <span>${el.productCount}</span>
      <span>${el.priceEach}</span>
      <span>상품 준비중</span>
      <span><button id='delBtn' data-shortid=${
        el.shortId
      }>주문 취소</button></span>
    </div>`
    )
  );

  async function cancelEvent(e) {
    let target = e.target;
    if (e.target.id !== "delBtn") return;
    await Api.delete("/api/order/orderlist", target.dataset.shortid);
    target.parentNode.parentNode.remove();
    alert("주문이 취소되었습니다.");
  }
  table.addEventListener("click", cancelEvent);
}
