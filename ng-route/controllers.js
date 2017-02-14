/**
 * Created by nevus on 14-02-17.
 */
angular.module("CustomDirective")
    .controller("AppCtrl", ["$scope", "$http", function (s, h) {
    /*
     https://api.github.com/users/nevusdotcom/repos
     */
    s.repos = [];
    s.git_url = "https://api.github.com/users/twitter/repos";

    s.optionSelected = function (data) {
        s.$apply(function () {
            s.main_repo = data;
        });
    };

    h.get(s.git_url)
        .then(
            function (response) {
                //console.log(response.data);
                s.posts = response.data;
                for (var i = response.data.length - 1; i >= 0; i--) {
                    var repo = response.data[i];
                    s.repos.push(repo.name);
                }
            },
            function (err) {
                console.log(err);

            }
        );

}])
    .controller("RepoController",["$scope","$http","$routeParams",function (s,h,p) {
        s.repo = {};
        s.git_url = "https://api.github.com/repos/twitter/"+p.name;
        h.get(s.git_url)
            .then(
                function (response) {
                    //console.log(response.data);
                    s.repo = response.data;
                    
                },
                function (err) {
                    console.log(err);

                }
            );
    }]);
