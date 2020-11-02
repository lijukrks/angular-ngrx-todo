import { Component, OnInit } from '@angular/core';
import {TodoListService} from '../../_services/todoList.service';
import {Todo} from '../../_models/Todo';
@Component({
  selector: 'app-list-todo-page',
  templateUrl: './listTodo.component.html',
  styleUrls: ['./listTodo.component.scss']
})
export class ListTodoComponent implements OnInit {
  todos: any;
  selectedAll: boolean;
  isButtonHidden: boolean;
  isTasksCompleted: boolean;
  constructor(
    private tasksListService: TodoListService,
  ) { }

  ngOnInit() {
    this.getAllTodos();
    this.isButtonHidden = true;
  }
getAllTodos(){
  this.tasksListService.getTodoList().subscribe((todoList: [Todo]) => {
    this.todos = todoList;
    return this.todos;
  });
}

completedTask(completed){
  for( var i = 0 ; i < this.todos.length; i++){
    this.todos[i].completed = completed;
  }
}
  markTodo(index){
  this.todos[index].completed = !this.todos[index].completed;
  }

  markAllTodos(e){
    this.isButtonHidden = !this.isButtonHidden;
    if (e.target.checked){
       this.selectedAll = true;
       this.completedTask(this.selectedAll);
    }
    else{
       this.selectedAll = false;
       this.completedTask(this.selectedAll);
    }
   }

   deleteAll(){
     this.tasksListService.deleteAllTodoList().subscribe((res) => {
      this.getAllTodos();
      this.isTasksCompleted = false;
     }) ;
     }
}
