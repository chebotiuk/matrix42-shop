export class CartController {
  constructor(cartService, $timeout) {
    'ngInject';

    this.cartProducts = null;
    this.successMessage = false;
    this.errorMessage = false;

    this.cartService = cartService;
    this.$timeout = $timeout;

    this.activate();
  }

  activate() {
    this.cartProducts = this.cartService.get();
    // this.cartService.get()
    //   .then((response) => {
    //     this.$timeout(() => {
    //       this.cartProducts = response;
    //     });
    //   });
  }

  removeFromCart(productIndex) {
    this.cartService.remove(productIndex);
  }

}
