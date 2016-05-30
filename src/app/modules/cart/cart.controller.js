export class CartController {
  constructor(cartService, $timeout, $scope) {
    'ngInject';

    this.cartProducts = null;
    this.successMessage = false;
    this.errorMessage = false;

    this.cartService = cartService;
    this.$timeout = $timeout;
    this.$scope = $scope;

    this.activate();
  }

  activate() {
    this.cartProducts = this.cartService.get();
  }

  removeFromCart(productIndex) {
    this.cartService.remove(productIndex)
      .then(() => {
        this.$scope.$emit('removeFromCart');
      });
  }

  getTotal() {
    let total = 0;

    for (let i = this.cartProducts.length; i--;) {
      total += (this.cartProducts[i].price * this.cartProducts[i].quantity);
    }

    return total;
  }

  saveCart() {
    this.cartService.update()
      .then(() => {
        // TODO: show notification
      });
  }
}
