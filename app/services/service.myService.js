(function() {

    var app = angular.module('myApp.service', []);

    app.service('Service', function() {
        this.myFunction = function() {
            return "service.myFunction()";
        };
    });

})();