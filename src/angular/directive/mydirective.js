'use strict';

/**
  * @ngdoc directive
  * @name app.directive:myDirective
  * @module myDirective
  * @description
  * Render a table with data from github api
  *  @param {string=} [source='https://api.github.com/users/substack/repos'] Api url to get data
  *  @param {Array=} [rows=['id', 'name', 'private', 'html_url', 'owner', 'description']] Array of fields that will be rendered
  *  @param {Array=} [filter=false] Filter rows by {fieldName:fieldValue}
  *  @param {Function=} [myRender=function(field, repo)] Function that render the value of field
  */
angular.module('app').directive('myDirective', function($http) {
    return {
        scope: {
            source: '@?',
            rows: '=?',
            myRender: '&?',
            filter: '=?'
        },
        restrict: 'EA',
        template: '<div><table class="table table-responsive"><caption>repositories from github</caption><tr><th ng-repeat="row in rows"><span ng-bind=row></span></th></tr><tr class="t_rows" ng-repeat="repo in repos | filter:filter" ng-class="{active:isActiveRow($index)|| isInActiveRows($index)}" ng-click="setActiveRow($index)" style="cursor: pointer"><td ng-repeat="row in rows"><span ng-bind="render(row, repo)"></span></td></tr></table></div>',
        link: function(scope, element, attrs) {
            /**
             * Setting up default value
             */
            scope.source = scope.source || 'https://api.github.com/users/substack/repos';
            scope.rows = scope.rows || ['id', 'name', 'private', 'html_url', 'owner', 'description'];
            scope.filter = scope.filter || false;
            scope.render = function (row, repo) {
                if(typeof scope.myRender(row, repo) !== 'undefined'){
                    return scope.myRender(row, repo);
                } else {
                    val = repo[row];
                    if(row == 'owner'){
                        val = repo.owner.login;
                    }
                    return val;
                }
            };

            /**
             * Logic for click on the row
             */
            scope.activeRow = false;
            scope.isActiveRow = function (i) {
                return scope.activeRow === i;
            };
            scope.setActiveRow = function (i) {
                scope.activeRow = scope.isActiveRow(i) ? false : i;
            };

            /**
             * Logic for setActiveItems function
             */
            scope.activeRows = [];
            scope.isInActiveRows = function (index) {
                for(var i=0; i < scope.activeRows.length; i++){
                    if(scope.activeRows[i] === index){
                        return true;
                    }
                }
                return false;
            };
            scope.addActiveItem = function(i){
                scope.activeRows.push(i);
            };
            scope.setActiveItems = function (obj) {
                var handle = false;
                var handles = [];
                scope.activeRows = [];
                for(key in obj){
                    handle = key;
                    break;
                }
                handles = handle.split('.');
                for(var i=0; i < scope.repos.length; i++){
                    if(handles.length == 1){
                        if(scope.repos[i][handles[0]] == obj[handle]){
                            scope.addActiveItem(i);
                        }
                    } else {
                        if(scope.repos[i][handles[0]][handles[1]] == obj[handle]){
                            scope.addActiveItem(i);
                        }
                    }
                }
            };

            /**
             * load data
             */
            $http.get(scope.source)
                .success(function(res) {
                    scope.repos = res;
                    scope.setActiveItems({ "name": "adventure" });
            });
        }
    };
});
