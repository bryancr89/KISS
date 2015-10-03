(function() {
  'use strict';

  angular
    .module('kiss')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('path1', {
        url: '/path1',
        templateUrl: 'app/path1/path.html',
        controller: 'PathOneController',
        controllerAs: 'pathOne'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
