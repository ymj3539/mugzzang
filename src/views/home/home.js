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
