var app = angular.module('asteroidApp', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {    
    $routeProvider.when('/', {
        'controller': 'AsteroidController as ctrl',
        'templateUrl': '~/app/templates/list.html'
    }).otherwise({ redirectTo: '/' });
});
