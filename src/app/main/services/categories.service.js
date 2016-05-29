export class categoriesService {
  constructor($window, $http) {
    'ngInject';

    this.categories = angular.fromJson($window.localStorage.getItem('categories')) || null;

    this.$window = $window;
    this.$http = $http;
  }

  getFromFile() {
    return this.$http.get('src/assets/data/categories.json');
  }

  get(page) {
    let promise;

    if (!this.categories) {
      promise = this.getFromFile()
        .then((response) => {
          this.categories = response.data;
          this.$window.localStorage.setItem('categories', angular.toJson(this.categories));
        });
    }

    if (promise) {
      return promise.then(() => {
        return Promise.resolve(this.categories);
      })
    } else {
      return Promise.resolve(this.categories);
    }


  }
}
