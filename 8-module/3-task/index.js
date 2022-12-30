export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);
  }
}

