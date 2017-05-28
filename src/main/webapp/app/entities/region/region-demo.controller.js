(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .controller('RegionDemoController', RegionDemoController);

    RegionDemoController.$inject = ['Region'];

    function RegionDemoController(Region) {

        var vm = this;

        vm.regions = [];

        loadAll();

        function loadAll() {
            Region.query(function(result) {
                vm.regions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
