/**
 * Created by nevus on 10/02/2017.
 */
var app = angular.module("ToDoApp", ["LocalStorageModule"]);

app
    .service("ToDoService", ["localStorageService", function (lss) {
        this.key = "angular-ToDoList";
        if (lss.get(this.key)) {
            this.actividades = lss.get(this.key);
        }
        else {
            this.actividades = [];
        }

        this.add = function (nuevaActividad) {
            this.actividades.push(nuevaActividad);
            this.uploadLocalStorage();
        }

        this.uploadLocalStorage = function () {
            lss.set(this.key, this.actividades);
        }

        this.clean = function () {
            this.actividades = [];
            this.uploadLocalStorage();
            return this.getAll();
        }

        this.getAll = function () {
            return this.actividades;
        }

        this.removeItem = function (item) {
            this.actividades = this.actividades.filter(function (actividad) {
                return actividad !== item;
            });
            this.uploadLocalStorage();
            return this.getAll();

        }
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
        s.bandera = false;
    }]);