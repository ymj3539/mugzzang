const showAddItemModule = () => {
  const $adminPage_content = document.querySelector('#adminPage_content');

  showAddItemPage();
  function showAddItemPage() {
    $adminPage_content.insertAdjacentHTML(
      'beforeend',
      `<form action="">
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
  <button class="button is-link">상품 추가</button>
</form>`
    );
  }
};

export default showAddItemModule;
