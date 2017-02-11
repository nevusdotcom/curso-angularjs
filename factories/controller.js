/**
 * Created by nevus on 10/02/2017.
 */
var app = angular.module("ToDoApp", ["LocalStorageModule"]);

app
    .factory("ToDoService", ["localStorageService", function (lss) {
        var toDoService = {};
        toDoService.key = "angular-ToDoList";
        if (lss.get(toDoService.key)) {
            toDoService.actividades = lss.get(toDoService.key);
        }
        else {
            toDoService.actividades = [];
        }

        toDoService.add = function (nuevaActividad) {
            toDoService.actividades.push(nuevaActividad);
            toDoService.uploadLocalStorage();
        }

        toDoService.uploadLocalStorage = function () {
            lss.set(toDoService.key, toDoService.actividades);
        }

        toDoService.clean = function () {
            toDoService.actividades = [];
            toDoService.uploadLocalStorage();
            return toDoService.getAll();
        }

        toDoService.getAll = function () {
            return toDoService.actividades;
        }

        toDoService.removeItem = function (item) {
            console.log(item);
            toDoService.actividades = toDoService.actividades.filter(function (actividad) {
                return actividad !== item;
            });
            toDoService.uploadLocalStorage();
            return toDoService.getAll();

        }
        return toDoService;
    }])
    .controller("ToDoController", ["$scope", "ToDoService", function (s, ts) {
        /*
         {
         actividad: "Terminar el Curso de AngularJS",
         fecha: "10/02/2017 20:00"
         }
         */


        s.todo = ts.getAll();
        s.nuevaActividad = {};
        s.addActividad = function () {
            ts.add(s.nuevaActividad);
            s.nuevaActividad = {};
        }

        s.removeActividad = function (item) {
            s.todo = ts.removeItem(item);

        }

        s.cleanActivities = function () {
            s.todo = ts.clean();

        }
    }]);