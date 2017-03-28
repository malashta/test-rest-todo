import angular from 'angular';
import uirouter from 'angular-ui-router';

import config from './error.config';
import ErrorController from './error.controller';

export default angular.module('app.error', [uirouter])
  .config(config)
  .controller('ErrorController', ErrorController)
  .name;