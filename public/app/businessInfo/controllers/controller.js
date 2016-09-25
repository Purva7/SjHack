app.controller('businessinfoCtrl', ['$scope', 'Businessinfo', '$mdSidenav', '$mdToast', '$mdDialog', function ($scope, Businessinfo, $mdSidenav, $mdToast, $mdDialog) {

    $scope.toggle = function () {
        $mdSidenav('left').toggle();
    };
    
    $scope.binfos = Businessinfo.query();
    
    $scope.newBusinessinfo = new Businessinfo();

    $scope.reset = function () {
        $scope.newBusinessinfo = new Businessinfo();
    };
    
    $scope.show = function (biz) {
        $scope.newBusinessinfo = biz;
    };
    
    $scope.save = function () {
        var i = -1; 
        var j = 0;
        
        $scope.binfos.forEach(function(biz){
            if(biz.id === $scope.newBusinessinfo.id){
                i = j;
            }
            j = j++;
        });
        
        $scope.newBusinessinfo.$save().then(function (success) {
            if (i >= 0) {
                $scope.binfos[i] = success;
            } else {
                $scope.binfos.push(success);
            };

            $mdToast.show(
                $mdToast.simple()
                .content('Saved!')
                .position('right bottom')
            );
            $scope.reset();
        }, function (err) {
            if (err.status === 401) {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Unauthorized')
                    .position('right bottom')
                );
            } else {
                console.log(err);
                $mdToast.show(
                    $mdToast.simple()
                    .content('An error occured!')
                    .position('right bottom')
                );
            }
        });
    };
    
    $scope.delete = function ($event, biz) {
        $mdDialog.show(
            $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Delete')
            .content('Are you sure you want to delete this content?')
            .ariaLabel('Delete dialog')
            .ok('Delete')
            .cancel('Cancel')
            .targetEvent($event)
        ).then(function () {
            biz.$delete().then(function (success) {
                var i = $scope.binfos.indexOf(biz);
                $scope.binfos.splice(i, 1);
                $scope.reset();
                
            }, function (err) {
                console.log(err);
                if (err.status === 401) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Unauthorized.')
                        .position('right bottom')
                    );
                } else {
                    console.log(err);
                    $mdToast.show(
                        $mdToast.simple()
                        .content('An error occured!')
                        .position('right bottom')

                    );
                }
            });
        });
    };
}]);