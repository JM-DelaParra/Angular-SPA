(function() {

    var app = angular.module('myApp.view.two', ['myApp.service']);

    app.controller('ViewTwo', function(Service) {
        this.myFunction = function() {
            var aux = Service.myFunction();
            return aux;
        };
    });

})();