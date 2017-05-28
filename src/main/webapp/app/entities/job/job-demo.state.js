(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('job-demo', {
            parent: 'entity',
            url: '/job-demo?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Jobs'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job/jobsdemo.html',
                    controller: 'JobDemoController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
            }
        })
        .state('job-demo-detail', {
            parent: 'job-demo',
            url: '/job-demo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Job'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job/job-demo-detail.html',
                    controller: 'JobDemoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Job', function($stateParams, Job) {
                    return Job.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'job-demo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('job-demo-detail.edit', {
            parent: 'job-demo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job/job-demo-dialog.html',
                    controller: 'JobDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Job', function(Job) {
                            return Job.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-demo.new', {
            parent: 'job-demo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job/job-demo-dialog.html',
                    controller: 'JobDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                jobTitle: null,
                                minSalary: null,
                                maxSalary: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('job-demo', null, { reload: 'job-demo' });
                }, function() {
                    $state.go('job-demo');
                });
            }]
        })
        .state('job-demo.edit', {
            parent: 'job-demo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job/job-demo-dialog.html',
                    controller: 'JobDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Job', function(Job) {
                            return Job.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-demo', null, { reload: 'job-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-demo.delete', {
            parent: 'job-demo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job/job-demo-delete-dialog.html',
                    controller: 'JobDemoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Job', function(Job) {
                            return Job.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-demo', null, { reload: 'job-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
