const slider = document.querySelector('.slider');
const slides = slider.querySelector('.slides');
const slide = slides.querySelectorAll('.slide');
const $leftBtn = document.querySelector('.left');
const $rightBtn = document.querySelector('.right');
console.log(`slider: ${slider}, slides: ${slides}`);

let currentSlide = 0;
function autoSlide() {
  const from = -(1280 * currentSlide);
  const to = from - 1280;
  slides.animate({
      marginLeft: [from + "px", to + "px"]
  }, {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both"
  });
  currentSlide++;
  if (currentSlide === (slide.length - 1)) {
    currentSlide = 0;
  }
}
setInterval(autoSlide, 5000);

$leftBtn.addEventListener('click', () => {

});
$rightBtn.addEventListener('click', () => {

});