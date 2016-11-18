app.filter('filterAsteroids', function() {
    return function(asteroids, hazardousOnly) {
        
        var filtered = [];
        
        angular.forEach(asteroids, function(asteroid) {
            
            if(hazardousOnly && asteroid.is_potentially_hazardous_asteroid) {
                filtered.push(asteroid);
            } else if (!hazardousOnly) {
                filtered.push(asteroid);
            }
            
        });
        
        return filtered;
    };
});