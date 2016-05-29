export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('index.cart', {
      url: '/cart',
      templateUrl: 'src/app/modules/cart/cart.html',
      controller: 'CartController as vm',
    });
}
