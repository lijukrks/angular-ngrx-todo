import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  tasks: any;
  complete: false;
  selectedAll: boolean;
  constructor(
  ) { }

  ngOnInit():void {
  }
}
