//메인 배너
var slider = document.querySelector("#slider");
var slides = slider.querySelector(".slides");
var slide = slides.querySelectorAll(".slide");
var leftButton = document.querySelector('.sliderArrowLeft');
var rightButton = document.querySelector('.sliderArrowRight');

var currentSlide = 0;

setInterval(function() {
    var from = -(1024 * currentSlide);
    var to = from - 1024;
    slides.animate({
        marginLeft: [from + "px", to + "px"]
    }, {
        duration: 500,
        easing: "ease",
        iterations: 1,
        fill: "both"
    });
    currentSlide++;
    if (currentSlide === (slide.length-1)) {
        currentSlide = 0;
    }
}, 3000);

// leftButton.onclick = () => {
//     var nowSlide = document.querySelector("#photo .slide.active");
//     var previousSlide = nowSlide.previousElementSibling;
//     if (previousSlide === null) {
//         previousSlide = nowSlide.parentElement.lastElementChild;
//     }
//     nowSlide.animate({
//         opacity: [1, 0]
//     }, {
//         duration: 500,
//         easing: "ease",
//         iterations : 1,
//         fill: "both",
//     })
//     nowSlide.classList.remove("active");
//     previousSlide.animate({
//          opacity: [1, 0]
//     }, {
//         duration: 500,
//         easing: "ease",
//         iterations: 1,
//         fill: "both"
//     })
//     previousSlide.classList.add("active");
// }
// }