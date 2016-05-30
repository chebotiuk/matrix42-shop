export class ProductsController {
  constructor(productsService, categoriesService, cartService, $timeout, $scope) {
    'ngInject';

    this.products = null;
    this.currentPage = 1;
    this.perPage = 6;
    this.categories = null;
    this.filteredCategories = [];
    this.search = '';

    this.productsService = productsService;
    this.categoriesService = categoriesService;
    this.cartService = cartService;
    this.$timeout = $timeout;
    this.$scope = $scope;

    this.activate();
  }

  activate() {
    this.productsService.get()
      .then((response) => {
        this.$timeout(() => {
          this.products = response;
          this.productsService.compareWithCart();
        });
      }, () => {
        // TODO: show error notification
      });

    this.categoriesService.get()
      .then((response) => {
        this.$timeout(() => {
          this.categories = response;
        });
      }, () => {
        // TODO: show error notification
      });
  }

  selectCategory(category) {
    const indexOf = this.filteredCategories.indexOf(category);

    if (indexOf >= 0) {
      this.filteredCategories.splice(indexOf, 1);
    } else {
      this.filteredCategories.push(category);
    }
  }

  addToCart(product) {
    this.cartService.add(product)
      .then(() => {
        /* eslint-disable no-param-reassign */
        product.inCart = true;
        /* eslint-enable no-param-reassign */
        this.$scope.$emit('addToCart');
      }, () => {
        // TODO: show error notification
      });
  }

  removeFromCart(product) {
    this.cartService.removeById(product.id)
      .then(() => {
        /* eslint-disable no-param-reassign */
        product.inCart = false;
        /* eslint-enable no-param-reassign */
        this.$scope.$emit('removeFromCart');
      }, () => {
        // TODO: show error notification
      });
  }
}
