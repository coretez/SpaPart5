// Create an application module for our release.

var Simple = angular.module( "Simple", []);

// Configure the routing. The $routeProvider will be automatically injected into 
// the configurator.

// This is a skeleton based on AngularJS Routing (https://github.com/bennadel/AngularJS-Routing)

Simple.config(
	function( $routeProvider ){

		// We are mapping routes to render "Actions" rather than a template.
		$routeProvider
	
	// Here is were we define our routes on the load.
	//
	//  In this example we are going to create two main layouts
	//     - single: A splash screen 
	//     - standard: A screen that has a menu
	
	    .when(
	      "/first",
	      	{
	        	action: "standard.first"
	      	}
	      )
	    .when(
			"/second",
			{
				action: "standard.second"
			}
		)
	    .when(
			"/signup",
			{
				action: "standard.signup"
			}
		)
	    .when(
			"/listUsers",
			{
				action: "standard.listUsers"
			}
		)
		.when(
			"/",
			{
				action: "single.splash"
			}
		)
			
		// Send a user the splash screen when we do not understand the route. 
		.otherwise(
			{
				redirectTo: "/"
			}
		);

	}
);