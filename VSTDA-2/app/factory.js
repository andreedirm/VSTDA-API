(function() {
    'use strict';

    angular
        .module('app')
        .factory('todoFactory', todoFactory);

    todoFactory.$inject = ['$http', '$q', '$log'];

    /* @ngInject */
    function todoFactory($http, $q, $log) {
        var service = {
            getTodo: getTodo,
            postTodo: postTodo,
            delTodo: delTodo,
            putTodo: putTodo
        };
        return service;

        ////////////////

        function getTodo() {
            var defer = $q.defer();

            $http({
                    method: 'GET',
                    url: 'http://localhost:54194/api/todoentries'
                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject(response);
                        }
                    },
                    function(error) {
                        defer.reject(error);
                        $log.error(error);
                    });

            return defer.promise;
        }

        function postTodo(prio, task) {
            var defer = $q.defer();
            var obj = new Object();
            obj.Entry = task;
            obj.Priority = prio;
            console.log(task);
            console.log(prio);


            $http({
                    method: 'POST',
                    url: 'http://localhost:54194/api/todoentries',
                    data: obj
                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject(response);
                        }
                    },
                    function(error) {
                        defer.reject(error);
                        $log.error(error);
                    });

            return defer.promise;
        }


        function delTodo(Entry) {
            var defer = $q.defer();
            var url = 'http://localhost:54194/api/todoentries/' + Entry;
            console.log('mo');
            $http({
                    method: 'DELETE',
                    url: url
                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject(response);
                        }
                    },
                    function(error) {
                        defer.reject(error);
                        $log.error(error);
                    });

            return defer.promise;
        }

        function putTodo(todo) {
            var defer = $q.defer();
            var url = 'http://localhost:54194/api/todoentries/' + todo.id;
            var object = new Object();
            object.Priority = todo.priority;
            object.Entry = todo.text;
            object.TodoEntryId = todo.id;



            $http({
                    method: 'PUT',
                    url: url,
                    data: object

                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject(response);
                        }
                    },
                    function(error) {
                        defer.reject(error);
                        $log.error(error);
                    });

            return defer.promise;

        }
    }
})();
