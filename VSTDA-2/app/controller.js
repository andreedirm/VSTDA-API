(function() {
    'use strict';

    angular
        .module('app')
        .controller('todoController', todoController);

    todoController.$inject = ['$scope', 'todoFactory'];

    /* @ngInject */
    function todoController($scope, todoFactory) {
        var vm = this;
        vm.title = 'todoController';

        $scope.sort = 'priority';

        $scope.updateTodo = function(todo) {
            todoFactory.putTodo(todo);

        };

        $scope.togglevis = function(){
            this.visible = !this.visible;
        };
         

        $scope.delete = function(TodoEntry) {
            var index = $scope.todos.indexOf(TodoEntry);
            $scope.todos.splice(index, 1);
            todoFactory.delTodo(TodoEntry.id);
        };

        $scope.todos = [];
        activate();
        $scope.addTodo = function() {
            console.log($scope.newTodo.priority + $scope.newTodo.text);


            var go = $scope.newTodo.priority;
            var stop = $scope.newTodo.text;
            $scope.newTodo = {};
            todoFactory.postTodo(go, stop).then(
                function(response) {
                    console.log(response.data.TodoEntryId);
                    $scope.todos.push({
                        'text': response.data.Entry,
                        'priority': response.data.Priority,
                        'id': response.data.TodoEntryId
                    });

                },
                function(error) {
                    $log.error('failed to get TodoAPI', error);
                });

        };

        function activate() {
            todoFactory.getTodo().then(
                function(response) {
                    console.log(response.data);
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.todos.push({
                            'text': response.data[i].Entry,
                            'priority': response.data[i].Priority,
                            'id': response.data[i].TodoEntryId
                        });
                    }

                },
                function(error) {
                    $log.error('failed to get TodoAPI', error);
                });
        }


    }
})();
