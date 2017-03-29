import angular from 'angular';

import WorkService from './work.service.js';
import SagasService from './sagas.service';

export default angular.module('app.services.common', [
  WorkService,
  SagasService
])
  .name;