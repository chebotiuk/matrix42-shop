export class categoriesService {
  constructor($http) {
    'ngInject';

    this.categories = null;

    this.$http = $http;
  }

  getFromFile() {
    return this.$http.get('src/assets/data/categories.json');
  }

  get() {
    let promise;

    if (!this.categories) {
      promise = this.getFromFile()
        .then((response) => {
          this.categories = response.data;
        });
    }

    if (promise) {
      return promise.then(() => Promise.resolve(this.categories));
    }

    return Promise.resolve(this.categories);
  }
}
