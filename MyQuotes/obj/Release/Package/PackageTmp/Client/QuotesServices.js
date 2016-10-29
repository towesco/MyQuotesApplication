(function (app) {
    var quotesService = function ($http, productUrl, userId) {
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

        var getAllByColor = function (color) {
            return $http.get(productUrl + "GetQuotesByColor/" + userId + "/" + color);
        }
        var getUpdateTag = function (id, tag) {
            return $http.get(productUrl + "GetQutesTagUpdate/" + userId + "/" + id + "/" + tag);
        }

        var destroy = function (id) {
            return $http.delete(productUrl + id);
        }
        var activeFavorite = function (id) {
            return $http.get(productUrl + "GetQutesFavoriteActive/" + userId + "/" + id);
        }

        var getUpdateColor = function (id, color) {
            var data = {
                pid: userId,
                color: color,
                id: id
            };

            return $http.get(productUrl + "GetUpdateColor/" + data.pid + "/" + data.id + "/" + data.color);
        };

        return {
            getAllById: getAllById,
            getAllByTag: getAllByTag,
            destroy: destroy,
            activeFavorite: activeFavorite,
            getTagMenu: getTagMenu,
            getAllByFavorites: getAllByFavorites,
            getUpdateTag: getUpdateTag,
            getUpdateColor: getUpdateColor,
            getAllByColor: getAllByColor
        };
    }

    app.factory("quotesService", quotesService);
}(angular.module("MyApp")))