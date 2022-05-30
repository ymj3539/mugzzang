import showOrderedListModule from './adminOrderPage.js';
import showAddItemModule from './adminAddItem.js';
import showPathDelItemModule from './adminPatchDeleteItem.js';
import showItemListModule from './adminItemList.js';

const $showOrderedListBtn = document.getElementById('showOrderedList');
const $showItemListBtn = document.getElementById('showItemList');
const $showAddItemBtn = document.getElementById('showAddItem');
const $showPatchDelItemBtn = document.getElementById('showPatchDelItem');

$showAddItemBtn.addEventListener('click', setSessionNowPage);
$showOrderedListBtn.addEventListener('click', setSessionNowPage);
$showPatchDelItemBtn.addEventListener('click', setSessionNowPage);
$showItemListBtn.addEventListener('click', setSessionNowPage);

const MODULES = {
  showOrderedList: 'showOrderedList',
  showAddItem: 'showAddItem',
  showPatchDelItem: 'showPatchDelItem',
  showItemList: 'showItemList',
};

function setSessionNowPage(e) {
  const {showAddItem, showItemList, showPatchDelItem, showOrderedList} = MODULES;
  let pageflag = e.target.id;
  if (sessionStorage.getItem('adminPagestate')) {
    sessionStorage.removeItem('adminPagestate'); // 다른 flag값이 있는 경우 삭제하고 다시 추가
    sessionStorage.setItem('adminPagestate', pageflag);
    return window.location.reload();
  }
  sessionStorage.setItem('adminPagestate', pageflag);
  if (pageflag === showOrderedList) return showOrderedListModule();
  else if (pageflag === showAddItem) return showAddItemModule();
  else if (pageflag === showPatchDelItem) return showPathDelItemModule();
  else if (pageflag === showItemList) return showItemListModule();
}

// 새로고침 되었을 때, sessionStorage에 flag변수에 맞게 목록 다시 띄우기
window.onload = () => {
  switch (sessionStorage.getItem('adminPagestate')) {
    case showOrderedList:
      showOrderedListModule();
      break;
    case showAddItem:
      showAddItemModule();
      break;
    case showPatchDelItem:
      showPathDelItemModule();
      break;
    case showItemList:
      showItemListModule();
      break;
    default:
      break;
  }
};
