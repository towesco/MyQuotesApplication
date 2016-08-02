(function (app) {
    var quotesService = function ($http, productUrl, userId) {
        console.log(userId);
        var getAllById = function () {
            return $http.get(productUrl + "GetQuotesById/" + userId);
        };

        var getAllByTag = function (tag) {
            return $http.get(productUrl + "GetQuotes/" + userId + "/" + tag);
        }

        return {
            getAllById: getAllById,
            getAllByTag: getAllByTag
        };
    }

    app.factory("quotesService", quotesService);
}(angular.module("MyApp")))