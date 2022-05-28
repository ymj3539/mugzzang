const quantityControlBox = () => {
  const $upButton = document.getElementById('quantityUp');
  const $downButton = document.getElementById('quantityDown');
  const $quantityInput = document.getElementById('quantityInput');
  $upButton.addEventListener('click', controlQuantity);
  $downButton.addEventListener('click', controlQuantity);

  function controlQuantity(e) {
    if (e.target.id == 'quantityUp') {
      $quantityInput.value = Number($quantityInput.value) + 1;
    } else if (e.target.id == 'quantityDown' && $quantityInput.value != 1) {
      $quantityInput.value = Number($quantityInput.value) - 1;
    }
  }
};

export {quantityControlBox};
