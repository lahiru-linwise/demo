(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('country-demo', {
            parent: 'entity',
            url: '/country-demo',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Countries'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/country/countriesdemo.html',
                    controller: 'CountryDemoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('country-demo-detail', {
            parent: 'country-demo',
            url: '/country-demo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Country'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/country/country-demo-detail.html',
                    controller: 'CountryDemoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Country', function($stateParams, Country) {
                    return Country.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'country-demo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('country-demo-detail.edit', {
            parent: 'country-demo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/country/country-demo-dialog.html',
                    controller: 'CountryDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Country', function(Country) {
                            return Country.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('country-demo.new', {
            parent: 'country-demo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/country/country-demo-dialog.html',
                    controller: 'CountryDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                countryName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('country-demo', null, { reload: 'country-demo' });
                }, function() {
                    $state.go('country-demo');
                });
            }]
        })
        .state('country-demo.edit', {
            parent: 'country-demo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/country/country-demo-dialog.html',
                    controller: 'CountryDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Country', function(Country) {
                            return Country.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('country-demo', null, { reload: 'country-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('country-demo.delete', {
            parent: 'country-demo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/country/country-demo-delete-dialog.html',
                    controller: 'CountryDemoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Country', function(Country) {
                            return Country.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('country-demo', null, { reload: 'country-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
