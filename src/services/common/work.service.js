import angular from 'angular';

/**
 * This service for todos api
 */
class WorkService {

  /**
   *
   * @param $rootScope
   * @param $http
   * @param urls
   * @param gen
   * @param mainGen
   * @param events
   * @param TodoService
   */
  constructor($rootScope, $http, urls, gen, mainGen, events, TodoService) {

    //init services
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.urls = urls;
    this.gen = gen;
    this.mainGen = mainGen;
    this.events = events;
    this.todo = TodoService;


    this.getAllTodos = this.getAllTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.getTodosFromServer = this.getTodosFromServer.bind(this);
    this.createNewTodo = this.createNewTodo.bind(this);
    this.updateSelectedTodo = this.updateSelectedTodo.bind(this);
    this.deleteSelectedTodo = this.deleteSelectedTodo.bind(this);

    this.getTodosFromServer();
  }

  /**
   * get all TODOS from server
   *
   * @returns {*}
     */
  getAllTodos() {
    let self = this;
    return self.gen(function*() {
        let data = yield self.todo.getAllTodos();
        return data;
    });
  }

  /**
   * create method
   *
   * @param {Object} data
   * @returns {*}
   */
  createTodo(data) {
    let self = this;
    return self.gen(function*() {
      return yield self.todo.createNewRecord(data);
    });
  }

  /**
   * update method
   *
   * @param {Object} item
   * @returns {*}
   */
  updateTodo(item) {
    let self = this;
    return self.gen(function*() {
      return yield self.todo.changeItem(item);
    });
  }

  /**
   * delete method
   *
   * @param {Object} item
   * @returns {*}
   */
  deleteTodo(item) {
    let self = this;
    return self.gen(function*() {
      return yield self.todo.deleteRecord(item);
    });
  }

  /**
   * Generator for TODOS /GET
   */
  getTodosFromServer() {
    let self = this;
      self.mainGen(function*() {
      try {
        let {data} = yield self.getAllTodos();
        if(data) {
          self.$rootScope.$broadcast(self.events.todosIsFetched, data);
        }
      } catch (err) {
        console.error("Can't fetch data", err);
      }
    });
  }

  /**
   * Generator for TODOS /POST
   */
  createNewTodo(post) {
    let self = this;
    self.mainGen(function*() {
      try {
        let {data} = yield self.createTodo(post);
        if(data) {
          self.$rootScope.$broadcast(self.events.createSuccess, data);
        }
      } catch (err) {
        console.error("Can't fetch data", err);
      }
    });
  }

  /**
   * Generator for TODOS /PATCH
   */
  updateSelectedTodo(item) {
    let self = this;
    self.mainGen(function*() {
      try {
        let {data} = yield self.updateTodo(item);
        if(data) {
          self.$rootScope.$broadcast(self.events.changeSuccess, data);
        }
      } catch (err) {
        console.error("Can't fetch data", err);
      }
    });
  }

  /**
   * Generator for TODOS /DELETE
   */
  deleteSelectedTodo(item) {
    let self = this;
    let {id} = item;
    self.mainGen(function*() {
      try {
        yield self.deleteTodo(item);
        self.$rootScope.$broadcast(self.events.deleteSuccess,id)
      } catch (err) {
        console.error("Can't fetch data", err);
      }
    });
  }
}

WorkService.$inject = [
  '$rootScope',
  '$http',
  'urls',
  'gen',
  'mainGen',
  'events',
  'TodoService'
];

export default angular.module('app.services.common.work', [])
  .service('WorkService', WorkService)
  .name;