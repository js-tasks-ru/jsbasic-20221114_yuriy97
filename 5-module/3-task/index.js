function initCarousel() {
  let arrowRightButton = document.querySelector('.carousel__arrow_right');
  let arrowLeftButton = document.querySelector('.carousel__arrow_left');
  let elem = document.querySelector('.carousel__inner');
  if (!elem.dataset.counter) {
    elem.setAttribute('data-counter',0);
    arrowLeftButton.style.display = 'none'
  }

  arrowRightButton.onclick = function(){
    let slideWidth = document.querySelector('.carousel__slide').offsetWidth * (Number(elem.dataset.counter) + 1);
    elem.style.transform = 'translateX(-'+ slideWidth + 'px)';
    elem.dataset.counter = Number(elem.dataset.counter) + 1;
    if (Number(elem.dataset.counter) == 3) arrowRightButton.style.display = 'none';
    if (Number(elem.dataset.counter) > 0 && arrowLeftButton.style.display == 'none' ) arrowLeftButton.style.display = '';
  }
  arrowLeftButton.onclick = function(){
    
    let slideWidth = document.querySelector('.carousel__slide').offsetWidth * ((1-elem.dataset.counter));
    elem.style.transform = 'translateX('+ slideWidth + 'px)';
    elem.dataset.counter = Number(elem.dataset.counter) - 1;
    if (Number(elem.dataset.counter) == 0) arrowLeftButton.style.display = 'none';
    if (Number(elem.dataset.counter) < 3 && arrowRightButton.style.display == 'none' ) arrowRightButton.style.display = '';
  }
}
