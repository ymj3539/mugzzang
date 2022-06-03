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
  <tr class='is-selected'>
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
<tr id='showMoreRow'>
        <td>
          <button id='showMoreBtn' class='showMoreBtn is-medium is-ghost button'>더보기</button>
        </td>
      </tr>
</tbody>`
    );
    const $showMoreRow = document.getElementById('showMoreRow');
    addOrderedItem(itemList.slice(0, 20), $showMoreRow);
    // 더보기 클릭 시 20개씩 추가로 상품 띄우기
    const $showMoreBtn = document.getElementById('showMoreBtn');
    $showMoreBtn.addEventListener('click', () => {
      let $tr = document.querySelectorAll('#tRowId');
      console.log($tr.length, $tr.length + 20);
      addOrderedItem(itemList.slice($tr.length, $tr.length + 20));
    });
  }
  function addOrderedItem(data, addAt = document.getElementById('showMoreRow')) {
    data.forEach((e) => {
      let $tr = document.querySelectorAll('#tRowId');
      const {prod_title, manufacturer, price, shortId, category} = e;
      addAt.insertAdjacentHTML(
        'beforebegin',
        `<tr id="tRowId" class='tRowId' data-rowid=${$tr.length} align="center">
                 <td>${$tr.length + 1}</td>
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
  showOrderPage();
};
export default showItemListModule;
