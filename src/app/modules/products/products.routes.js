import productsTpl from './products.html';

export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/products');

  $stateProvider
    .state('index.products', {
      url: '/products',
      templateUrl: productsTpl,
      controller: 'ProductsController as vm',
    });
}
