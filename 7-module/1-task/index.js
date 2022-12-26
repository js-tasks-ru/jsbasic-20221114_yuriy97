import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #categories = [];
  #template = '';
  #elem;

  constructor(categories) {
    this.#categories = categories;
    this.#render();
  }

  #render(){
    this.#template = `<div class="ribbon">  
                        <button class="ribbon__arrow ribbon__arrow_left">
                          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                        </button>
                        <nav class="ribbon__inner" data-length = ${this.#categories.length}>
                          ${this.#categories.map((item,index) =>`<a href="#" class="ribbon__item ${index == 0 ? `ribbon__item_active"` :`"`} data-id="${item.id}">${item.name}</a>                                                                          
                          `).join('')}
                        </nav>   
                        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
                          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                        </button>
                      </div>`;
    this.#elem = createElement(this.#template);
    this.#elem.addEventListener('click', this.#onButtonClick);
    this.#ribbonInner.addEventListener('scroll',this.#ribbonScrollBy);
  }

  get elem(){
    return this.#elem;
  }

  get #arrowRightButton(){
    return this.elem.querySelector('.ribbon__arrow_right');
  }

  get #arrowLeftButton(){
    return this.elem.querySelector('.ribbon__arrow_left');
  }

  get #ribbonInner(){
    return this.#elem.querySelector('.ribbon__inner');
  }


  #onButtonClick = (event) => {
   
    if(event.target.closest('button') == this.#arrowRightButton){
      this.#ribbonInner.scrollBy(350,0);
    }
    if(event.target.closest('button') == this.#arrowLeftButton){
      this.#ribbonInner.scrollBy(-350,0);
    }
    if(event.target.closest('.ribbon__item')){
      event.preventDefault();
      
      this.#elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
      event.target.closest('.ribbon__item').classList.add('ribbon__item_active');

      const ribbonClickEvent = new CustomEvent('ribbon-select', {
        detail: event.target.closest('.ribbon__item').dataset.id,
        bubbles: true
      });
      
      this.elem.dispatchEvent(ribbonClickEvent);

    }
  }

  #ribbonScrollBy = () =>{
    let scrollLeft = this.#ribbonInner.scrollLeft;
    let scrollRight = this.#ribbonInner.scrollWidth - scrollLeft - this.#ribbonInner.clientWidth;
    if (scrollLeft < 1)  {
      this.#arrowLeftButton.classList.remove('ribbon__arrow_visible');
    } 
    else this.#arrowLeftButton.classList.add('ribbon__arrow_visible');
    if (scrollRight < 1)  this.#arrowRightButton.classList.remove('ribbon__arrow_visible');
      else this.#arrowRightButton.classList.add('ribbon__arrow_visible');
  }
}
