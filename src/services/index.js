/**
 * Created by Tallerr on 21.03.2017.
 */
import angular from 'angular';

import requests from './requests';
import common from './common';

export default angular.module('app.services', [
  requests,
  common
]).name;