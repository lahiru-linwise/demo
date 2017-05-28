(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .controller('DepartmentDemoDeleteController',DepartmentDemoDeleteController);

    DepartmentDemoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Department'];

    function DepartmentDemoDeleteController($uibModalInstance, entity, Department) {
        var vm = this;

        vm.department = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Department.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
