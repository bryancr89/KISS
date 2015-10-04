/**
 * Created by Fabricio Salazar on 10/3/2015.
 */

(function() {
  'use strict';

  angular.module('kiss').controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController(SettingsService) {
    var vm = this;

    //Sets the settings data to the scope
    function onLoadSettingsSuccess(data) {
      vm.parameters = data;
    }

    vm.setSettings = function setSettings() {
      SettingsService.setSettings(vm.parameters);
    };

    SettingsService.getSettings().then(onLoadSettingsSuccess);
  }

})();
