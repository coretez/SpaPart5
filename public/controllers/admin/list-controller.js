
	
	
	
	(function( ng, app ){
		"use strict";

		app.controller(
			"admin.ListController",
			function( $scope, $http, $window, requestContext, _ ) {

				// Get the render context local to this controller (and relevant params).
				var renderContext = requestContext.getRenderContext( "standard.listUsers" )


				// The subview indicates which view is going to be rendered on the page.
				$scope.subview = renderContext.getNextSection();

				// --- Bind To Scope Events. ------------------------ //

				// Handle changes to the request context.
				$scope.$on(
					"requestContextChanged",
					function() {
						// Make sure this change is relevant to this controller.
						if ( ! renderContext.isChangeRelevant() ) {
							return;
						}
						// Update the view that is being rendered.
						$scope.subview = renderContext.getNextSection();
					}
				);

				// --- Initialize. ---------------------------------- //
				$scope.setWindowTitle( "List of Users" );
				
				function onViewLoad($scope, $http, $window) {
					$http.get('/admin/user/').success(function(data) {					
						$scope.users = [];

			            for(var i=0; i<data.length; i++) {
			      		  	$scope.users.push(data[i]);
			            }

					 }).error(function(err){
			            console.log("return err");
			            return $window.location.href = '/#/';
	          	  	});
				};

				onViewLoad($scope, $http, $window);
			}
		);

	})( angular, Simple );