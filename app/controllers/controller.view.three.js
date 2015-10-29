(function() {
    
    var app = angular.module('myApp.view.three', []);
    
    app.controller('ViewThree', function(Factory) {
        this.myVar = [{
            id: 0,
            name: 'Item Zero',
            active: false
        }, {
            id: 1,
            name: 'Item One',
            active: false
        }, {
            id: 2,
            name: 'Item Two',
            active: false
        }];
        this.myFunction = function() {
            alert('Hello Angular!');
        };
    });

})();