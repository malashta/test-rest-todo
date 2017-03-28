config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function config($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('root', {
    url: '',
    title: 'Angular - metro',
    views: {
      'nav@': {
        template: require('./components/layout/nav/nav.jade'),
        controller: 'NavController',
        controllerAs: 'nav'
      },
      'footer@': {
        template: require('./components/layout/footer/footer.jade'),
        controller: 'FooterController',
        controllerAs: 'footer'
      }
    }
  });
  
  $urlRouterProvider.rule(function ($injector, $location) {
    let path = $location.path(), normalized = path.toLowerCase();
  
    if ('/' === normalized[normalized.length - 1]) {
      return normalized.replace(/\/$/, '');
    }
  
    if (normalized.indexOf('/?') > -1) {
      return normalized.replace('/?', '?');
    }
    
    if (path != normalized) {
      $location.replace().path(normalized);
    }
  });

  $urlRouterProvider.otherwise(($injector, $location) => {
    const state = $injector.get('$state');

    state.transitionTo('error');

    return $location.path();
  });
}