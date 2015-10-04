(function () {
  'use strict';
  angular.module('path1', [])
    .controller('PathOneController', PathOneController);

  /** @ngInject */
  function PathOneController($scope, $window, PlayerService, GameService, ngDialog, $timeout) {
    var vm = this,
      firstTimeEnterOnWatcher = true;

    $scope.windowWidth = $window.innerWidth;
    $scope.gameHeight = 600;
    $scope.score = 0;
    $scope.lifesCount = 3;
    $scope.game = GameService.getGame();
    vm.game = $scope.game;
    vm.player = PlayerService.getPlayer();

    $scope.$watch('game', function (newValue) {
      if (firstTimeEnterOnWatcher) {
        firstTimeEnterOnWatcher = false;
        return;
      }
      if (newValue.lives === 0) {
        var dialog = ngDialog.open({
          template: '<img src="/assets/path1/alert_reiniciar.png" width="420px" height="420px">',
          plain: true,
          showClose: false
        });

      }
      if (newValue.points === 0) {

        if (newValue.lives !== 0) {
          var dialog = ngDialog.open({
            template: '<img src="/assets/path1/alert_menos_vida.png" width="420px" height="420px">',
            plain: true,
            showClose: false
          });

          $timeout(function () {
            dialog.close();
          }, 1000);
        }

        return;
      }

      if(newValue.points >= newValue.pointsSuccess) {
        var dialog = ngDialog.open({
          template: '<img src="/assets/path1/alert_menos_vida.png" width="420px" height="420px">',
          plain: true,
          showClose: false
        });
      }



    }, true);
  }
})();
