(function () {
  'use strict';

  angular.module('ExpertExchange.pages.editpost')
    .directive('erslides', function(DOMAIN_URL) {
        var RSLIDES_OPTIONS = {
            nav: true,
            auto: false            
        };

        return {
          restrict: 'A',
          require: 'erslides',
          priority: 0,
          controller: function() {},
          scope: {
             erslides: '='         
          },
          template: '<ul class="erslides">' + 
                      '<li ng-repeat="image in erslides" erslides-item>' +
                        '<img ng-src="' + DOMAIN_URL + '/api/{{image.url}}" title=""/>' +
                      '</li>'+
                    '</ul>',
          link: function(scope, elm, attrs, ctrl) {
            var slider;
            ctrl.update = function() {
                slider && slider.destroySlider();
                slider = $('.erslides').responsiveSlides(RSLIDES_OPTIONS);
            };
          }
        };
    }).directive('rslidesItem', function($timeout) {
        return {
            require: '^erslides',
            link: function(scope, elm, attr, rslidesCtrl) {
                if (scope.$last) {
                    rslidesCtrl.update();
                }
            }
        }
    })
})();