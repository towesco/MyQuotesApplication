(function (app) {
    var ListController = function ($rootScope, $scope, quotesService, $routeParams) {
        var tagName = $routeParams.tagName;
        var favorites = $routeParams.favorites;
        console.log(favorites);

        if (tagName != null) {
            quotesService.getAllByTag(tagName).success(function (data) {
                $scope.quotesList = data;
            });
        }
        else if (favorites != null) {
            quotesService.getAllByFavorites().success(function (data) {
                $scope.quotesList = data;
            });
        }
        else {
            quotesService.getAllById().success(function (data) {
                $scope.quotesList = data;
            });
        }

        $scope.UrlShort = function (url) {
            var shortUrl = url.split("://")[1];

            return shortUrl.slice(0, 30) + "...";
        }

        $scope.delete = function (item) {
            quotesService.destroy(item.Id).success(function () {
                var index = $scope.quotesList.indexOf(item);
                $scope.quotesList.splice(index, 1);
                $rootScope.loadMenu();
            })
        }

        $scope.activeFavorite = function (item) {
            quotesService.activeFavorite(item.Id).success(function (q) {
                var index = $scope.quotesList.indexOf(item);

                $scope.quotesList[index] = q;
                $rootScope.loadMenu();
            })
        }
    };
    app.controller("ListController", ListController);
}(angular.module("MyApp")))