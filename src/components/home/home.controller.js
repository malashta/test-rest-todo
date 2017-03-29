/**
 * Created by Tallerr on 21.03.2017.
 */
export default class HomeController {

  /**
   *
   * @param $rootScope
   * @param $scope
   * @param WorkService
   * @param events
   * @param _
   */
  constructor($rootScope, $scope, WorkService, events, _) {
    this.scope = $scope;
    this.todo = WorkService;

    this.scope.todos = [];
    this.scope.todoTitle = null;
    this.scope.maxOrder = null;
    this.scope.isEdit = null;

    this.scope.handleSubmitInput = this.handleSubmitInput.bind(this);
    this.scope.handleEditTodo = this.handleEditTodo.bind(this);
    this.scope.handleDoneTodo = this.handleDoneTodo.bind(this);
    this.scope.handleUnDoneTodo = this.handleUnDoneTodo.bind(this);
    this.scope.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.scope.handleSortUp = this.handleSortUp.bind(this);
    this.scope.handleSortDown = this.handleSortDown.bind(this);

    $rootScope.$on(events.todosIsFetched,(event, data) => {
      this.scope.todos = data.sort((a,b) => {
        return parseInt(a.order) - parseInt(b.order);
      });
    });

    $rootScope.$on(events.createSuccess, (event, data) => {
      this.scope.todos.push(data);
    });

    $rootScope.$on(events.changeSuccess, (events, data) => {
      let todos = this.scope.todos;
      this.scope.todos = todos.map(item => {
        if(item.id === data.id) {
          return data;
        }
        return item;
      }).sort((a,b) => {
        return parseInt(a.order) - parseInt(b.order);
      });
    });

    $rootScope.$on(events.deleteSuccess, (event, id) => {
      let {todos} = this.scope;
      this.scope.todos = todos.filter(item => id !== item.id);
    });
    
    $scope.$watch('todos.length', (e) => {
      this.scope.maxOrder = e ? _.maxBy(this.scope.todos, 'order').order : 1;
    });
  }

  /**
   * 
   * @param e
     */
  handleSubmitInput(e){
    let title = this.scope.todoTitle;
    let order = this.scope.maxOrder+1;

    if(e.which === 13 && title) {
      this.todo.createNewTodo({title , order});
      this.scope.todoTitle = null;
    }
  }

  /**
   * 
   * @param {Number} index
   * @param {*} event
     */
  handleEditTodo(index, event){
    if(!event) {
      this.scope.todos[index].isEdit = true;
    } 
    
    if( event && event.which === 13 && this.scope.todos[index].title) {
      this.scope.todos[index].isEdit = null;
      this.todo.updateSelectedTodo(this.scope.todos[index]);
    }
  }

  /**
   * 
   * @param {Number} index
     */
  handleDoneTodo(index){
    this.scope.todos[index].completed = true;
    this.todo.updateSelectedTodo(this.scope.todos[index]);
  }

  /**
   *
   * @param {Number} index
   */
  handleUnDoneTodo(index){
    this.scope.todos[index].completed = false;
    this.todo.updateSelectedTodo(this.scope.todos[index]);
  }

  /**
   *
   * @param {Number} index
   */
  handleDeleteTodo(index){
    this.todo.deleteSelectedTodo(this.scope.todos[index]);
  }

  /**
   *
   * @param {Number} index
   */
  handleSortUp(index){
    let currentItem = this.scope.todos[index];
    let previousItem = this.scope.todos[index-1];
    previousItem.order++;
    currentItem.order--;
    this.todo.updateSelectedTodo(currentItem);
    this.todo.updateSelectedTodo(previousItem);
  }

  /**
   *
   * @param {Number} index
   */
  handleSortDown(index){
    let currentItem = this.scope.todos[index];
    let previousItem = this.scope.todos[index+1];
    previousItem.order--;
    currentItem.order++;
    this.todo.updateSelectedTodo(currentItem);
    this.todo.updateSelectedTodo(previousItem);
  }
  
}

HomeController.$inject = ['$rootScope','$scope','WorkService', 'events', '_'];
