(function() {

    var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'myApp.view.one', 'myApp.view.two', 'myApp.view.three']);

    app.run(function() {
        console.log("Angular Application Loaded");
    });

    app.config(function($routeProvider) {
        $routeProvider
            .when('/one', {
                templateUrl: 'views/view.one.html',
                controller: 'ViewOne',
                controllerAs: 'oneController'
            })
            .when('/two', {
                templateUrl: 'views/view.two.html',
                controller: 'ViewTwo',
                controllerAs: 'twoController'
            })
            .when('/three', {
                templateUrl: 'views/view.three.html',
                controller: 'ViewThree',
                controllerAs: 'threeController'
            })
            .otherwise({
                redirectTo: '/one'
            });
    });

    app.controller('MainController', function($location) {
        this.date = new Date();
        this.goTo = function(url) {
            $location.path(url);
        };
    });

})();