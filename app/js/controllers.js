angular.module('remoteWork.controllers', ['ngSanitize']).

  /* Drivers controller */
  controller('vacanciesController', function($scope, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.vacanciesList = [];

    $scope.searchFilter = function (vacancy) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(vacancy.name);// || re.test(driver.Driver.familyName);
    };

    ergastAPIservice.getVacancies(1).success(function (response) {
        //Digging into the response to get the relevant data
        $scope.vacanciesList = response.items;
    });

  
    
    /*
    ergastAPIservice.getVacancies(2).success(function (response) {
        //Digging into the response to get the relevant data
        console.log(response.items);
        $scope.vacanciesList2 = response.items;
    });
    */
  }).

  /* Driver controller */
  controller('vacancyController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.vacancy = null;
    $scope.chartCol = [0, 1, 2, 3];
    $scope.onlyNumbers = /^\d+$/;
    $scope.dataSample = [
      {"cat": "One", "val": 20},
      {"cat": "Two", "val": 10},
      {"cat": "Three", "val": -30},
      {"cat": "Four", "val": 40},
    ];
    var chart = new Chart();
    chart.drawBar($scope.dataSample);
    ergastAPIservice.getVacancyDetails($scope.id).success(function (response) {
        console.log(response);
        $scope.vacancy = response; 
    });


    $scope.getGraph = function () {
        //Digging into the response to get the relevant data
        $scope.vacanciesList = response.items;
    }; 
    
    $scope.updateGraph = function () {
      chart.clear();
      chart.drawBar($scope.dataSample);
    };

    $scope.addData = function (id) {
      $scope.dataSample.push({"cat": "Simple", "val": 20});
      $scope.updateGraph();
    };

    ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races; 
    }); 
  });
