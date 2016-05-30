export class MainController {
  constructor($scope, $state, $timeout, cartService) {
    'ngInject';

    this.cartIsEmpty = cartService.isEmpty();

    this.$state = $state;
    this.cartService = cartService;

    $scope.$on('addToCart', () => {
      $timeout(() => {
        this.cartIsEmpty = cartService.isEmpty();
      });
    });

    $scope.$on('removeFromCart', () => {
      $timeout(() => {
        this.cartIsEmpty = cartService.isEmpty();
      });
    });
  }

  goCart() {
    if (this.cartIsEmpty) {
      return false;
    }

    return this.$state.go('index.cart');
  }
}
