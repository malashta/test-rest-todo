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
    this.$http.get(`${this.urls.base}/${this.urls.todos.all}`)
      .then((response) => {
        this.$rootScope.$broadcast(this.events.todosIsFetched,response.data)
      });
  }

  createNewRecord({title, order}) {
    this.$http.post(`${this.urls.base}/${this.urls.todos.all}`,{title: title, order: order})
      .then((response) => {
        this.$rootScope.$broadcast(this.events.createSuccess,response.data)
      });
  }

  changeItem({url,order,title, completed}) {
    this.$http.patch(`${url}`,{order,title, completed})
      .then((response) => {
        this.$rootScope.$broadcast(this.events.changeSuccess,response.data)
      })
  }

  deleteRecord({url, id}) {
    this.$http.delete(`${url}`)
      .then((response) => {
        this.$rootScope.$broadcast(this.events.deleteSuccess,id)
      })
  }


}

TodoService.$inject = ['$http', 'urls', '$rootScope', 'events'];

export default angular.module('app.services.requests.todo', [])
  .service('TodoService', TodoService)
  .name;