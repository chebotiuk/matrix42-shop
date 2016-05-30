import contentTpl from './main/layout/content.html';

export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('index', {
      url: '',
      abstract: true,
      templateUrl: contentTpl,
      controller: 'MainController as main',
    });
}
