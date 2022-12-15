function initCarousel() {
  let arrowRightButton = document.querySelector('.carousel__arrow_right');
  let arrowLeftButton = document.querySelector('.carousel__arrow_left');
  let elem = document.querySelector('.carousel__inner');
  if (!elem.dataset.counter) {
    elem.setAttribute('data-counter', 0);
    arrowLeftButton.style.display = 'none'
  }
  function slideOffset(arrowDirection) {
    let slideWidth = document.querySelector('.carousel__slide').offsetWidth * (arrowDirection * Number(elem.dataset.counter) + 1);
    elem.style.transform = 'translateX(' + slideWidth * (-arrowDirection) + 'px)';
    elem.dataset.counter = Number(elem.dataset.counter) + arrowDirection;

    if (Number(elem.dataset.counter) == 3) arrowRightButton.style.display = 'none';
    else arrowRightButton.style.display = '';
    
    if (Number(elem.dataset.counter) == 0) arrowLeftButton.style.display = 'none';
    else arrowLeftButton.style.display = '';
  }
  arrowRightButton.onclick = function () {
    slideOffset(1);
  }
  arrowLeftButton.onclick = function () {
    slideOffset(-1);
  }
}
