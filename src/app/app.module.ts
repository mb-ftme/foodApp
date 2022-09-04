import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './auth/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {NgxWebstorageModule} from "ngx-webstorage";
import { HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
    NgxWebstorageModule.forRoot(),
    RouterOutlet,
    RouterLink,
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
