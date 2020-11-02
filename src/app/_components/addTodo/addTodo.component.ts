import { Component, OnInit } from '@angular/core';
import {TodoListService} from '../../_services/todoList.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {Todo} from '../../_models/Todo';
@Component({
  selector: 'app-add-todo-page',
  templateUrl: './addTodo.component.html',
  styleUrls: ['./addTodo.component.scss']
})
export class AddTodoComponent implements OnInit {
  todos: any;
  loginForm: FormGroup;
  constructor(
    private tasksListService: TodoListService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      taskName: ['', Validators.required],
  });
  }

  addTask(formValue){
    this.tasksListService.createTodoList(formValue.taskName).subscribe((res: Todo) => {
      this.loginForm.reset();
      this.tasksListService.getTodoList().subscribe((todoList: [Todo]) => {
        this.todos = todoList;
      });
    } );
  }


}
