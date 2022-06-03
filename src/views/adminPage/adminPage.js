import showOrderedListModule from './adminOrderPage.js';
import showAddItemModule from './adminAddItem.js';
import showPathDelItemModule from './adminPatchDeleteItem.js';
import showItemListModule from './adminItemList.js';
import * as Api from '/api.js';

async function checkUserRole() {
  try {
    const check = await Api.get('/api/user/userlist', sessionStorage.getItem('id'));
    // 일반 유저가 로그인한 상태에서 어드민 페이지 접속
    if (check.role !== 'admin') {
      alert('어드민 계정이 아닙니다.');
      window.location.href('/');
    }
  } catch (err) {
    if (err) {
      // 로그인 안하고 바로 들어갔을 때.
      alert('어드민 계정이 아닙니다.');
      window.location.href = '/';
    }
  }
}
checkUserRole();

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
const {showOrderedList, showAddItem, showPatchDelItem, showItemList} = MODULES;

function setSessionNowPage(e) {
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

// css
const $asideBtn = document.querySelectorAll('.menu_container button');
$asideBtn.forEach((e) => e.classList.add('is-white'));

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
