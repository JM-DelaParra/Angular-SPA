(function() {

    var app = angular.module('myApp.view.one', ['myApp.factory']);

    app.controller('ViewOne', function(Factory) {
        this.myVar = Factory.myVar;
        this.myObject = Factory.myObject;
    });

})();