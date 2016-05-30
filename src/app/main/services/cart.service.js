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
    if (_.find(this.cartProducts, { id: newProduct.id })) {
      return Promise.reject({ message: 'This product is already in the cart' });
    }

    const tmpProduct = angular.copy(newProduct);

    tmpProduct.quantity = 1;
    this.cartProducts.push(tmpProduct);
    this.$window.localStorage.setItem('cart', angular.toJson(this.cartProducts));

    return Promise.resolve();
  }

  update() {
    this.$window.localStorage.setItem('cart', angular.toJson(this.cartProducts));

    return Promise.resolve();
  }

  remove(productIndex) {
    this.cartProducts.splice(productIndex, 1);
    this.$window.localStorage.setItem('cart', angular.toJson(this.cartProducts));

    return Promise.resolve();
  }

  removeById(productId) {
    const productIndex = _.findIndex(this.cartProducts, { id: productId });

    this.cartProducts.splice(productIndex, 1);
    this.$window.localStorage.setItem('cart', angular.toJson(this.cartProducts));

    return Promise.resolve();
  }

  isEmpty() {
    if (this.cartProducts.length > 0) {
      return false;
    }

    return true;
  }

  deleteCart() {
    this.cartProducts = [];
    this.$window.localStorage.removeItem('cart');

    return Promise.resolve();
  }
}
