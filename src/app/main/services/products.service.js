export class productsService {
  constructor($http, cartService) {
    'ngInject';

    this.products = null;

    this.$http = $http;
    this.cartService = cartService;
  }

  getFromFile() {
    return this.$http.get('src/assets/data/products.json');
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

    if (cartProducts && cartProducts.length > 0) {
      for (let i = cartProducts.length; i--;) {
        const index = _.findIndex(this.products, { id: cartProducts[i].id });

        if (index) {
          this.products[index].inCart = true;
        }
      }
    }
  }
}
