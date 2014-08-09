angular.module('remoteWork.services', [])
  .factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.getVacancies = function(id) {
      return $http({
        method: 'GET', 
        withCredentials: false,
        url: 'https://api.hh.ru/vacancies?schedule=remote&specialization=' + id
      });
    }

    ergastAPI.getVacancyDetails = function(id) {
      return $http({
        method: 'GET', 
        withCredentials: false,
        url: 'https://api.hh.ru/vacancies/' + id
      });
    }

    ergastAPI.getDriverRaces = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
      });
    }

    return ergastAPI;
  });
