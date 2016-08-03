(function (app) {
    var quotesService = function ($http, productUrl, userId) {
        console.log(userId);
        var getAllById = function () {
            return $http.get(productUrl + "GetQuotesById/" + userId);
        };

        var getAllByFavorites = function () {
            return $http.get(productUrl + "GetQuotesByFavorites/" + userId);
        };

        var getTagMenu = function () {
            return $http.get(productUrl + "GetQutesTagList/" + userId);
        }

        var getAllByTag = function (tag) {
            return $http.get(productUrl + "GetQuotes/" + userId + "/" + tag);
        }

        var destroy = function (id) {
            return $http.delete(productUrl + id);
        }
        var activeFavorite = function (id) {
            return $http.get(productUrl + "GetQutesFavoriteActive/" + userId + "/" + id);
        }

        return {
            getAllById: getAllById,
            getAllByTag: getAllByTag,
            destroy: destroy,
            activeFavorite: activeFavorite,
            getTagMenu: getTagMenu,
            getAllByFavorites: getAllByFavorites
        };
    }

    app.factory("quotesService", quotesService);
}(angular.module("MyApp")))