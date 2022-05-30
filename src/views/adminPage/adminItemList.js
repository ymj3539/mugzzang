import * as Api from '/api.js';

const showItemListModule = () => {
  const $adminPage_content = document.querySelector('#adminPage_content');
  async function getData() {
    const itemList = await Api.get('/api/product/list');
    return itemList;
  }

  async function showOrderPage() {
    const itemList = await getData();
    const $table = document.createElement('table');
    const $caption = document.createElement('caption');
    $table.className = 'table';
    $caption.textContent = '상품 조회';
    $adminPage_content.appendChild($table);
    $table.appendChild($caption);
    $table.insertAdjacentHTML(
      'beforeEnd',
      `<thead class='thead'>
  <tr>
    <td>No.</td>
    <th>상품명</th>
    <th>제조자</th>
    <th>가격</th>
    <th>대분류</th>
    <th>중분류</th>
    <th>상품아이디</th>
  </tr>
</thead>
<tbody id="orderTbody">
</tbody`
    );
    const $orderTbody = document.getElementById('orderTbody');
    addOrderedItem(itemList, $orderTbody);
    addCancelEvent($table);
  }

  showOrderPage();

  function addOrderedItem(data, addAt) {
    data.forEach((e, i) => {
      const {prod_title, manufacturer, price, shortId, category} = e;
      addAt.insertAdjacentHTML(
        'beforeend',
        `<tr id="tRowId" data-rowid=${i + 1} align="center">
                 <td>${i + 1}</td>
                 <th>${prod_title}</th>
                 <th>${manufacturer}</th>
                 <th>${price}원</th>
                 <th>${category[0]}</th>
                 <th>${category[1]}</th>
                 <th>${shortId}</th>
            </tr>`
      );
    });
  }

  function addCancelEvent($table) {
    $table.addEventListener('click', cancelEvent);
  }

  function cancelEvent(e) {
    let target = e.target;
    if (e.target.id !== 'cancelBtn') return;
    target.parentNode.remove();
    // api delete
    // alert 추가
  }
};

export default showItemListModule;
