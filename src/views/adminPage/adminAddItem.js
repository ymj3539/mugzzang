import * as Api from '/api.js';

const showAddItemModule = () => {
  const $adminPage_content = document.getElementById('adminPage_content');
  showAddItemPage();
  const $addItemForm = document.getElementById('itemForm');
  const $titleInput = document.getElementById('prod_title');
  const $category_1_value = document.getElementById('category_1_value');
  const $category_2_value = document.getElementById('category_2_value');
  const $category_3_value = document.getElementById('category_3_value');
  const $manufacturerInput = document.getElementById('manufacturer');
  const $descriptionInput = document.getElementById('description');
  const $priceInput = document.getElementById('price');
  const $imgInput = document.getElementById('img');
  const $fileUpload = document.getElementById('fileUpload');
  const $uploadImageBtn = document.querySelector('.uploadImageBtn');

  $addItemForm.addEventListener('submit', postItem);
  async function postItem(e) {
    e.preventDefault();
    const prod_title = $titleInput.value;
    const price = Number($priceInput.value);
    const img = $imgInput.value;
    const category = [$category_1_value.innerText, $category_2_value.innerText, $category_3_value.value];
    const manufacturer = $manufacturerInput.value;
    const description = $descriptionInput.value;
    try {
      let imgData = new FormData();
      imgData.append('image', $fileUpload.files[0]);
      let uploadedImage = await Api.formPost('/api/product/upload', imgData);
      let imageName = uploadedImage.result;
      const data = {prod_title, price, img, category, manufacturer, description, imageName};
      await Api.post('/api/product/', data);
      alert('상품 등록이 완료되었습니다.');
      window.location.reload();
      console.log('check');
    } catch (err) {
      console.error(err);
    }
  }

  function showAddItemPage() {
    $adminPage_content.insertAdjacentHTML(
      'beforeend',
      `
      <div class='form_container'>
      <h2 class='module_title'>상품 등록</h2>
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
          <div class="control input-container">
            <input class="input is-success" id="img" type="text" value="" />
            <button type='button' class='button uploadImageBtn'>사진 업로드</button>
            <input style='display:none' class='input' type='file' id='fileUpload' value='파일 선택'/>
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
              <input id="category_3_value" class="input" type="text" value="" />
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
        <button type="submit" id="formSubmitBtn" class="button is-link">상품 등록</button>
      </form>
      </div>
      `
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

  // 사진 업로드 이벤트 (버튼 클릭 시 > 인풋 click이벤트 발생)
  $uploadImageBtn.addEventListener('click', () => {
    $fileUpload.click();
  });
  $fileUpload.addEventListener('change', () => {
    $imgInput.value = $fileUpload.files[0].name;
  });
};
export default showAddItemModule;
