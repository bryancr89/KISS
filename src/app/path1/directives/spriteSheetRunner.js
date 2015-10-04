(function () {
  'use strict';

  angular.module('path1')
    .directive('spriteSheetRunner', spriteSheetRunner);
  /** @ngInject */
  function spriteSheetRunner(loaderSvc, Sky, Ground, Character, Butterfly, GameService) {
    "use strict";
    return {
      restrict: 'EAC',
      replace: true,
      scope: {
        width: '=width',
        height: '=height',
        score: '=score',
        lifesCount: '=lifesCount',
        player: '='
      },
      template: "<canvas></canvas>",
      link: function (scope, element, attribute) {
        var w, h, character, ground, butterflies, runningSoundInstance;
        drawGame();
        element[0].width = scope.width;
        element[0].height = scope.height;
        w = scope.width;
        h = scope.height;
        GameService.init();
        scope.game = GameService.getGame();

        function drawGame() {
          //drawing the game canvas from scratch here
          if (scope.stage) {
            scope.stage.autoClear = true;
            scope.stage.removeAllChildren();
            scope.stage.update();
          } else {
            scope.stage = new createjs.Stage(element[0]);
          }
          w = scope.stage.canvas.width;
          h = scope.stage.canvas.height;
          loaderSvc.getLoader().addEventListener("complete", handleComplete);
          loaderSvc.loadAssets();
        }

        function getRandomColor(butterflyColors) {
          return butterflyColors[Math.floor(Math.random() * butterflyColors.length)];
        }

        function getCharacter(color) {
          return scope.player.character + '-' + color;
        }

        function addNewButterfly(butterflyColors) {
          setTimeout(function () {
            var butterflyColor = getRandomColor(butterflyColors),
              butterfly = new Butterfly({
                butterflyAssetName: 'butterfly-' + butterflyColor,
                y: h / 2 - (h / 2 * Math.random()),
                x: w,
                color: butterflyColor,
                validateAction: function() {
                  (this.color == scope.currentValidColor) ? GameService.validAction() : GameService.invalidAction();
                  scope.$apply();
                }
              });
            butterfly.addToStage(scope.stage);
            butterflies.push(butterfly);
            addNewButterfly(butterflyColors);
          }, 1000);
        }

        function handleComplete() {
          var colorPickTimerId,
            butterflyColors = ['blue', 'green', 'orange', 'red', 'violet', 'yellow'];

          scope.currentValidColor = getRandomColor(butterflyColors);
          ground = new Ground({width: w, height: h});
          ground.addToStage(scope.stage);
          character = new Character({
            character: scope.player.character,
            characterAssetName: getCharacter(scope.currentValidColor),
            x: 300,
            y: 200
          });
          character.addToStage(scope.stage);

          butterflies = [];

          addNewButterfly(butterflyColors);

          colorPickTimerId = setInterval(function () {
            scope.currentValidColor = getRandomColor(butterflyColors);
            var x = character.getX(),
              y = character.getY();
            character.removeFromStage(scope.stage);
            character = new Character({
              character: scope.player.character,
              characterAssetName: getCharacter(scope.currentValidColor),
              x: x,
              y: y
            });
            character.addToStage(scope.stage);
            scope.$apply();
          }, 5000);

          scope.stage.addEventListener("stagemousedown", handleJumpStart);
          createjs.Ticker.timingMode = createjs.Ticker.RAF;
          createjs.Ticker.addEventListener("tick", tick);
          // start playing the running sound looping indefinitely
          runningSoundInstance = createjs.Sound.play("runningSound", {loop: -1});
          scope.status = "running";
          window.onkeydown = keydown;
          scope.score = 10;
          scope.lifesCount = 2;
          scope.$apply();

          scope.$on('$destroy', function () {
            colorPickTimerId();
          });
        }

        function keydown(event) {
          if (event.keyCode === 38) {//if keyCode is "Up"
            handleJumpStart();
          }
          if (event.keyCode === 39) {//if keyCode is "Right"
            if (scope.status === "paused") {
              createjs.Ticker.addEventListener("tick", tick);
              runningSoundInstance = createjs.Sound.play("runningSound", {loop: -1});
              scope.status = "running";
            }
          }
          if (event.keyCode === 37) {//if keyCode is "Left"
            createjs.Ticker.removeEventListener("tick", tick);
            createjs.Sound.stop();
            scope.status = "paused";
          }
        }

        function handleJumpStart() {
          if (scope.status === "running") {
            createjs.Sound.play("jumpingSound");
            character.playAnimation("jump");
          }
        }

        function moveButterfly(butterfly, deltaS) {
          butterfly.setX((butterfly.getX() - deltaS * 100));
        }

        function tick(event) {
          var deltaS = event.delta / 1000;
          var position = character.getX() + 150 * deltaS;

          character.setX((position >= w + character.getWidth()) ? -character.getWidth() : position);
          ground.setX((ground.getX() - deltaS * 150) % ground.getTileWidth());

          butterflies.forEach(function (butterfly) {
            moveButterfly(butterfly, deltaS);
          });
          scope.stage.update(event);
        }
      }
    }
  }

}());
