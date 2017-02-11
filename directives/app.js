/**
 * Created by nevus on 11/02/2017.
 */
angular.module("CustomDirective", [])
    .directive("backImg", function () {
        return function (s, e, a) {
            a.$observe('backImg', function (value) {
                var css = {
                    "background": 'url(' + value + ')',
                    "background-size": "cover",
                    "background-position": "center",
                    "border-radius": "50%",
                    "width": "100px",
                    "height": "100px",
                    "display": "inline-block",
                    "border": "1px solid lightgray"
                };
                e.css(css);
            });
        }
    })
    .directive("circular", function () {
        return function (s, e, a) {
            a.$observe('circular', function () {
                var css = {
                    "border-radius": "50%",
                    "width": "100px",
                    "height": "100px",
                    "display": "inline-block",
                    "border": "2px solid #5f5f5f"
                };
                e.css(css);
            });
        }
    })
    .controller("AppCtrl", ["$scope", "$http", function (s, h) {
        /*
         https://api.github.com/users/nevusdotcom/repos
         */
        s.git_url = "https://api.github.com/users/nevusdotcom/repos";
        h.get(s.git_url)
            .then(
                function (response) {
                    //console.log(response.data);
                    s.repos = response.data;
                },
                function (err) {
                    console.log(err);

                }
            );
    }]);

