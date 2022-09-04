import { Component, OnInit } from '@angular/core';
import {SignupRequestPayload} from "../signup/signup-request.payload";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginRequestPayload} from "./login-request.payload";
import {throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage?: string;
  isError?: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        // @ts-ignore
        if (params.registered !== undefined && params.registered === 'true') {
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login() {
    // @ts-ignore
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    // @ts-ignore
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
     // this.toastr.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
