/**!
 * AngularJS ng-src on load directive
 * @author Javier Martínez <ecentinela@gmail.com>
 * @version 0.1.0
 */

/* global angular */

(function () {
  'use strict';

  angular.module('ngSrcOnLoad', []).directive(
    'ngSrcOnLoad',
    [
      '$parse',
      function ($parse) {
        return {
          compile: function ($element, $attrs) {
            var fn = $parse($attrs.ngSrcOnLoad);

            return function ($scope, $element, $attrs) {
              $scope.$watch(function () {
                return $attrs.ngSrc;
              }, function (src) {
                var img = new Image();

                img.onload = function () {
                  $scope.$apply(function () {
                    fn($scope);
                  });
                };

                img.src = src;
              });
            };
          }
        };
      }
    ]
  );

})();
