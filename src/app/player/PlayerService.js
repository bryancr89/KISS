(function () {
  'use strict';

  angular.module('kiss').factory('PlayerService', PlayerService);

  function PlayerService() {
    var player = {
      lives: 0,
      points: 0,
      name: '',
      character: 'perezoso',
      difficulty: ''
    };

    return {
      getPlayer: function getPlayer() {
        return player;
      },
      setCharacter: function setCharacter(character) {
        player.character = character;
        return this;
      },
      setDifficulty: function setDifficulty(difficulty) {
       player.difficulty = difficulty;
        return this;
      },
      setName: function setName(name) {
        player.name = name;
        return this;
      }
    };
  }

})();
