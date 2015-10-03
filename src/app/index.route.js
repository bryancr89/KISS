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
<<<<<<< Updated upstream
      .state('path1', {
        url: '/path1',
        templateUrl: 'app/path1/path.html',
        controller: 'PathOneController',
        controllerAs: 'pathOne'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
=======
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsController'
>>>>>>> Stashed changes
      });

    $urlRouterProvider.otherwise('/');
  }

})();
