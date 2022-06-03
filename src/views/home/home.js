const $categoryBig = document.getElementById('categoryBig');
const $categorySmall = document.getElementById('categorySmall');
$categoryBig.addEventListener('click', categoryBtn);
$categorySmall.addEventListener('click', categoryBtn);

function categoryBtn(e) {
  if (e.target.id === 'categoryBig') {
    sessionStorage.setItem('chosenCategory', '도매');
  }
  if (e.target.id === 'categorySmall') {
    sessionStorage.setItem('chosenCategory', '소매');
  }
  window.location.href = '/itemlist';
}
