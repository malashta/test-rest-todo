run.$inject = [
  '$rootScope',
  '$injector',
  '$state',
];

export default function run($rootScope, $injector, $state) {
  

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log('State change success!');

    if (toState.title) {
      $rootScope.pageTitle = toState.title;
    }

  });
  
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.log('State change error!', error);

    if (error && error.code) {
      switch (error.code) {
        case 400:
          break;
        case 401:
          break;
        case 500:
          break;
        case 404:
        default:
          break;
      }
    }
  });
}