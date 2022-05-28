const quantityControlBox = () => {
  const $quantityBox = document.getElementById('updownBtnBox');
  const $quantityInput = document.getElementById('quantityInput');
  $quantityBox.addEventListener('click', controlQuantity);

  function controlQuantity(e) {
    if (!(e.target.id === 'quantityUp' || e.target.id === 'quantityDown')) return;
    if (e.target.id == 'quantityUp') {
      $quantityInput.value = Number($quantityInput.value) + 1;
    } else if (e.target.id == 'quantityDown' && $quantityInput.value != 1) {
      $quantityInput.value = Number($quantityInput.value) - 1;
    }
  }
};

export {quantityControlBox};
