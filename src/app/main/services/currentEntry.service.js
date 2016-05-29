export class currentEntryService {
  constructor($window) {
    'ngInject';

    this.entry = angular.fromJson($window.localStorage.getItem('currentEntry')) || null;

    this.$window = $window;
  }

  get() {
    return this.entry;
  }

  set(value) {
    this.entry = value;
    this.$window.localStorage.setItem('currentEntry', angular.toJson(value));
  }

  put(value) {
    this.entry = value;
    this.$window.localStorage.setItem('currentEntry', angular.toJson(value));
  }

  delete() {
    this.entry = null;
    this.$window.localStorage.removeItem('currentEntry');
  }
}
