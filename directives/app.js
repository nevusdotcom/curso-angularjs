/**
 * Created by nevus on 11/02/2017.
 */

angular.module("CustomDirective", [])
    .directive("myAutoComplete", function () {

        function link(s, e, a) {
            console.log(s[a.myAutoComplete]);
            $(e).autocomplete({
                source: s[a.myAutoComplete],
                select: function (ev, ui) {
                    ev.preventDefault();
                    if (ui.item) {
                        s.optionSelected(ui.item.value);
                    }
                },
                focus: function (ev, ui) {
                    ev.preventDefault();
                    $(this).val(ui.item.label);
                }
            });
        }
        return {
            link: link
        }
    })
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
        s.repos = [];
        s.git_url = "https://api.github.com/users/nevusdotcom/repos";

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

    }]);

