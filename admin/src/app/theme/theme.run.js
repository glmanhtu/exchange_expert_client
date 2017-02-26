/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($rootScope, baSidebarService) {
    $rootScope.$pageFinishedLoading = true;
    $rootScope.$baSidebarService = baSidebarService;
  }

})();