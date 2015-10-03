(function () {
  'use strict';

  angular
    .module('kiss')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(PlayerService) {
    var vm = this;
    vm.gameOptions = {
      playerName: '',
      character: '',
      difficulty: ''
    };

    vm.playerName = '';
    vm.currentStep = 0;
    vm.characters = ['baula', 'colibri', 'jaguar', 'mono', 'perezoso', 'rana', 'tucan', 'venado'];
    vm.difficultyLevels = ['Facil', 'Moderado', 'Dificil'];
    function nextStepCount() {
      vm.currentStep++;
    }

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
        PlayerService.setCharacter(vm.gameOptions.character).setName(vm.gameOptions.playerName);
      },
      nextIsDisabled: function nextIsDisabled() {
        return !vm.gameOptions.character.trim();
      }
    }, {
      name: 'step two',
      nextStep: function () {
        nextStepCount();
        PlayerService.setName(vm.gameOptions.playerName);
      },
      isPlayerNameEnabled: function () {
        return !!vm.gameOptions.character.trim();
      },
      nextIsDisabled: function nextIsDisabled() {
        return !vm.gameOptions.playerName.trim();
      }
    }, {
      name: 'step two',
      nextStep: function () {
        nextStepCount();
        vm.gameOptions.difficulty = difficulty;
        PlayerService.setDifficulty(vm.gameOptions.difficulty);
      },
      nextIsDisabled: function nextIsDisabled() {
        return !vm.gameOptions.difficulty.trim();
      }
    }];

  }
})();
