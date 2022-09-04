import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import {LoginComponent} from "./auth/login/login.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./auth/home/home.component";


const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
   { path: 'app', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
