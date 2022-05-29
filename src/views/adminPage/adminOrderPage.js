import * as Api from '/api.js';

const showOrderedListModule = () => {
  const $adminPage_content = document.querySelector('#adminPage_content');
  async function getData() {
    const tempData = [
      {
        date: '2022-02-22',
        name: '이솝 핸드크림',
        price: '20,000',
        quantity: '4',
        shortId: 'x26ybshhd',
        button: 'X',
      },
      {
        date: '2022-02-22',
        name: '이솝 핸드크림',
        price: '20,000',
        quantity: '4',
        shortId: 'x26ybshhd',
        button: 'X',
      },
      {
        date: '2022-02-22',
        name: '이솝 핸드크림',
        price: '20,000',
        quantity: '4',
        shortId: 'x26ybshhd',
        button: 'X',
      },
    ];
    return tempData;
  }

  async function showOrderPage() {
    const tempData = await getData();
    const $table = document.createElement('table');
    const $caption = document.createElement('caption');
    $table.className = 'table';
    $caption.textContent = '주문 조회';
    $adminPage_content.appendChild($table);
    $table.appendChild($caption);
    $table.insertAdjacentHTML(
      'beforeEnd',
      `<thead>
  <tr>
    <td>No.</td>
    <th>결제 일자</th>
    <th>상품명</th>
    <th>가격</th>
    <th>수량</th>
    <th>결제아이디</th>
    <th>주문 취소</th>
  </tr>
</thead>
<tbody id="orderTbody">
</tbody`
    );
    const $orderTbody = document.getElementById('orderTbody');
    addOrderedItem(tempData, $orderTbody);
    addCancelEvent($table);
  }

  showOrderPage();

  function addOrderedItem(data, addAt) {
    data.forEach((e, i) => {
      addAt.insertAdjacentHTML(
        'beforeend',
        `<tr id="tRowId" data-rowid=${i + 1} align="center">
                 <td>${i + 1}</td>
                 <th>${e.date}</th>
                 <th>${e.name}</th>
                 <th>${e.price}원</th>
                 <th>${e.quantity}</th>
                 <th>${e.shortId}</th>
                 <th data-rowid=${i + 1} id='cancelBtn'>X</th>
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

export default showOrderedListModule;
