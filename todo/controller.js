/**
 * Created by nevus on 10/02/2017.
 */
var app = angular.module("ToDoApp", ["LocalStorageModule"]);

app
    .filter("removeHTML", function () {
        return function (texto) {
            return String(texto).replace(/<[^>]+>/gm, '');

        }
    })
    .controller("ToDoController", ["$scope", "localStorageService", function (s, lss) {
        if (lss.get("angular-ToDoList")) {
            s.todo = lss.get("angular-ToDoList");
        } else {
            s.todo = [];
        }

        /*
         {
         actividad: "Terminar el Curso de AngularJS",
         fecha: "10/02/2017 20:00"
         }
         */

        s.titulo = "Mi Titulo";

        /*setTimeout(function () {
         s.$apply(function () {
         s.titulo = "Mis Actividades";

         });
         }, 2000);*/

        $('#titulo').on("mouseenter",function() {
            s.$apply(function () {
                s.titulo = "Mis Actividades";
                console.log(s.titulo);
            });
        });

        s.$watchCollection("todo", function () {

            lss.set("angular-ToDoList", s.todo);
        });

        s.addActividad = function () {
            s.todo.push(s.nuevaActividad);
            s.nuevaActividad = {};
        }

        s.clean = function () {
            s.todo = [];
        };
    }
    ])
;