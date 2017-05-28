(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .controller('DepartmentDemoController', DepartmentDemoController);

    DepartmentDemoController.$inject = ['Department'];

    function DepartmentDemoController(Department) {

        var vm = this;

        vm.departments = [];

        loadAll();

        function loadAll() {
            Department.query(function(result) {
                vm.departments = result;
                vm.searchQuery = null;
            });
        }
    }
})();
