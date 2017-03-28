export default class AppController {
  constructor($scope, $rootScope, $document, events) {
        
    let onClick = (event) => {
      if (event) {
        $rootScope.$emit(events.documentClicked, event);
      }
    };
    
    let onKeyPressed = (event) => {
      if (event) {
        $rootScope.$emit(events.documentKeyPressed, event.keyCode || event.which);
      }
    };
    
    // TODO: fix it
    $scope.currentUser = {};
    
    $document.bind('click', onClick);
    $document.bind('keyup', onKeyPressed);
    
    $rootScope.$on('$destroy', () => {
      console.log('app watchers were destroyed');
    });
  }
}

AppController.$inject = ['$scope', '$rootScope', '$document', 'events'];