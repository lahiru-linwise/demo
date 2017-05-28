(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('job-history-demo', {
            parent: 'entity',
            url: '/job-history-demo',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'JobHistories'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job-history/job-historiesdemo.html',
                    controller: 'JobHistoryDemoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('job-history-demo-detail', {
            parent: 'job-history-demo',
            url: '/job-history-demo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'JobHistory'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job-history/job-history-demo-detail.html',
                    controller: 'JobHistoryDemoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'JobHistory', function($stateParams, JobHistory) {
                    return JobHistory.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'job-history-demo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('job-history-demo-detail.edit', {
            parent: 'job-history-demo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-demo-dialog.html',
                    controller: 'JobHistoryDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobHistory', function(JobHistory) {
                            return JobHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-history-demo.new', {
            parent: 'job-history-demo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-demo-dialog.html',
                    controller: 'JobHistoryDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                startDate: null,
                                endDate: null,
                                language: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('job-history-demo', null, { reload: 'job-history-demo' });
                }, function() {
                    $state.go('job-history-demo');
                });
            }]
        })
        .state('job-history-demo.edit', {
            parent: 'job-history-demo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-demo-dialog.html',
                    controller: 'JobHistoryDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobHistory', function(JobHistory) {
                            return JobHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-history-demo', null, { reload: 'job-history-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-history-demo.delete', {
            parent: 'job-history-demo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-demo-delete-dialog.html',
                    controller: 'JobHistoryDemoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['JobHistory', function(JobHistory) {
                            return JobHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-history-demo', null, { reload: 'job-history-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
