import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { v4 as uuidv4 } from "uuid";
import {Details} from './users';
import {TodoList} from './todo';
import {Todo } from '../_models/Todo';
import {User} from '../_models/User';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/todolist') && method === 'POST':
                   return  createTasks();
                case url.endsWith('/todolist') && method === 'GET':
                    return  getTasks();
                case url.match('todolist') && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function getTasks(){
            // TodoList.TODO = JSON.parse(localStorage.getItem('todoList'));
            return ok(TodoList.TODO);
        }

        function createTasks(){
        const todo: Todo = body;
        body.id = uuidv4();
        body.completed = false;
        if (TodoList.TODO.find((x: Todo) => x.name === body.name)){
            return error('The task is already added');
        }
        TodoList.TODO.push({
            id: body.id,
            name: body.name,
            completed: body.completed
        });
        console.log(TodoList.TODO);
        localStorage.setItem('todoList', JSON.stringify(TodoList.TODO));
        return ok(TodoList.TODO);
        }
        function register() {
            const user = body;
            if (Details.USERS.find((x: User) => x.email === user.email)) {
                return error('Username "' + user.email + '" is already taken');
            }
            user.id = uuidv4();
            Details.USERS.push(user);
            console.log(user);
            return ok(Details.USERS);
        }

        function authenticate() {
          const { email, password } = body;
          const users = JSON.parse( localStorage.getItem('users'));
          console.log(users);
          if ( !users){
            const user = Details.USERS.find((x: User) => x.email === email && x.password === password);
            if (!user) {
                return error('Username or password is incorrect');
              }
          } else {
            const user = users.find((x: User) => x.email === email && x.password === password);
          }
          return ok(Details.USERS);
                }

        function deleteUser() {
            TodoList.TODO = [];
            return ok(TodoList.TODO);
        }

        function ok(body){
            return of(new HttpResponse({ status: 200, body }));
        }
        function error(message: string) {
            return throwError({ error: { message } });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
