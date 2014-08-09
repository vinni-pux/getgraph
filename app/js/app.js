angular.module('remoteWork', [
  'remoteWork.services',
  'remoteWork.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/vacancies", {templateUrl: "partials/vacancies.html", controller: "vacanciesController"}).
	when("/vacancy/:id", {templateUrl: "partials/vacancy.html", controller: "vacancyController"}).
	otherwise({redirectTo: '/vacancies'});
}]);
