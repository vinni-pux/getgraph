angular.module('remoteWork', [
  'remoteWork.services',
  'remoteWork.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/vacancies", {templateUrl: "partials/vacancies.html", controller: "vacanciesController"}).
	when("/graph/column", {templateUrl: "partials/column.html", controller: "vacancyController"}).
	when("/graph/line", {templateUrl: "partials/line.html", controller: "vacancyController"}).
	when("/graph/pie", {templateUrl: "partials/pie.html", controller: "vacancyController"}).
	otherwise({redirectTo: '/vacancies'});
}]);
