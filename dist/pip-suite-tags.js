(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).tags = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TagData = (function () {
    TagData.$inject = ['pipRest', 'pipSession'];
    function TagData(pipRest, pipSession) {
        "ngInject";
        this.pipRest = pipRest;
        this.pipSession = pipSession;
        this.RESOURCE = 'tags';
    }
    TagData.prototype.getUserId = function () {
        var userId;
        userId = this.pipSession.session ? this.pipSession.session.userId : null;
        return userId;
    };
    TagData.prototype.readTags = function (params, successCallback, errorCallback) {
        params = params || {};
        params.party_id = params.party_id ? params.party_id : this.getUserId();
        return this.pipRest.getResource(this.RESOURCE).get(params, successCallback, errorCallback);
    };
    TagData.prototype.createTags = function (params, data, successCallback, errorCallback) {
        params.party_id = params.party_id ? params.party_id : this.getUserId();
        this.pipRest.getResource(this.RESOURCE).save(params, data, successCallback, errorCallback);
    };
    TagData.prototype.updateTags = function (params, data, successCallback, errorCallback) {
        params.party_id = params.party_id ? params.party_id : this.getUserId();
        this.pipRest.getResource(this.RESOURCE).update(params, data, successCallback, errorCallback);
    };
    return TagData;
}());
var TagDataProvider = (function () {
    function TagDataProvider() {
    }
    TagDataProvider.prototype.$get = ['pipRest', 'pipSession', function (pipRest, pipSession) {
        "ngInject";
        if (this._service == null) {
            this._service = new TagData(pipRest, pipSession);
        }
        return this._service;
    }];
    return TagDataProvider;
}());
angular
    .module('pipTagData', ['pipCommonRest'])
    .provider('pipTagData', TagDataProvider);
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./TagDataService");
require("./ITagDataService");
},{"./ITagDataService":1,"./TagDataService":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./tag_list/TagList");
require("./rest/TagResources");
require("./data");
angular.module('pipTags', [
    'pipTag.Rest',
    'pipTagData',
    'pipTagList'
]);
},{"./data":3,"./rest/TagResources":5,"./tag_list/TagList":6}],5:[function(require,module,exports){
configTagResources.$inject = ['pipRestProvider'];
function configTagResources(pipRestProvider) {
    pipRestProvider.registerResource('tags', '/api/1.0/tags/:party_id', { party_id: '@party_id' }, {
        update: { method: 'PUT' }
    });
}
angular
    .module('pipTag.Rest', [])
    .config(configTagResources);
},{}],6:[function(require,module,exports){
{
    var TagListController = (function () {
        function TagListController($scope, $element) {
            $element.css('display', 'block');
            $element.addClass('pip-tag-list');
        }
        TagListController.prototype.toBoolean = function (value) {
            if (_.isNull(value) || _.isUndefined(value))
                return false;
            if (!value)
                return false;
            value = value.toString().toLowerCase();
            return value == '1' || value == 'true';
        };
        TagListController.prototype.$onChanges = function (changes) {
            if (this.rebind && changes.tags) {
                this.tags = changes.tags.currentValue;
            }
        };
        return TagListController;
    }());
    var TagListBindings = {
        tags: '<pipTags',
        type: '<pipType',
        typeLocal: '<pipTypeLocal',
        rebuid: '<pipRebind'
    };
    var TagListChanges = (function () {
        function TagListChanges() {
        }
        return TagListChanges;
    }());
    var TagList = {
        bindings: TagListBindings,
        templateUrl: 'tag_list/TagList.html',
        controller: TagListController
    };
    angular
        .module('pipTagList', ['pipTranslate'])
        .component('pipTagList', TagList);
}
},{}],7:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipTags.Templates');
} catch (e) {
  module = angular.module('pipTags.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tag_list/TagList.html',
    '<div class="pip-chip rm4 pip-type-chip pip-type-chip-left {{\'bg-\' + $ctrl.type + \'-chips\'}}" ng-if="$ctrl.type && !$ctrl.typeLocal"><span>{{$ctrl.type.toUpperCase() | translate | uppercase}}</span></div><div class="pip-chip rm4 pip-type-chip pip-type-chip-left {{\'bg-\' + $ctrl.type + \'-chips\'}}" ng-if="$ctrl.type && $ctrl.typeLocal"><span>{{$ctrl.typeLocal.toUpperCase() | translate | uppercase}}</span></div><div class="pip-chip rm4" ng-repeat="tag in $ctrl.tags"><span>{{::tag}}</span></div>');
}]);
})();



},{}]},{},[7,4])(7)
});

//# sourceMappingURL=pip-suite-tags.js.map
