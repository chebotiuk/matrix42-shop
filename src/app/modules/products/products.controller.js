export class ProductsController {
  constructor(productsService, categoriesService, cartService, $timeout, $state) {
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
    this.$state = $state;

    this.activate();
  }

  activate() {
    this.productsService.get()
      .then((response) => {
        this.$timeout(() => {
          this.products = response;
        });
      });

    this.categoriesService.get()
      .then((response) => {
        this.$timeout(() => {
          this.categories = response;
        })
      })
  }

  selectCategory(category) {
    var indexOf = this.filteredCategories.indexOf(category);

    if (indexOf >= 0) {
        this.filteredCategories.splice(indexOf, 1);
    } else {
        this.filteredCategories.push(category);
    }
  }

  addToCart(product) {
    this.cartService.add(product);
  }
}
