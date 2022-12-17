import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #slides = [];
  #template = '';
  #elem = null;

  constructor(slides) {
    this.#slides = slides;
    this.#render();
    this.#initCarousel();
  }

  #render(){
    this.#template = `<div class="carousel">
                        <div class="carousel__arrow carousel__arrow_right">
                          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                        </div>
                        <div class="carousel__arrow carousel__arrow_left">
                          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
                        </div>
                        <div class="carousel__inner" data-length = ${this.#slides.length}>
                          ${this.#slides.map(slide =>`<div class="carousel__slide" data-id="${slide.id}">
                                                        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                                                        <div class="carousel__caption">
                                                          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                                                          <div class="carousel__title">${slide.name}</div>
                                                          <button type="button" class="carousel__button">
                                                           <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                                                          </button>
                                                        </div>
                                                      </div>
                        
                          `).join('')}
                        </div>
                      </div>`;
    this.#elem = createElement(this.#template);
    this.elem.addEventListener('click', this.#onButtonClick);
  }

  get #arrowRightButton(){
    return this.elem.querySelector('.carousel__arrow_right');
  }

  get #arrowLeftButton(){
    return this.elem.querySelector('.carousel__arrow_left');
  }

  get #carouselInner(){
    return this.elem.querySelector('.carousel__inner');
  }

  get elem(){
    return this.#elem
  }
  
  #slideOffset(arrowDirection) {

     let slideWidth = this.#carouselInner.querySelector('.carousel__slide').offsetWidth * (arrowDirection * Number(this.#carouselInner.dataset.counter) + 1);
     this.#carouselInner.style.transform = 'translateX(' + slideWidth * (-arrowDirection) + 'px)';
     this.#carouselInner.dataset.counter = Number(this.#carouselInner.dataset.counter) + arrowDirection;
     
     if (Number(this.#carouselInner.dataset.counter) == Number(this.#carouselInner.dataset.length)-1) this.#arrowRightButton.style.display = 'none';
     else this.#arrowRightButton.style.display = '';
     
     if (Number(this.#carouselInner.dataset.counter) == 0) this.#arrowLeftButton.style.display = 'none';
     else this.#arrowLeftButton.style.display = '';
   }

  #initCarousel() {

    if (!this.#carouselInner.dataset.counter) {
      this.#carouselInner.setAttribute('data-counter', 0);
      this.#arrowLeftButton.style.display = 'none'
    }
  
    this.#arrowRightButton.onclick = () => {
      this.#slideOffset(1);
    }
    this.#arrowLeftButton.onclick = () => {
      this.#slideOffset(-1);
    }
  }

  #onButtonClick = (event) => {
   
    if(!event.target.closest('button')) return;
    const buttonClickEvent = new CustomEvent('product-add', {
      detail: this.#slides[Number(this.#carouselInner.dataset.counter)].id,
      bubbles: true
    });
    
    this.elem.dispatchEvent(buttonClickEvent);
  }
}


