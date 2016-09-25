app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('dashboard.businessinfo', {
            url: '/businessinfo',
            templateUrl: '/dist/app/businessinfo/partials/dashboard.businessinfo.html',
            controller: 'businessinfoCtrl',
            // resolve: {
            //     role: ['$q', 'Users', function ($q, Users) {
            //         var defer = $q.defer();
            //         Users.me(function(me){
            //             if (me.admin || me.main) {
            //                 defer.resolve(200);
            //             } else {
            //                 defer.reject(403);
            //             }
            //         });

            //         return defer.promise;
            //     }]
            // }
        });
}]);