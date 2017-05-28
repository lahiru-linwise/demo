(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .controller('TaskDemoController', TaskDemoController);

    TaskDemoController.$inject = ['Task'];

    function TaskDemoController(Task) {

        var vm = this;

        vm.tasks = [];

        loadAll();

        function loadAll() {
            Task.query(function(result) {
                vm.tasks = result;
                vm.searchQuery = null;
            });
        }
    }
})();
