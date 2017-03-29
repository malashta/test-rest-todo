import angular from 'angular';

class TodoService {
  constructor($http, urls, $rootScope, events) {
    this.urls = urls;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.events = events;

    this.getAllTodos = this.getAllTodos.bind(this);
    this.createNewRecord = this.createNewRecord.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }
  
  getAllTodos() {
    return this.$http.get(`${this.urls.base}/${this.urls.todos.all}`);
  }

  createNewRecord({title, order}) {
    return this.$http.post(`${this.urls.base}/${this.urls.todos.all}`,{title, order});
  }

  changeItem({url,order,title, completed}) {
    return this.$http.patch(`${url}`,{order,title,completed});
  }

  deleteRecord({url}) {
    return this.$http.delete(`${url}`);
  }


}

TodoService.$inject = ['$http', 'urls', '$rootScope', 'events'];

export default angular.module('app.services.requests.todo', [])
  .service('TodoService', TodoService)
  .name;