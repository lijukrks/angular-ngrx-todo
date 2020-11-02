import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: 'login-page', loadChildren: () => import('./_pages/login-page/login-page.module').then(m => m.LoginPageModule) },
{ path: 'list_page', loadChildren: () => import('./_pages/todo-list-page/todo-list-page.module').then(m => m.ListPageModule) },
{ path: 'register', loadChildren: () => import('./_pages/register/register.module').then(m => m.RegisterModule) },
{ path: '**', loadChildren: () => import('./_pages/login-page/login-page.module').then(m => m.LoginPageModule)  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
