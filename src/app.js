import angular from 'angular';
import uirouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import config from './app.config';
import run from './app.run';
import components from './components';
import services from './services';
import constant from './app.constant';
import directives from './directives';

import AppController from './app.controller';

angular.module('app', [
  uirouter,
  uiBootstrap,
  components,
  constant,
  services,
  directives
]).config(config)
  .controller('AppController', AppController)
  .run(run);