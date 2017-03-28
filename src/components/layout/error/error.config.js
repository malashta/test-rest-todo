config.$inject = ['$stateProvider'];

export default function config($stateProvider) {
  $stateProvider
    .state('error', {
      title: 'Page not found',
      params: {
        code: null,
        message: ''
      },
      views: {
        'nav@': {},
        'content@': {
          template: require('./error.jade'),
          controller: 'ErrorController',
          controllerAs: 'errorCtrl'
        },
        'footer@': {
          template: require('../footer/footer.jade'),
          controller: 'FooterController',
          controllerAs: 'footer'
        }
      },
      data: {
        bodyClass: 'sub-2'
      }
    });
}