const $content = document.querySelector('#content');
const $flexbox = document.querySelector('.sectionFlex');
let $article = document.querySelectorAll('article');

const addNewContent = () => {
  $flexbox.insertAdjacentHTML(
    'beforeend',
    `
  <article>1</article>
  <article>2</article>
  <article>3</article>
  <article>4</article>`
  );
};

const ioCallback = (entries, io) => {
  const {isIntersecting, target} = entries[0];
  if (isIntersecting) {
    io.unobserve(target);
    setTimeout(() => {
      console.log('hi');
      addNewContent();
      let $article = document.querySelectorAll('article');
      observeLastItem(io, $article);
    }, 2000);
  }
};
const observeLastItem = (io, items) => {
  let lastItem = items[items.length - 1];
  console.log(lastItem);
  io.observe(lastItem);
};
const io = new IntersectionObserver(ioCallback, {threshold: 0.7});
observeLastItem(io, $article);
