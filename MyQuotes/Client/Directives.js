(function (app) {
    app.directive('tooltip', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var resultResource = attrs["resource"];

                if (resultResource == "AssignColor") {
                    $(element).attr("title", $("#AssignColor").val());
                }
                else if (resultResource == "EjectFavorite") {
                    $(element).attr("title", $("#EjectFavorite").val());
                }
                else if (resultResource == "AddFavorite") {
                    $(element).attr("title", $("#AddFavorite").val());
                }
                else if (resultResource == "UpdateTag") {
                    $(element).attr("title", $("#UpdateTag").val());
                }
                else if (resultResource == "Remove") {
                    $(element).attr("title", $("#Remove").val());
                }

                $(element).hover(function () {
                    // on mouseenter
                    $(element).tooltip('show');
                }, function () {
                    // on mouseleave
                    $(element).tooltip('hide');
                });
            }
        };
    });

    app.directive('loading', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                scope.isLoading = function () {
                    //angular.forEach($http.pendingRequests, function (value) {
                    //    console.log(value);
                    //})

                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v) {
                    if (v) {
                        // console.log("yükleniyor")
                        elm.show();
                    } else {
                        // console.log("yüklendi.");
                        elm.hide();
                    }
                });
            }
        }
    }]);
}(angular.module("MyApp")))