import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 
import { ListPageRoutingModule } from './todo-list-page-routing.module';
import { ListPageComponent } from './todo-list-page.component';
import {AddTodoComponent} from '../../_components/addTodo/addTodo.component';
import{ListTodoComponent} from '../../_components/listTodo/listTodo.component';
// import { AppRoutingModule } from '../app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
@NgModule({
  declarations: [ListPageComponent,AddTodoComponent,ListTodoComponent],
  imports: [
    CommonModule,
    ListPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule, 
    FormsModule, 
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ]
})
export class ListPageModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}