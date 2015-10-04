/**
 * Created by Fabricio Salazar on 10/3/2015.
 */

(function() {
  'use strict';

  function SettingsService($http) {

    //Gets the Settings json
    function getSettings() {
      return $http.get('/settings').then(function(response) {
        return response.data;
      });
    }

    //Store the Settings json
    function setSettings(data) {
      return $http.post('/settings', data).then(function(response) {
        return response;
      });
    }

    return {
      getSettings: getSettings,
      setSettings: setSettings
    };

  }

  angular.module('kiss').factory('SettingsService', SettingsService);

})();
