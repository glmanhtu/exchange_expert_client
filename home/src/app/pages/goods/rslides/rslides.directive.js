(function () {
  'use strict';

  angular.module('ExpertExchange.pages.goods')
    .directive('rslides', function(DOMAIN_URL) {
        var RSLIDES_OPTIONS = {
            nav: true,
            auto: false            
        };

        return {
          restrict: 'A',
          require: 'rslides',
          priority: 0,
          controller: function() {},
          scope: {
             rslides: '='         
          },
          template: '<ul class="rslides">' + 
                      '<li ng-repeat="image in rslides" rslides-item>' +
                        '<img ng-src="' + DOMAIN_URL + '/api/{{image.url}}" title=""/>' +
                      '</li>'+
                    '</ul>',
          link: function(scope, elm, attrs, ctrl) {
            var slider;
            ctrl.update = function() {
                slider && slider.destroySlider();
                slider = $('.rslides').responsiveSlides(RSLIDES_OPTIONS);
            };
          }
        };
    }).directive('rslidesItem', function($timeout) {
        return {
            require: '^rslides',
            link: function(scope, elm, attr, rslidesCtrl) {
                if (scope.$last) {
                    rslidesCtrl.update();
                }
            }
        }
    })
})();