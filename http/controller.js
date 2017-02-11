/**
 * Created by nevus on 10/02/2017.
 */
var app = angular.module("MyFirstApp", []);
app.controller("MyFirstController", ["$scope", "$http", function (s, h) {
    s.posts = [];
    s.newPost = {};
    s.loading = true;
    h.get("https://jsonplaceholder.typicode.com/posts")
        .then(
            function (response) {
                console.log(response.data);
                s.posts = response.data;
                s.loading = false;
            },
            function (err) {
                console.log(err);
                s.loading = false;
            }
        );
    s.addPost = function () {
        h.post("https://jsonplaceholder.typicode.com/posts", {
            title: s.newPost.title,
            body: s.newPost.body,
            id: ""
        })
            .then(
                function (response) {
                    s.posts.push(s.newPost);
                    s.addPost = {};
                },
                function (err) {
                    console.log(err);
                }

            );
    };
}]);