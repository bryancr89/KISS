(function () {
  'use strict';
  angular.module('path1', [])
    .controller('PathOneController', PathOneController);

  /** @ngInject */
  function PathOneController($scope, $window, PlayerService, GameService, ngDialog) {
    var vm = this;

    $scope.windowWidth = $window.innerWidth;
    $scope.gameHeight = 600;
    $scope.score = 0;
    $scope.lifesCount = 3;
    $scope.game = GameService.getGame();
    vm.game = $scope.game;
    vm.player = PlayerService.getPlayer();

    //Path 1 Help
    function path1Help() {
      var dialog = ngDialog.open({
        template: '<div class="text-center"><img src="/assets/main/alert_ayuda.png" width="225px" style="margin-bottom: 1em;"><p class="help-text">Para poder acumular puntos en el juego debes dar click sobre la  mariposa que corresponda al color del personaje que elegiste, debes tener cuidado de no seleccionar una mariposa de un color diferente ya que perderás puntos. </p></div>',
        plain: true
      });
    }

    $scope.path1Help = path1Help;
  }
})();
