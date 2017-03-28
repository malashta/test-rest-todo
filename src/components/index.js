/**
 * Created by Tallerr on 21.03.2017.
 */
import angular from 'angular';

import ErrorComponent from './layout/error';
import NavComponent from './layout/nav';
import FooterComponent from './layout/footer';
import HomeComponent from './home';

export default angular.module('app.component', [
  ErrorComponent,
  NavComponent,
  FooterComponent,
  HomeComponent
  ]).name;