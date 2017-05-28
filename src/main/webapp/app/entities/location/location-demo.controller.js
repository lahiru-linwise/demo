(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .controller('LocationDemoController', LocationDemoController);

    LocationDemoController.$inject = ['Location'];

    function LocationDemoController(Location) {

        var vm = this;

        vm.locations = [];

        loadAll();

        function loadAll() {
            Location.query(function(result) {
                vm.locations = result;
                vm.searchQuery = null;
            });
        }
    }
})();
