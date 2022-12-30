import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  #basePointx = 0
  
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `

        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (document.documentElement.clientWidth > 767){
      if (this.#basePointx = 0)
        this.#basePointx = this.elem.getBoundingClientRect().top + window.pageYOffset;
      if(window.pageYOffset > this.#basePointx){
        this.elem.style.position = 'fixed';
        let containerPosition = document.querySelector('.container').getBoundingClientRect().right + 20; 
        let docPosition = document.documentElement.clientWidth - this.elem.offsetWidth - 10;
        this.elem.style.left = Math.min(containerPosition,docPosition) +'px';
        this.elem.style.zIndex = '999';
        return;
      } 
    }
    this.elem.style.left = '';
    this.elem.style.top = '';
    this.elem.style.position = ''; 
    this.elem.style.zIndex = '';
  }
}
