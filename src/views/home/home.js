const slider = document.querySelector('.slider');
const slides = slider.querySelector('.slides');
const slide = slides.querySelectorAll('.slide');
const $leftBtn = document.querySelector('.left');
const $rightBtn = document.querySelector('.right');
console.log(`slider: ${slider}, slides: ${slides}`);

let currentSlide = 0;
function autoSlide() {
  const from = -(100 * currentSlide);
  const to = from - 100;
  slides.animate({
      marginLeft: [from + "vw", to + "vw"]
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

const $categoryBig = document.getElementById("categoryBig");
const $categorySmall = document.getElementById("categorySmall");
$categoryBig.addEventListener("click", categoryBtn);
$categorySmall.addEventListener("click", categoryBtn);

function categoryBtn(e) {
  console.log(e.target);
  if (e.target.innerHTML === "도매") {
    sessionStorage.setItem("chosenCategory", "도매");
  }
  if (e.target.innerHTML === "소매") {
    sessionStorage.setItem("chosenCategory", "소매");
  }
  window.location.href = "/itemlist";
}
