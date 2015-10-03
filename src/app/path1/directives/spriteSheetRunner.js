(function () {
  'use strict';

  angular.module('path1')
    .directive('spriteSheetRunner', spriteSheetRunner);
  /** @ngInject */
  function spriteSheetRunner(loaderSvc, Sky, Ground, Character, Butterfly, Logo) {
    "use strict";
    return {
      restrict: 'EAC',
      replace: true,
      scope: {
        width: '=width',
        height: '=height',
        score: '=score',
        lifesCount: '=lifesCount'
      },
      template: "<canvas></canvas>",
      link: function (scope, element, attribute) {
        var w, h, sky, grant, ground, butterflies, runningSoundInstance, logo;
        drawGame();
        element[0].width = scope.width;
        element[0].height = scope.height;
        w = scope.width;
        h = scope.height;
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

        function handleComplete() {
          sky = new Sky({width: w, height: h});
          sky.addToStage(scope.stage);
          logo = new Logo({y: 10});
          logo.setHorizontalCenterAt(w / 2);
          logo.addToStage(scope.stage);
          ground = new Ground({width: w, height: h});
          ground.addToStage(scope.stage);
          grant = new Character({characterAssetName: 'grant', y: 200, x: 300});
          grant.addToStage(scope.stage);
          butterflies = [];

          var butterflyColors = ['blue', 'green', 'orange', 'red', 'violet', 'yellow'];
          (function addNewButterfly() {

            setTimeout(function () {
              var butterflyColor = butterflyColors[Math.floor(Math.random()*butterflyColors.length)],
                butterfly = new Butterfly({
                  butterflyAssetName: 'butterfly-' + butterflyColor,
                  y: h/2 - (h/2 * Math.random()),
                  x: w,
                  color: butterflyColor
                });
              butterfly.addToStage(scope.stage);
              butterflies.push(butterfly);
              addNewButterfly();
            }, 1000);
          }());



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
            grant.playAnimation("jump");
          }
        }

        function moveButterfly(butterfly, deltaS) {
          butterfly.setX((butterfly.getX() - deltaS * 100));
        }

        function tick(event) {
          var deltaS = event.delta / 1000;
          var position = grant.getX() + 150 * deltaS;

          grant.setX((position >= w + grant.getWidth()) ? -grant.getWidth() : position);
          ground.setX((ground.getX() - deltaS * 150) % ground.getTileWidth());

          butterflies.forEach(function(butterfly) {
            moveButterfly(butterfly, deltaS);
          });
          scope.stage.update(event);
        }
      }
    }
  }

}());
