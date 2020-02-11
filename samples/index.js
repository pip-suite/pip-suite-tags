/* global angular */

(function () {
    'use strict';

    var content = [
        { title: 'Tag list', state: 'tag_list', url: '/tag_list', controller: 'TagsListController', templateUrl: 'tag_list/tags_list.html' },
        { title: 'Tag rest', state: 'tag_rest', url: '/tag_rest', controller: 'TagsRestController', templateUrl: 'tag_rest/tag_rest.html' }
    ];

    var thisModule = angular.module('appLists',
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 
            // 'angularFileUpload', 'ngAnimate',
            'pipLayout', 'pipNav',  'pipEntry', 'pipCommonRest', 'pipServices',

            'pipTags.Templates', 'pipTags',
			

            'appTags.List', 'appTags.Rest'
        ]
    );

    thisModule.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, pipRestProvider) {
            $mdIconProvider.iconSet('icons', '../lib/images/icons.svg', 512);

            for (var i = 0; i < content.length; i++) {
                var contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }
            pipRestProvider.serverUrl = 'http://alpha.pipservices.net';
            $urlRouterProvider.otherwise('/tag_list');
        } 
    );

    thisModule.controller('AppController', 
        function ($scope, $rootScope, $state, $mdSidenav, $mdTheming, localStorageService) {
            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));
            $rootScope.$theme = localStorageService.get('theme');

            $scope.selected = {
                theme: 'blue',
                tab: 0  
            };

            $scope.content = content;
            $scope.menuOpened = false;

            $scope.onLanguageClick = function(language) {
               // pipTranslate.use(language);
            };

            // Update page after language changed
            $rootScope.$on('languageChanged', function(event) {
                console.log('Reloading...');
                console.log($state.current);
                console.log($state.params);

                $state.reload();
            });

            // Update page after theme changed
            $rootScope.$on('themeChanged', function(event) {
                $state.reload();
            });
                        
            $scope.onSwitchPage = function(state) {
                $mdSidenav('left').close();
                $state.go(state);
            };
            
            $scope.onToggleMenu = function() {
                $mdSidenav('left').toggle();
            };
                        
            $scope.isActiveState = function(state) {
                return $state.current.name == state;  
            };
        }
    );

})();
