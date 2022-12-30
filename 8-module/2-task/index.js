import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #elem = null;
  filters = {};
  
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#template();
    this.#render();
  }

  get elem(){
    return this.#elem;
  }
  #template(){
    let tmp = `<div class="products-grid">
                          <div class="products-grid__inner"></div>
                      </div>`

    this.#elem = createElement(tmp);
  }


  #render(){
    this.products
      .forEach(element => {
        let card = new ProductCard(element);
        this.#productsGridInner.append(card.elem);
      });
  };

  get #productsGridInner(){
    return this.#elem.querySelector('.products-grid__inner');
  }

  #update(){
    
    this.#productsGridInner.innerHTML = '';
    
    if(this.filters){
      this.products
        .filter((product) => {

          let nuts = true;
          let vegeterianOnly = true;
          let maxSpiciness = true;
          let category  = true;
          
          if(this.filters.noNuts) {
            nuts = Boolean(!product.nuts);
          }

          if(this.filters.vegeterianOnly){
            vegeterianOnly = Boolean(this.filters.vegeterianOnly == product.vegeterian) 
          }
          
          if(this.filters.maxSpiciness){
            maxSpiciness = Boolean(product.spiciness <= this.filters.maxSpiciness);
          }
          
          if(this.filters.category){
            category = Boolean(this.filters.category == product.category);
          }
          return (nuts && vegeterianOnly && maxSpiciness && category);
        })
        .forEach(element => {
          let card = new ProductCard(element);
          this.#productsGridInner.append(card.elem);
        });
  } 
}

updateFilter(filter){
    Object.assign(this.filters,filter);
    this.#update();
  }
}
