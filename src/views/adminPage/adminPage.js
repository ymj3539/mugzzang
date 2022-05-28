import showOrderedListModule from './adminOrderPage.js';
import showAddItemModule from './adminAddItem.js';
const $showOrderedListBtn = document.getElementById('#showOrderedListBtn');
const $showAddItemBtn = document.getElementById('#showAddItemBtn');

$showAddItemBtn.addEventListener('click', () => {
  if (sessionStorage.getItem('adminPagestate')) {
    sessionStorage.removeItem('adminPagestate'); // 다른 flag값이 있는 경우 삭제하고 다시 추가
    sessionStorage.setItem('adminPagestate', 'addItem');
    return window.location.reload();
  }
  sessionStorage.setItem('adminPagestate', 'addItem');
  showAddItemModule();
});

$showOrderedListBtn.addEventListener('click', () => {
  // 같은 버튼 두 번 누를 경우, 새로고침
  if (sessionStorage.getItem('adminPagestate')) {
    sessionStorage.removeItem('adminPagestate');
    sessionStorage.setItem('adminPagestate', 'orderedList');
    return window.location.reload();
  }
  sessionStorage.setItem('adminPagestate', 'orderedList');
  showOrderedListModule();
});

// 새로고침 되었을 때, sessionStorage에 flag변수에 맞게 목록 다시 띄우기
window.onload = () => {
  console.log();
  switch (sessionStorage.getItem('adminPagestate')) {
    case 'orderedList':
      showOrderedListModule();
      break;
    case 'addItem':
      showAddItemModule();
      console.log('hi');
      break;
    default:
      break;
  }
};
