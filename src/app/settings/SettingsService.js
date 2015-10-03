/**
 * Created by Fabricio Salazar on 10/3/2015.
 */

(function() {
  'use strict';

  function SettingsService($http) {

    //Gets the Settings json
    function getSettings() {
      return $http.get('app/settings/settings.json').then(function(response) {
        return response.data;
      });
    }

    return {
      getSettings: getSettings
    };

  }

  angular.module('kiss').factory('SettingsService', SettingsService);

})();
