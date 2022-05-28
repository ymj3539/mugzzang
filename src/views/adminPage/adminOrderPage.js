const $adminPage_content = document.querySelector('#adminPage_content');
const tempData = [
  {
    date: '2022-02-22',
    name: '이솝 핸드크림',
    price: '20,000',
    quantity: '4',
    shortId: 'x26ybshhd',
    button: 'X',
  },
];

showOrderPage();

function showOrderPage() {
  const $table = document.createElement('table');
  const $caption = document.createElement('caption');
  $table.className = 'orderTable';
  $caption.textContent = '주문 조회';
  $adminPage_content.appendChild($table);
  $table.appendChild($caption);
  $table.insertAdjacentHTML(
    'beforeEnd',
    `<thead>
  <tr align="center">
    <td></td>
    <th>결제 일자</th>
    <th>상품명</th>
    <th>가격</th>
    <th>수량</th>
    <th>결제아이디</th>
    <th>주문 취소</th>
  </tr>
</thead>`
  );
  addOrderedItem(tempData, $table);
  addCancelEvent($table);
}

function addOrderedItem(data, addAt) {
  data.forEach((e, i) => {
    addAt.insertAdjacentHTML(
      'beforeend',
      `
        <tbody>
            <tr align="center">
                 <td>${i + 1}</td>
                 <th>${e.date}</th>
                 <th>${e.name}</th>
                 <th>${e.price}원</th>
                 <th>${e.quantity}</th>
                 <th>${e.shortId}</th>
                 <th id='cancelBtn'>X</th>
            </tr>
         </tbody>`
    );
  });
}

function addCancelEvent($table) {
  const $cancelBtn = $table.querySelector('#cancelBtn');
  $cancelBtn.addEventListener('click', cancelEvent);
}

function cancelEvent(e) {
  console.log(e.target);
  // api delete
  // node 삭제 추가 필요
  // alert
}
