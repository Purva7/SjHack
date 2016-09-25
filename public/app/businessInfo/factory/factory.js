app.factory('Businessinfo', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
    return $resource(SERVER_URL + '/businessinfo/:id', {
        id: "@id"
    });
}]);