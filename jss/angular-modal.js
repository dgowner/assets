app.directive("modalShow", function ($parse) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            //Hide or show the modal
            scope.showModal = function (visible, elem) {
                if (!elem)
                    elem = element;

                if (visible)
                    $(elem).modal("show");                     
                else
                    $(elem).modal("hide");
            }

            //Watch for changes to the modal-visible attribute
            scope.$watch(attrs.modalShow, function (newValue, oldValue) {
                scope.showModal(newValue, attrs.$$element);
            });

            //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
            $(element).bind("hide.bs.modal", function () {
                $parse(attrs.modalShow).assign(scope, false);
                if (!scope.$$phase && !scope.$root.$$phase)
                    scope.$apply();
            });
        }

    };
});

app.directive("modalDismiss", function ($parse) {
   return {
	   restrict: "A",
	   link: function (scope, element, attrs) {
         scope.$watch(attrs.modalShow, function (newValue, oldValue) {
            if(oldValue && !newValue) {
               scope.$eval(attrs.modalDismiss);
               if (!scope.$$phase && !scope.$root.$$phase)
                  scope.$apply();
            }
         });
	   }
   }
});
