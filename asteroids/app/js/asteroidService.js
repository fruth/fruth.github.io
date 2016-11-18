var AsteroidService = function($http, $filter) {
    
    var config = {
        url: 'https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=grk3yDfIIZeH50yKGbbAyFU0s6jBZsPDY4iy99cS',
        method: 'GET'
    };
    
    this.formatAsteroids = function(response) {
        
        var asteroidData = [];
        
        angular.forEach(response.data.near_earth_objects, function(field, key) {
            asteroidData = asteroidData.concat(field);
        });
        
        return asteroidData;
        
    };
    
    var errorHandler = function(response) {
        console.error('Failed', response);
    };
    
    this.pull = function (start, end) {
                
        var pullUrl = this.getDataUrl(start, end),
            self = this;
        
        console.log("Pull URL: " + pullUrl);
        
        var request = $http({
            url: pullUrl,
            method: config.method
        }).then(function(response) {
            return self.formatAsteroids(response);
        }, errorHandler);
        
        return request;
    };
    
    this.getDataUrl = function (start, end) {
        var dataUrl = config.url,
            startString = this.formatDate(start),
            endString = this.formatDate(end);
        
        dataUrl = dataUrl
            .replace('START_DATE', startString)
            .replace('END_DATE', endString);
        
        return dataUrl;
        
    }
    
    this.formatDate = function (date) {
        return $filter('date')(date, 'yyyy-MM-dd');
    }
    
};

app.service('AsteroidService', AsteroidService);