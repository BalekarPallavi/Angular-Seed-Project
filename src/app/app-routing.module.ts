import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_guards';
import {UpdateComponent} from './update/update.component';
import {PagenotfoundComponent} from './ErrorPagez/pagenotfound.component';
import {ServerErrorComponent} from './ErrorPagez/500.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:id/update' , component: UpdateComponent},
  { path: 'servererror' , component: ServerErrorComponent},

  // otherwise redirect to home
  { path: '**', component: PagenotfoundComponent }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
