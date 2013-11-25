(function( ng, app ){
	"use strict";

	app.controller(
		"profile.Signup",
		function( $scope, $http, $window, requestContext, _ ) {

			// --- Define Controller Methods. ------------------- //

			// --- Define Scope Methods. ------------------------ //

			$scope.user = {};
			
			$scope.submit = function() {
				$http({
				  url: '/user/signup/',
				  method: "POST",
				  data: $.param($scope.user),
				  headers: {
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				  }
				}).
				      success(function(data) {
				        $window.location.href = "/#/listUsers";
				      });
			  };

			// --- Define Controller Variables. ----------------- //

			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard.signup" )

			// --- Define Scope Variables. ---------------------- //

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
			$scope.setWindowTitle( "Please Sign Up" );
		}
	);

})( angular, Simple );