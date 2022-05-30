import * as Api from '/api.js';

const showOrderedListModule = () => {
  const $adminPage_content = document.querySelector('#adminPage_content');
  async function getData() {
    const orderData = await Api.get('/api/order/orderlist');
    return orderData;
  }

  async function showOrderPage() {
    const orderData = await getData();
    const $table = document.createElement('table');
    const $caption = document.createElement('caption');
    $table.className = 'table';
    $caption.textContent = '주문 조회';
    $adminPage_content.appendChild($table);
    $table.appendChild($caption);
    $table.insertAdjacentHTML(
      'beforeEnd',
      `<thead class='thead'>
  <tr>
    <td>No.</td>
    <th>결제 일자</th>
    <th>유저 아이디</th>
    <th>상품명</th>
    <th>가격</th>
    <th>수량</th>
    <th>결제번호</th>
    <th>주문 취소</th>
  </tr>
</thead>
<tbody id="orderTbody">
</tbody`
    );
    const $orderTbody = document.getElementById('orderTbody');
    addOrderedItem(orderData, $orderTbody);
    addCancelEvent($table);
  }

  showOrderPage();

  function addOrderedItem(data, addAt) {
    data.forEach((e, i) => {
      const {email, productName, productCount, shortId, priceEach, createdAt} = e;
      addAt.insertAdjacentHTML(
        'beforeend',
        `<tr id="tRowId" data-rowid=${i + 1} align="center">
                 <td>${i + 1}</td>
                 <th>${createdAt.slice(0, 10)}</th>
                 <th>${email}</th>
                 <th>${productName}</th>
                 <th>${priceEach}원</th>
                 <th>${productCount}</th>
                 <th>${shortId}</th>
                 <th data-rowid=${i + 1} data-shortid=${shortId} id='cancelBtn'>X</th>
            </tr>`
      );
    });
  }

  function addCancelEvent($table) {
    $table.addEventListener('click', cancelEvent);
  }

  async function cancelEvent(e) {
    let target = e.target;
    if (e.target.id !== 'cancelBtn') return;
    await Api.delete('/api/order/orderlist', target.dataset.shortid);
    target.parentNode.remove();
    alert('주문이 취소되었습니다.');
  }
};

export default showOrderedListModule;
