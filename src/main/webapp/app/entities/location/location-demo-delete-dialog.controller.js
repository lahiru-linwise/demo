(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .controller('LocationDemoDeleteController',LocationDemoDeleteController);

    LocationDemoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Location'];

    function LocationDemoDeleteController($uibModalInstance, entity, Location) {
        var vm = this;

        vm.location = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Location.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
