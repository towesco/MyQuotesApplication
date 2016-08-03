(function () {
    var app = angular.module("MyApp", ["ngRoute"]);

    var config = function ($routeProvider) {
        $routeProvider
        .when("/list", { templateUrl: "/Client/Views/List.html" })
        .when("/tag/:tagName", { templateUrl: "/Client/Views/List.html" })
        .when("/list/:favorites", { templateUrl: "/Client/Views/List.html" })
        .otherwise({ redirectTo: "/list" });
    };
    app.config(config);

    app.run(function () {
        console.log("modul run");
    });

    app.constant("productUrl", "/api/quotes/");
    app.constant("userId", $("#userId").val());

    app.controller("bodyController", function ($rootScope, $scope, quotesService) {
        $rootScope.loadMenu = function () {
            quotesService.getTagMenu().success(function (data) {
                console.log(data);
                $rootScope.tagMenu = data;
            });
        }

        $rootScope.loadMenu();
    })
}())