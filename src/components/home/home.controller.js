/**
 * Created by Tallerr on 21.03.2017.
 */
export default class HomeController {

  /**
   *
   * @param $rootScope
   * @param $scope
   * @param TodoService
   * @param events
   * @param _
   */
  constructor($rootScope, $scope, TodoService, events, _) {
    this.scope = $scope;
    this.todo = TodoService;

    this.scope.todos = [];
    this.scope.completed = [];
    this.scope.todoTitle = null;

    this.scope.handleSubmitInput = this.handleSubmitInput.bind(this);
    this.scope.handleCheckBox = this.handleCheckBox.bind(this);
    this.scope.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.scope.handleStopAllChecked = this.handleStopAllChecked.bind(this);

    $rootScope.$on(events.todosIsFetched,(event, data) => {
      this.scope.todos = data.filter(item => !item.completed).sort((a,b) => {
        return parseInt(a.order) - parseInt(b.order);
      });
      this.scope.completed = data.filter(item => item.completed);
    });

    $rootScope.$on(events.createSuccess, (events, data) => {
      this.scope.todos.push(data);
    });

    $rootScope.$on(events.changeSuccess, (events, data) => {
      let {completed} = data;
      if(completed) {

      } else {

      }
      console.log(data);
    });

    $rootScope.$on(events.deleteSuccess, (events, id) => {
      let {todos, completed} = this.scope;
      this.scope.todos = todos.filter(item => id !== item.id);
      this.scope.completed = completed.filter(item => id !== item.id);
    });

    this._init();
  }

  /**
   *
   * @private
   */
  _init(){
    this.todo.getAllTodos();
  }

  handleSubmitInput(e){
    let title = this.scope.todoTitle;
    let order = this.scope.todos.length+1;

    if(e.which === 13 && title) {
      this.todo.createNewRecord({title , order});
      this.scope.todoTitle = null;
    }
  }

  handleCheckBox(item){
    item.completed = true;
    this.todo.changeItem(item);
  }

  handleDeleteButton(item){
    this.todo.deleteRecord(item);
  }

  handleStopAllChecked(){
    console.log('test');
  }



}

HomeController.$inject = ['$rootScope','$scope','TodoService', 'events', '_'];
