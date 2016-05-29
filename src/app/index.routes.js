export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('index', {
      url: '',
      abstract: true,
      templateUrl: 'src/app/main/layout/content.html',
      controller: 'MainController as main',
    });
}
