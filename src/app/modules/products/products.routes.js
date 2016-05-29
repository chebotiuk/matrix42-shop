export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/products');

  $stateProvider
    .state('index.products', {
      url: '/products',
      templateUrl: 'src/app/modules/products/products.html',
      controller: 'ProductsController as vm',
    });
}
