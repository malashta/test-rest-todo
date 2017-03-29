/**
 * Created by smalashta on 3/29/2017.
 */
import angular from 'angular';
import Sortable from './sortable.directive';
import SortableValues from './sortable.values';

export default angular.module('app.directives.sortable', [])
  .value('sortableConfig', SortableValues)
  .directive('sortable', Sortable)
  .name;