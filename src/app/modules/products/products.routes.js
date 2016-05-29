export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/index/products/1');

  $stateProvider
    .state('index.products', {
      url: '/products/{page:int}',
      templateUrl: 'src/app/modules/products/products.html',
      controller: 'ProductsController as vm',
    });
}
