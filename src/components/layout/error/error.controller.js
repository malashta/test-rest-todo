export default class ErrorController {
  constructor($stateParams) {
    
    console.log('error $stateParams', $stateParams);
  }
}

ErrorController.$inject = ['$stateParams'];