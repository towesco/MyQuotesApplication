(function (app) {
    var ListController = function ($rootScope, $scope, quotesService, $routeParams) {
        var tagName = $routeParams.tagName;
        var favorites = $routeParams.favorites;
        var colorName = $routeParams.colorName;
        $rootScope.$on('$routeChangeSuccess', function (event, currRoute, prevRoute) {
            var tag = location.href.split("#")[1];

            $(".myListTag a").removeClass("active");

            $(".myListTag a[href$='" + tag + "']").addClass("active");
        });

        if (tagName != null) {
            quotesService.getAllByTag(tagName).success(function (data) {
                $scope.quotesList = data;

                $rootScope.header = data[0].tag;
            });
        }
        else if (colorName != null) {
            quotesService.getAllByColor(colorName).success(function (data) {
                $scope.quotesList = data;
                $rootScope.header = "Renk";
            });
        }

        else if (favorites != null) {
            quotesService.getAllByFavorites().success(function (data) {
                $scope.quotesList = data;
                $rootScope.header = "Favorilerim";
            });
        }
        else {
            quotesService.getAllById().success(function (data) {
                $scope.quotesList = data;
                $rootScope.header = "Tüm notlarım";
                console.log("hepsi geldi");
            });
        }
        //url kısaltma
        $scope.UrlShort = function (url) {
            var shortUrl = url.split("://")[1];

            return shortUrl.slice(0, 30) + "...";
        }

        //Silme işlemi
        $scope.delete = function (item) {
            quotesService.destroy(item.Id).success(function () {
                var index = $scope.quotesList.indexOf(item);
                $scope.quotesList.splice(index, 1);
                $rootScope.loadMenu();
            })
        }
        //tag label güncelleme
        $rootScope.updateTagLabel = function (item) {
            var index = $scope.quotesList.indexOf(item);
            $scope.quotesList[index] = item;
        }
        //tag modul gösterme
        $scope.updateTag = function (quotes) {
            console.log(quotes);
            var txtTag = [];
            angular.copy(quotes, txtTag)

            $rootScope.quotes = quotes;
            var txt = {
                tag: quotes.tag
            };

            $scope.txt = txt;

            $("#EditTagModul").modal("show");
        }

        $scope.tagUpdate = function (tag) {
            var quotes = $rootScope.quotes;

            quotesService.getUpdateTag(quotes.Id, tag).success(function () {
                quotes.tag = tag;
                $rootScope.updateTagLabel(quotes);

                $rootScope.loadMenu();

                $("#EditTagModul").modal("hide");
            });
        }

        //favori aktif etme
        $scope.activeFavorite = function (item) {
            quotesService.activeFavorite(item.Id).success(function (q) {
                var index = $scope.quotesList.indexOf(item);

                $scope.quotesList[index] = q;
                $rootScope.loadMenu();
            })
        }

        $scope.showColorMenu = function (quotes) {
            var index = $scope.quotesList.indexOf(quotes);

            quotes.colorMenuShow = true;
            $scope.quotesList[index] = quotes;
        }

        $scope.updateColor = function (quotes, color) {
            quotesService.getUpdateColor(quotes.Id, color).success(function () {
                quotes.color = color;
                quotes.colorMenuShow = false;
                var index = $scope.quotesList.indexOf(quotes);

                $scope.quotesList[index] = quotes;
            })
        }
    };
    app.controller("ListController", ListController);
}(angular.module("MyApp")))