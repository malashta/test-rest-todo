import angular from 'angular';
import uirouter from 'angular-ui-router';
import sortable from 'ng-sortable';

import config from './home.config';

import HomeController from './home.controller';

export default angular.module('app.home', [uirouter, sortable])
  .config(config)
  .controller('HomeController', HomeController)
  .name;