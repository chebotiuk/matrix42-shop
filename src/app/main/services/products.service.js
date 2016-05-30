export class productsService {
  constructor($http, cartService) {
    'ngInject';

    this.products = null;

    this.$http = $http;
    this.cartService = cartService;
  }

  getFromFile() {
    return this.$http.get('/assets/data/products.json');
  }

  get() {
    let promise;

    if (!this.products) {
      promise = this.getFromFile()
        .then((response) => {
          this.products = response.data;
        });
    }

    if (promise) {
      return promise.then(() => Promise.resolve(this.products));
    }

    return Promise.resolve(this.products);
  }

  compareWithCart() {
    const cartProducts = this.cartService.get();

    if (this.products && this.products.length > 0) {
      for (let i = this.products.length; i--;) {
        this.products[i].inCart = false;
      }
    }

    if (cartProducts && cartProducts.length > 0) {
      for (let i = cartProducts.length; i--;) {
        const index = _.findIndex(this.products, { id: cartProducts[i].id });

        if (index >= 0) {
          this.products[index].inCart = true;
        }
      }
    }
  }
}
