export default class NavController {
  constructor($scope, $state, $rootScope, _) {
    let self = this;
    let unsub = {};

    this._ = _;
    this.$scope = $scope;
  }
}

NavController.$inject = ['$scope', '$state', '$rootScope', '_'];