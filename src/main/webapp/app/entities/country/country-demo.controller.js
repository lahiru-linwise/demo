(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .controller('CountryDemoController', CountryDemoController);

    CountryDemoController.$inject = ['Country'];

    function CountryDemoController(Country) {

        var vm = this;

        vm.countries = [];

        loadAll();

        function loadAll() {
            Country.query(function(result) {
                vm.countries = result;
                vm.searchQuery = null;
            });
        }
    }
})();
