import angular from 'angular';

import FooterController from './footer.controller'

export default angular.module('app.footer', [])
  .controller('FooterController', FooterController)
  .name;