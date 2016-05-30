import cartTpl from './cart.html';

export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('index.cart', {
      url: '/cart',
      templateUrl: cartTpl,
      controller: 'CartController as vm',
    });
}
