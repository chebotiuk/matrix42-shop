export class cartService {
  constructor($window) {
    'ngInject';

    this.cartProducts = angular.fromJson($window.localStorage.getItem('cart')) || [];

    this.$window = $window;
  }

  get() {
    return this.cartProducts;
  }

  add(newProduct) {
    console.log(newProduct);
    if (_.find(this.cartProducts, { name: newProduct.name })) {
      return Promise.reject({ message: 'This product is already in the cart' });
    }

    newProduct.count = 1;
    this.cartProducts.push(newProduct);
    this.$window.localStorage.setItem('cart', angular.toJson(this.cartProducts));
  }

  update(productIndex, newProduct) {
    _.merge(this.cartProducts[productIndex], newProduct);
    this.$window.localStorage.setItem('cart', angular.toJson(this.cartProducts));
  }

  remove(productIndex) {
    this.cartProducts.splice(productIndex, 1);
    this.$window.localStorage.setItem('cart', angular.toJson(this.cartProducts));
  }

  deleteCart() {
    this.cartProducts = [];
    this.$window.localStorage.removeItem('cart');
  }
}
