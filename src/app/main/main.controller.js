(function () {
  'use strict';

  angular
    .module('kiss')
    .controller('MainController', MainController);

  /** @ngInject */

  function MainController($state, $stateParams, PlayerService, GameService) {
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
  }
})();
