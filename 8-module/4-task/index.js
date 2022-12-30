import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  #modal = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if(product){
      let productItem = this.cartItems.find(item => item.product.id === product.id)
      if(productItem){
        productItem.count = productItem.count + 1;
        return;
      }
      productItem = {product:Object.assign({},product),count : 1};
      this.cartItems.push(productItem);
      this.onProductUpdate(productItem);
    }
  }

  updateProductCount(productId, amount) {
    console.log(productId);
    let arrIndex = 0;
    let productItem = this.cartItems.find((item,index) => {
        arrIndex = index;
        return item.product.id === productId;
      })
    productItem.count = productItem.count + amount;
    if(productItem.count == 0){
      this.cartItems.splice(arrIndex,1);
    }
    this.onProductUpdate(productItem);
  }

  isEmpty() {
    return this.cartItems.length === 0
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach(item =>{ 
      totalCount = totalCount + item.count;
    });
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item =>{ 
      totalPrice = totalPrice + (item.product.price)*item.count;
    });
    return totalPrice;
  }


  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  
  renderModal() {
    
    let cartWindow = createElement('<div></div>');
    
    this.cartItems.forEach(item =>{ 
      cartWindow.append(this.renderProduct(item.product,item.count));
    });
    cartWindow.append(this.renderOrderForm());
      this.#modal = new Modal();
      this.#modal.setTitle('Your order');
      this.#modal.setBody(cartWindow);
      this.#modal.open();
      this.#modal.modalBody.addEventListener('click',this.#cardCounter);
      this.#modal.modalBody.querySelector('form').addEventListener('submit',this.onSubmit);
    
  }

  #cardCounter = (event) =>{
    if(event.target.closest('.cart-counter__button_minus')){
      this.updateProductCount(event.target.closest('.cart-product').dataset.productId,-1);
      return;
    }
    if(event.target.closest('.cart-counter__button_plus')){
      this.updateProductCount(event.target.closest('.cart-product').dataset.productId,1);
      return;
    }
    return;
  }

  onProductUpdate(cartItem) {
    if(document.body.classList.contains("is-modal-open")){
      if(this.isEmpty()){
        this.#modal.close();
        this.cartIcon.update(this);
        return;
      }
      let productCount = this.#modal.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = this.#modal.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      let infoPrice = this.#modal.modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`

      if(cartItem.count == 0){
        this.#modal.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove(); 
      }

    }
    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(this.#modal.modalBody.querySelector('form'));
    const responsePromise = fetch ('https://httpbin.org/post',{
      body: formData,
      method: 'POST'
    })

    responsePromise.then( () => {
    
      this.cartItems = [];
      this.cartIcon.update(this);
      this.#modal.setTitle('Success!');
      this.#modal.modalBody.innerHTML = `<div class="modal__body-inner">
                                   <p>
                                    Order successful! Your order is being cooked :) <br>
                                    We’ll notify you about delivery time shortly.<br>
                                    <img src="/assets/images/delivery.gif">
                                  </p>
                                </div>`

    })

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

