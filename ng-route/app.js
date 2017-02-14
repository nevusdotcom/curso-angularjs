/**
 * Created by nevus on 11/02/2017.
 */

angular.module("CustomDirective", ["ngRoute"])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "AppCtrl",
                templateUrl: "templates/home.html"
            })
            .when("/repo/:name", {
                controller: "RepoController",
                templateUrl: "templates/repo.html"
            })
            .otherwise("/");
        ;
    });


