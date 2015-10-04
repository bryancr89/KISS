/**
 * Created by Fabricio Salazar on 10/3/2015.
 */

(function() {
  'use strict';
  /** @ngInject */
  function SettingsService($http, $q) {

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
      //getSettings: getSettings,
      getSettings: function() {
        return $q.when([
          {
            "id": "completeWorldTime",
            "name": "Tiempo para completar un mundo",
            "value": 750
          },
          {
            "id": "initialLifes",
            "name": "Cantidad de vidas iniciales",
            "value": "5"
          },
          {
            "id": "pointsToWin",
            "name": "Cantidad de puntos para ganar una vida",
            "value": "1000"
          },
          {
            "id": "pointsSuccess",
            "name": "Cantidad de puntos acierto camino",
            "value": "4000"
          },
          {
            "id": "pointsFail",
            "name": "Cantidad de puntos error camino",
            "value": 10
          },
          {
            "id": "pointsToAccessWorld",
            "name": "Cantidad de puntos para acceder a un mundo",
            "value": "8000"
          },
          {
            "id": "pointsAtWinningWorld",
            "name": "Cantidad de puntos al ganar un mundo",
            "value": "15000"
          },
          {
            "id": "deployObjectsTime",
            "name": "Tiempo de despliegue objetos mundo uno",
            "value": "1000"
          }
        ])
      },
      setSettings: setSettings
    };

  }

  angular.module('kiss').factory('SettingsService', SettingsService);

})();
