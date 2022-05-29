import * as Api from '/api.js';

const showAddItemModule = () => {
  const $adminPage_content = document.getElementById('adminPage_content');
  showAddItemPage();
  const $addItemForm = document.getElementById('addItemForm');
  const $titleInput = document.getElementById('prod_title');
  const $additionalInput = document.getElementById('title_additional');
  const $category_1_value = document.getElementById('category_1_value');
  const $category_2_value = document.getElementById('category_2_value');
  const $manufacturerInput = document.getElementById('manufacturer');
  const $descriptionInput = document.getElementById('description');
  const $priceInput = document.getElementById('price');
  const $imgInput = document.getElementById('img');

  $addItemForm.addEventListener('submit', postItem);
  async function postItem(e) {
    e.preventDefault();
    const prod_title = $titleInput.value;
    const title_additional = $additionalInput.value;
    const price = Number($priceInput.value);
    const img = $imgInput.value;
    const category = [$category_1_value.innerText, $category_2_value.innerText];
    const manufacturer = $manufacturerInput.value;
    const description = $descriptionInput.value;
    try {
      const data = {prod_title, title_additional, price, img, category, manufacturer, description};
      console.log(data);
      await Api.post('/api/product/upload', data);
      console.log('check');
    } catch (err) {
      console.error(err);
    }
  }

  function showAddItemPage() {
    $adminPage_content.insertAdjacentHTML(
      'beforeend',
      `<form id='addItemForm'>
        <div class="field">
        <label class="label">상품명</label>
        <div class="control">
          <input class="input is-success" id="prod_title" type="text" value="" />
        </div>
        </div>
        <div class="field">
        <label class="label">상품 한 줄 소개</label>
          <div class="control">
            <input class="input is-success" id="title_additional" type="text" value="" />
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
                밀키트
              </a>
              <a class="dropdown-item">
                가공육
              </a>
              <a class="dropdown-item">
                중분류3
              </a>
              <a class="dropdown-item">
                중분류4
              </a>
              </div>
            </div>
          </div>
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
        <button type="submit" id="formSubmitBtn" class="button is-link">상품 추가</button>
      </form>`
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
export default showAddItemModule;
