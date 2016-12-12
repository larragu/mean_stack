'use strict';

angular.module('calculatorApp')

//All logic is done in the calculator's service.
.service('calculatorService', function() {

	var service = {};

	service.input = '0';
	var isNew = true;
	var isBroken = false;

	service.calculate = function(value) {

		//Contrary to popular belief, eval() is not always evil. 
		//I can use it on the client-side, but NEVER on the server-side.
		if(value === '=')
		{
			//Valid
			try {
				service.input = eval(service.input);
			}
			//Invalid mathematical expression
			catch(error) {
				service.input = "ERROR";
				isBroken = true;
			}
		}
		//Clear screen
		else if(value ==='ac')
		{
			service.input = '0';	
			isNew = true;
			isBroken = false;
		}
		else
		{
			//Start over
			if(isNew)
			{
				service.input = value;
				isNew = false;
			}
			//Append value as long as there is no error
			else if(!isBroken)
			{
				service.input += value;	
			}		
		}
	}

	return service;

})