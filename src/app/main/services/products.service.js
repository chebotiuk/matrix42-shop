export class productsService {
  constructor($window, $http) {
    'ngInject';

    this.products = angular.fromJson($window.localStorage.getItem('products')) || null;

    this.$window = $window;
    this.$http = $http;
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
          this.$window.localStorage.setItem('products', angular.toJson(this.products));
        });
    }

    if (promise) {
      return promise.then(() => {
        return Promise.resolve(this.products);
      });
    } else {
      return Promise.resolve(this.products);
    }
  }
}
