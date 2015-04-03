var app = angular.module('app', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl : 'view/main.html'
            })
            .otherwise({
                templateUrl : 'view/404.html'
            })
    });