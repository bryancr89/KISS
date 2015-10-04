(function () {
  'use strict';

  angular
    .module('kiss')
    .controller('MainController', MainController);

  /** @ngInject */

  function MainController($state, $stateParams, PlayerService, GameService, $scope, ngDialog) {
    var vm = this;
    vm.gameOptions = PlayerService.getPlayer();
	  GameService.init().then(function () {
      vm.lives = GameService.getGame().lives;
    });
    vm.currentStep = $stateParams.step || 0;
    vm.characters = ['baula', 'colibri', 'jaguar', 'mono', 'perezoso', 'rana', 'tucan', 'venado'];
    vm.difficultyLevels = [{
      text: 'Fácil',
      value: 'easy'
    }, {
      text: 'Intermedio',
      value: 'medium'
    }, {
      text: 'Difícil',
      value: 'hard'
    }];
    function nextStepCount() {
      vm.currentStep++;
    }

    vm.goTo = function goTo(path) {
      $state.go(path);
    };

    vm.stepBack = function stepBack() {
      if (vm.currentStep > 0) {
        vm.currentStep--;
      }
    };

    vm.steps = [{
      name: 'step zero',
      nextStep: nextStepCount,
      nextIsDisabled: function nextIsDisabled() {
        return false;
      }
    }, {
      name: 'step one',
      nextStep: function (character) {
        nextStepCount();
        vm.gameOptions.character = character;
        PlayerService.setCharacter(vm.gameOptions.character).setName(vm.gameOptions.name);
      },
      nextIsDisabled: function nextIsDisabled() {
        return !vm.gameOptions.character.trim();
      }
    }, {
      name: 'step two',
      nextStep: function () {
        nextStepCount();
        PlayerService.setName(vm.gameOptions.name);
      },
      isPlayerNameEnabled: function () {
        return !!vm.gameOptions.character.trim();
      },
      nextIsDisabled: function nextIsDisabled() {
        return !vm.gameOptions.name.trim();
      }
    }, {
      name: 'step three',
      nextStep: function (difficulty) {
        nextStepCount();
        vm.gameOptions.difficulty = difficulty;
        PlayerService.setDifficulty(vm.gameOptions.difficulty);
        //$state.go('path1');
      },
      nextIsDisabled: function nextIsDisabled() {
        return !vm.gameOptions.difficulty.trim();
      }
    }];

    //World 1 Help
    function world1Help() {
      var dialog = ngDialog.open({
        template: '<div class="text-center"><img src="/assets/main/alert_ayuda.png" width="225px" style="margin-bottom: 1em;"><p class="help-text">Para poder acumular puntos en el juego debes dar click sobre la  mariposa que corresponda al color del personaje que elegiste, debes tener cuidado de no seleccionar una mariposa de un color diferente ya que perderás puntos. </p></div>',
        plain: true
      });
    }

    $scope.world1Help = world1Help;

  }
})();
