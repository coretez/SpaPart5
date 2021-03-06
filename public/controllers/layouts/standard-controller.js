(function( ng, app ){
	"use strict";

	app.controller(
		"layouts.StandardController",
		function( $scope, requestContext, _ ) {

			// --- Define Controller, Scope Methods, Controller Variables. ---- //

			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard" )

			// The subview indicates which view is going to be rendered on the page.
			$scope.subview = renderContext.getNextSection();
			
			// --- Bind To Scope Events. ------------------------ //

			// I handle changes to the request context.
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
			$scope.setWindowTitle( "Simple" );
		}
	);

})( angular, Simple );