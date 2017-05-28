(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('region-demo', {
            parent: 'entity',
            url: '/region-demo',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Regions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/region/regionsdemo.html',
                    controller: 'RegionDemoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('region-demo-detail', {
            parent: 'region-demo',
            url: '/region-demo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Region'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/region/region-demo-detail.html',
                    controller: 'RegionDemoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Region', function($stateParams, Region) {
                    return Region.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'region-demo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('region-demo-detail.edit', {
            parent: 'region-demo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/region/region-demo-dialog.html',
                    controller: 'RegionDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Region', function(Region) {
                            return Region.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('region-demo.new', {
            parent: 'region-demo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/region/region-demo-dialog.html',
                    controller: 'RegionDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                regionName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('region-demo', null, { reload: 'region-demo' });
                }, function() {
                    $state.go('region-demo');
                });
            }]
        })
        .state('region-demo.edit', {
            parent: 'region-demo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/region/region-demo-dialog.html',
                    controller: 'RegionDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Region', function(Region) {
                            return Region.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('region-demo', null, { reload: 'region-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('region-demo.delete', {
            parent: 'region-demo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/region/region-demo-delete-dialog.html',
                    controller: 'RegionDemoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Region', function(Region) {
                            return Region.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('region-demo', null, { reload: 'region-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
