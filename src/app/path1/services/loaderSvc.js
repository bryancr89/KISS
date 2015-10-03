(function () {
  'use strict';

  angular.module('path1')
    .service('loaderSvc', function () {
      var manifest = [
        {src: 'characters/baula_sprite.png', id: 'grant'},
        {src: 'path1/butterflies/yellow.png', id: 'butterfly'},
        {src: 'sky.png', id: 'sky'},
        {src: 'path1/FISERV-PROGRAMATHON-CAMINO1-FONDO_FONDO.png', id: 'ground'},
        {src: 'hill1.png', id: 'hill'},
        {src: 'hill2.png', id: 'hill2'},
        {src: 'logo.png', id: 'logo'},
        {src: 'runningTrack.mp3', id: 'runningSound'},
        {src: 'jump.mp3', id: 'jumpingSound'}
      ], loader = new createjs.LoadQueue(true);
      createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);  // need this so it doesn't default to Web Audio
      loader.installPlugin(createjs.Sound);
      this.getResult = function (asset) {
        return loader.getResult(asset);
      };
      this.getLoader = function () {
        return loader;
      };
      this.loadAssets = function () {
        loader.loadManifest(manifest, true, '/assets/');
      };
    });

}());
