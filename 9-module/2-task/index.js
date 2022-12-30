import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
productGrid = null;
carousel = null;
ribbonMenu = null;
stepSlider = null;
cartIcon = null;
cart = null;
products = [];

  constructor() {
  }

  async render() {
    
    this.carousel = new Carousel(slides);
    document.body.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    
    this.ribbonMenu = new RibbonMenu(categories);
    document.body.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    document.body.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    try {
      let responseProducts = await fetch('products.json');
      this.products = await responseProducts.json();
      this.productGrid = new ProductsGrid(this.products);
      document.body.querySelector('[data-products-grid-holder]').innerHTML = ''
      document.body.querySelector('[data-products-grid-holder]').append(this.productGrid.elem);
    } catch(e){
      console.log(e);
    }
    
    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add',(event)=>{ 
      this.cart.addProduct(this.products.find((item) => {
        return item.id === event.detail}));
    })

    document.body.addEventListener('slider-change',(event)=>{ 
      this.productGrid.updateFilter({
        maxSpiciness: event.detail // значение остроты из события 'slider-change'
      });
    })
    
    document.body.addEventListener('ribbon-select',(event)=>{ 
      this.productGrid.updateFilter({
      category: event.detail // значение остроты из события 'slider-change'
      });
    })

    let nutsCheckbox = document.getElementById('nuts-checkbox');
    nutsCheckbox.addEventListener('change', (event) => {
      this.productGrid.updateFilter({
      noNuts: nutsCheckbox.checked // новое значение чекбокса
      })
    });

    let vegCheckbox = document.getElementById('vegeterian-checkbox');

    vegCheckbox.addEventListener('change', (event) => {
      this.productGrid.updateFilter({
      vegeterianOnly: vegCheckbox.checked // новое значение чекбокса
    })
  });


  }
}
