config.$inject = ['$stateProvider'];

export default function config($stateProvider) {
  $stateProvider
    .state('root.home', {
      url: '/',
      title: 'TODO - DEMO',
      views: {
        'content@': {
          controller: 'HomeController',
          template: require('./home.jade'),
          controllerAs: 'home'
        }
      }
    });
}