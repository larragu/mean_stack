'user strict';

angular.module('calculatorApp')

.directive('calculator',function() {

	return {
		restrict: 'E',
		templateUrl:'calculator.htm',
		replace: true,
		controller: 'calculatorController'
	}


});