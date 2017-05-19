"use strict";
var app = angular.module('UE4FlagEditor', ['ngRoute']);

app.controller('FlagEditor', ['$scope', function ($scope) {
    $scope.source = '0123456789';
    $scope.numberDec = 0;
    $scope.numberBin = $scope.numberDec.toString(2);
    $scope.flags = [];

    $scope.update = function () {
        $scope.numberDec = parseInt($scope.numberBin, 2);
        $scope.numberBin = $scope.numberDec.toString(2);
    };

    $scope.$watch('source', function () {
        if ($scope.source.length < 10) {
            $scope.flags = [];
        } else {
            $scope.flags = [{name: 'Flag1', value: 2048, state: true}, {name: 'Flag2', value: 16, state: false}];
        }
    });

    $scope.$watch('numberDec', function () {
        $scope.numberBin = $scope.numberDec.toString(2);
    });

    $scope.$watch('numberBin', function () {
        $scope.numberDec = parseInt($scope.numberBin, 2);
    });

    $scope.$watch('flags', function () {
        $scope.numberDec = 0;
        $scope.flags.forEach(function (f) {
            $scope.numberDec += f.state ? f.value : 0;
        })
    }, true);
}]);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/FlagEditor.html',
            controller: 'FlagEditor'
        })

        .otherwise({redirectTo: '/'});

    //html5mode causes several issues when the front end is embedded with the web service.
    $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');
}]);