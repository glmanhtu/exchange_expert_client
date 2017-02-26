(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.post')
        .directive('fileModel', fileModel);
    fileModel.$inject = ['$parse'];
    /* @ngInject */
    function fileModel($parse) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            // bindToController: true,
            // controller: createGoodCtrl,
            // controllerAs: 'vm',
            link: link,
            restrict: 'A'//,
            // scope: {
            // }
        };
        return directive;
        function link(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
    /* @ngInject */
    function Controller() {
    }
})();