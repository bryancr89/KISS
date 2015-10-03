/**
 * Created by Fabricio Salazar on 10/3/2015.
 */

(function() {
  'use strict';

  angular.module('kiss').controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController($scope, SettingsService) {

    //Sets the settings data to the scope
    function onLoadSettingsSuccess(data) {
      $scope.parameters = data;
    }

    SettingsService.getSettings().then(onLoadSettingsSuccess);
  }

})();
