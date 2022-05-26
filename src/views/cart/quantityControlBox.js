const quantityControlBox = (doc) => {
    const $upButton = doc.querySelector('#quantityUp');
    const $downButton = doc.querySelector('#quantityDown');
    const $quantityInput = doc.querySelector('#quantityInput');
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
  