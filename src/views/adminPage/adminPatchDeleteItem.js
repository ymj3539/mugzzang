import * as Api from '/api.js';
const showPathDelItemModule = () => {
  const $adminPage_content = document.getElementById('adminPage_content');
  showAddItemPage();
  const $titleInput = document.getElementById('prod_title');
  const $category_1_value = document.getElementById('category_1_value');
  const $category_2_value = document.getElementById('category_2_value');
  const $manufacturerInput = document.getElementById('manufacturer');
  const $descriptionInput = document.getElementById('description');
  const $priceInput = document.getElementById('price');
  const $imgInput = document.getElementById('img');
  const $searchItemBtn = document.getElementById('searchItemBtn');
  const $shortIdInput = document.getElementById('shortIdInput');
  const $itemModifyBtn = document.getElementById('formModifyBtn');
  const $itemDeleteBtn = document.getElementById('formDeleteBtn');
  const $category_3_value = document.getElementById('category_3_value');

  $searchItemBtn.addEventListener('click', searchItem);
  async function searchItem() {
    const itemData = await Api.get('/api/product/list', $shortIdInput.value);
    return showItemData(itemData);
  }

  function showItemData(itemData) {
    const {prod_title, price, img, category, manufacturer, description} = itemData;
    $titleInput.value = prod_title;
    $priceInput.value = price;
    $imgInput.value = img;
    $category_1_value.innerText = category[0];
    $category_2_value.innerText = category[1];
    $category_3_value.value = category[2];
    $descriptionInput.value = description;
    $manufacturerInput.value = manufacturer;
  }

  $itemModifyBtn.addEventListener('click', modifyItem);
  async function modifyItem(e) {
    e.preventDefault();
    const prod_title = $titleInput.value;
    const price = Number($priceInput.value);
    const img = $imgInput.value;
    const category = [$category_1_value.innerText, $category_2_value.innerText, $category_3_value.value];
    const manufacturer = $manufacturerInput.value;
    const description = $descriptionInput.value;
    try {
      const data = {prod_title, price, img, category, manufacturer, description};
      await Api.patch('/api/product/update', $shortIdInput.value, data);
      alert('상품 수정이 완료되었습니다.');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  $itemDeleteBtn.addEventListener('click', deleteItem);
  async function deleteItem(e) {
    e.preventDefault();
    try {
      await Api.delete('/api/product/delete', $shortIdInput.value);
      alert('상품 삭제가 완료되었습니다.');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  function showAddItemPage() {
    $adminPage_content.insertAdjacentHTML(
      'beforeend',

      `
      <div class='form_container'>
      <h2 class='module_title'>상품 수정/삭제</h2>
      <div class="searchSection">
        <label class="label">상품 아이디</label>
        <div class="control">
          <input class="input is-success" id="shortIdInput" type="text" placeholder="상품 아이디를 입력하시고 검색 버튼을 눌러주세요" />
          <button id="searchItemBtn" class="button is-success">상품 검색</button>
        </div>
      </div>
      <form id='itemForm'>  
        <div class="field">
          <label class="label">상품명</label>
          <div class="control">
            <input class="input is-success" id="prod_title" type="text" value="" />
          </div>
        </div>
        <div class="field">
          <label class="label">가격</label>
          <div class="control">
            <input class="input is-success" id="price"type="text" value="" />
          </div>
        </div>
        <div class="field">
          <label class="label">이미지url</label>
          <div class="control">
            <input class="input is-success" id="img" type="text" value="" />
          </div>
        </div>
        <div class="field">
          <label class="label">카테고리</label>
          <div class='categoryField'>
          <div id="category_1" class="dropdown">
            <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
            <span id='category_1_value'>대분류</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
              <a class="dropdown-item">
               도매
              </a>
              <a class="dropdown-item">
               소매
              </a>
              </div>
            </div>
          </div>
          <div id="category_2" class="dropdown">
            <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
            <span id='category_2_value'>중분류</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
              <a class="dropdown-item">
                채소
              </a>
              <a class="dropdown-item">
                냉동식품
              </a>
              <a class="dropdown-item">
                가공육
              </a>
              <a class="dropdown-item">
                통조림
              </a>
            </div>
          </div>
          </div>
          <div>
            <input id="category_3_value"    class="input" type="text" value="" />
          </div>
         </div
        </div>
        <div class="field">
          <label class="label">제조사</label>
          <div class="control">
            <input id="manufacturer" class="input is-success" type="text" value="" />
          </div>
        </div>
        <div class="field">
          <label class="label">상품 상세 설명</label>
          <div class="control">
            <textarea id="description" class="textarea is-primary"></textarea>
          </div>
        </div>
        <button type="submit" id="formModifyBtn" class="button is-warning">상품 수정</button>
        <button type="submit" id="formDeleteBtn" class="button is-danger">상품 삭제</button>
      </form>
      </div>`
    );
  }

  //드랍다운 함수
  const dropdown = document.querySelectorAll('.dropdown');
  const $category_1 = document.getElementById('category_1');
  const $category_2 = document.getElementById('category_2');
  dropdown.forEach((el) =>
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      el.classList.toggle('is-active');
    })
  );

  $category_1.addEventListener('click', pickCategory);
  $category_2.addEventListener('click', pickCategory);

  function pickCategory(e) {
    if (e.target.className !== 'dropdown-item') return;
    if (e.currentTarget.id === 'category_1') {
      $category_1_value.textContent = e.target.textContent;
      return console.log($category_1_value.innerText);
    }
    if (e.currentTarget.id === 'category_2') {
      return ($category_2_value.textContent = e.target.textContent);
    }
  }
};

export default showPathDelItemModule;
