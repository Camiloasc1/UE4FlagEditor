"use strict";
var app = angular.module('UE4FlagEditor', ['ngRoute']);

app.controller('FlagEditor', ['$scope', function ($scope) {
    $scope.lock = false;
    $scope.source = '';
    $scope.numberDec = 0;
    $scope.numberBin = $scope.numberDec.toString(2);
    $scope.flags = [];

    $scope.lock = function () {
        $scope.locked = true;
    };

    $scope.release = function () {
        setTimeout(function () {
            $scope.locked = false;
        }, 0);
    };

    $scope.$watch('source', function () {
        if ($scope.source.length < 10) {
            $scope.flags = [];
        } else {
            // https://github.com/antlr/antlr4/blob/master/doc/javascript-target.md
            // https://tomassetti.me/antlr-and-the-web/
            // https://stackoverflow.com/questions/25990158/antlr-4-avoid-error-printing-to-console
            var errorListener = new MyErrorListener();
            var chars = new antlr4.InputStream($scope.source);
            var lexer = new CPP14Lexer(chars);
            lexer.removeErrorListeners();
            lexer.addErrorListener(errorListener);
            var tokens = new antlr4.CommonTokenStream(lexer);
            var parser = new CPP14Parser(tokens);
            parser.removeErrorListeners();
            parser.addErrorListener(errorListener);
            parser.buildParseTrees = true;
            var tree = parser.translationunit();

            if (errorListener.errors.length === 0) {
                var listener = new EnumListener();
                antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
                $scope.flags = listener.elements;
                $scope.errors = [];

                $scope.flags = $scope.flags.filter(function (f) {
                    return f.value !== 0;
                });
            } else {
                $scope.flags = [];
                $scope.errors = errorListener.errors;
            }
        }
    });

    $scope.$watch('numberDec', function () {
        if ($scope.numberDec === null) {
            return;
        }

        $scope.numberBin = $scope.numberDec.toString(2);

        $scope.lock();

        $scope.flags.forEach(function (f) {
            f.state = ($scope.numberDec & f.value) === f.value;
        });

        $scope.release();
    });

    $scope.$watch('numberBin', function () {
        if ($scope.numberBin === null || $scope.numberBin === '') {
            return;
        }

        $scope.numberDec = parseInt($scope.numberBin, 2);
    });

    $scope.$watch('flags', function () {
        if ($scope.locked) {
            return;
        }

        $scope.numberDec = 0;
        $scope.flags.forEach(function (f) {
            $scope.numberDec += f.state ? f.value : 0;
        });
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