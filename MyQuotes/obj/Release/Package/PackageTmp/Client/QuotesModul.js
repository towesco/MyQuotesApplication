(function () {
    var app = angular.module("MyApp", ["ngRoute", "ngAnimate"]);

    var config = function ($routeProvider) {
        $routeProvider
        .when("/list", { templateUrl: "/Client/Views/List.html" })
        .when("/tag/:tagName", { templateUrl: "/Client/Views/List.html" })
        .when("/color/:colorName", { templateUrl: "/Client/Views/List.html" })
        .when("/list/:favorites", { templateUrl: "/Client/Views/List.html" })
        .otherwise({ redirectTo: "/list" });
    };
    app.config(config);

    app.run(function () {
        //   console.log("modul run");
    });

    app.constant("productUrl", "/api/quotes/");
    app.constant("userId", $("#userId").val());

    app.controller("bodyController", function ($rootScope, $scope, quotesService) {
        $rootScope.header = "Notlarım";

        var colorList = ["box1", "box2", "box3", "box4", "box5", "box6", "box7"];

        $rootScope.colorList = colorList;

        $rootScope.loadMenu = function () {
            quotesService.getTagMenu().success(function (data) {
                var mainTagList = [];
                angular.copy(data.slice(0, 2), mainTagList);
                $rootScope.mainTagList = mainTagList

                var tagList = [];

                angular.copy(data.slice(2, data.length), tagList);

                $rootScope.tagList = tagList;
            });
        }

        $rootScope.loadMenu();
    })
}())