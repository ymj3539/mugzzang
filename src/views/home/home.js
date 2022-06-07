const $whole = document.getElementById('wholePeople');
const $retail = document.getElementById('retailPeople');
$whole.addEventListener('click', categoryBtn);
$retail.addEventListener('click', categoryBtn);

function categoryBtn(e) {
  console.log(e.target);
  if (e.target.id === 'wholePeople') {
    sessionStorage.setItem('chosenCategory', '도매');
  }
  if (e.target.id === 'retailPeople') {
    sessionStorage.setItem('chosenCategory', '소매');
  }
  window.location.href = '/itemlist';
}
