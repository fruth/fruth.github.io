var AsteroidController = function($scope, AsteroidService) {
    
    $scope.resetDates = function (refreshUI = false) {
        $scope.start = new Date();
        $scope.end = new Date($scope.start);
        $scope.hazardousOnly = false;
        if (refreshUI) $scope.getAsteroids();
    };
    
    $scope.getAsteroids = function () {
        
        try {

            AsteroidService
                .pull($scope.start, $scope.end)
                .then(function(asteroids) {
                
                    if (typeof asteroids !== 'undefined') {
                        console.log('asteroids loaded into controller', asteroids);
                        $scope.asteroids = asteroids;
                        $scope.error = false;
                    } else {
                        $scope.error = "Error! Please select a maximum range of 7 days.";
                    }
                    
                    $scope.$apply();
                });

        } catch (e) {
            console.error('CRITICAL ERROR! ' + e);
            $scope.error = "Error! Please Try Again Later.";
        }
    };

    $scope.resetDates();
    $scope.getAsteroids();
};

app.controller('AsteroidController', AsteroidController);
