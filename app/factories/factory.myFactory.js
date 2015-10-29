(function() {

    var app = angular.module('myApp.factory', []);

    app.factory('Factory', function() {
        var factory = {};
        factory.myVar = "factory.myVar";
        factory.myObject = {
            attribute1: "factory.myObject.attribute1",
            attribute2: "factory.myObject.attribute2"
        };
        return factory;
    });

})();