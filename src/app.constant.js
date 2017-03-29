import angular from 'angular';
import _ from 'lodash';

import {BASE_URL, BASE_RESOURCE_URL} from './app.constant.local';

export default angular.module('app.constants', [])
  .constant('urls', {
    base: BASE_URL,
    resource: BASE_RESOURCE_URL,
    todos : {
      all : '6'
    }
  })
  .constant('events', {
    documentClicked: 'DOCUMENT_CLICKED',
    documentKeyPressed: 'DOCUMENT_KEY_PRESSED',
    todosIsFetched: 'All_TODOS_FETCHED',
    createSuccess: 'CREATE_SUCCESS',
    changeSuccess: 'CHANGE_SUCCESS',
    deleteSuccess: 'DELETE_SUCCESS'
  })
  .constant('_', _)
  .name;