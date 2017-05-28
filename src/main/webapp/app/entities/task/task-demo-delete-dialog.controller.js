(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .controller('TaskDemoDeleteController',TaskDemoDeleteController);

    TaskDemoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Task'];

    function TaskDemoDeleteController($uibModalInstance, entity, Task) {
        var vm = this;

        vm.task = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Task.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
