(function () {
  'use strict';

  angular.module('kiss').factory('GameDialogsService', GameDialogsService);

  /** @ngInject */
  function GameDialogsService(ngDialog, $timeout) {

    return {
      wonGame: function() {
        return ngDialog.open({
          template: '<img ng-click="closeThisDialog()" src="/assets/alert_ganar_reto.png" width="420px" height="420px">',
          plain: true,
          showClose: false
        });
      },
      loseGame: function loseGame() {
        return ngDialog.open({
          template: '<img ng-click="closeThisDialog()" src="/assets/alert_reiniciar.png" width="420px" height="420px">',
          plain: true,
          showClose: false
        });
      },
      loseLive: function () {
        var dialog = ngDialog.open({
          template: '<img src="/assets/alert_menos_vida.png" width="420px" height="420px">',
          plain: true,
          showClose: false
        });

        $timeout(function () {
          dialog.close();
        }, 1000);

        return;
      },
      gainLive: function () {
        var dialog = ngDialog.open({
          template: '<img src="/assets/alert_mas_vida.png" width="420px" height="420px">',
          plain: true,
          showClose: false
        });

        $timeout(function () {
          dialog.close();
        }, 1000);
      }
    };
  }

})();
