(function (app) {
    var ListController = function ($scope, quotesService, $routeParams) {
        var tagName = $routeParams.tagName;
        console.log(tagName);

        if (tagName != null) {
            quotesService.getAllByTag(tagName).success(function (data) {
                $scope.quotesList = data;
            });
        }
        else {
            quotesService.getAllById().success(function (data) {
                $scope.quotesList = data;
            });
        }
    };
    app.controller("ListController", ListController);
}(angular.module("MyApp")))