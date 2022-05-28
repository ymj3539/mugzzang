const showAddItemModule = () => {
  const $adminPage_content = document.getElementById('adminPage_content');
  showAddItemPage();

  const $addItemForm = document.getElementById('addItemForm');

  $addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(new FormData());
  });
  function showAddItemPage() {
    $adminPage_content.insertAdjacentHTML(
      'beforeend',
      `<form id='addItemForm' action="post">
  <div class="field">
    <label class="label">상품명</label>
    <div class="control">
      <input class="input is-success" type="text" placeholder="Text input" value="" />
    </div>
  </div>
  <div class="field">
    <label class="label">가격</label>
    <div class="control">
      <input class="input is-success" type="text" placeholder="Text input" value="" />
    </div>
  </div>
  <div class="field">
    <label class="label">이미지url</label>
    <div class="control">
      <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
    </div>
  </div>
  <div class="field">
    <label class="label">카테고리</label>
    <div class="control">
      <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
    </div>
  </div>
  <div class="field">
    <label class="label">제조사</label>
    <div class="control">
      <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
    </div>
  </div>
  <div class="field">
    <label class="label">상품 설명</label>
    <div class="control">
      <textarea class="textarea is-primary" placeholder="Primary textarea"></textarea>
    </div>
  </div>
  <button type="submit" id="formSubmitBtn" class="button is-link">상품 추가</button>
</form>`
    );
  }
};

export default showAddItemModule;
