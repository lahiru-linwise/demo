(function() {
    'use strict';

    angular
        .module('linwiseApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('department-demo', {
            parent: 'entity',
            url: '/department-demo',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Departments'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/departmentsdemo.html',
                    controller: 'DepartmentDemoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('department-demo-detail', {
            parent: 'department-demo',
            url: '/department-demo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Department'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/department-demo-detail.html',
                    controller: 'DepartmentDemoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Department', function($stateParams, Department) {
                    return Department.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'department-demo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('department-demo-detail.edit', {
            parent: 'department-demo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-demo-dialog.html',
                    controller: 'DepartmentDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('department-demo.new', {
            parent: 'department-demo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-demo-dialog.html',
                    controller: 'DepartmentDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                departmentName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('department-demo', null, { reload: 'department-demo' });
                }, function() {
                    $state.go('department-demo');
                });
            }]
        })
        .state('department-demo.edit', {
            parent: 'department-demo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-demo-dialog.html',
                    controller: 'DepartmentDemoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('department-demo', null, { reload: 'department-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('department-demo.delete', {
            parent: 'department-demo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-demo-delete-dialog.html',
                    controller: 'DepartmentDemoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('department-demo', null, { reload: 'department-demo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
