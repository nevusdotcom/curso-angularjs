/**
 * Created by nevus on 10/02/2017.
 */
var app = angular.module("MyFirstApp", []);
app.controller("MyFirstController",["$scope", function (s) {
    s.nombre = "Renzo";
    s.nuevoComentario = {comentario: "hola", username:"usuario"};
    s.comentarios = [
        {
            comentario: "Buen Tutorial",
            username: "codigofacilito"
        },
        {
            comentario: "Malisimo Tutorial",
            username: "otro_usuario"
        }
    ];
    s.agregarComentario = function () {
        s.comentarios.push(s.nuevoComentario);
        s.nuevoComentario={};
    }
}]);