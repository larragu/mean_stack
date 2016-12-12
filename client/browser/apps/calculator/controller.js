'user strict';
angular.module("calculatorApp")

.controller("calculatorController",['$scope','calculatorService', 
	function($scope,calculatorService) {

	$scope.calculator = calculatorService;

}]);