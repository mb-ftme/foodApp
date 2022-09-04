import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {map, Observable} from "rxjs";
import {SignupRequestPayload} from "./auth/signup/signup-request.payload";
import {EventEmitter, Injectable, Output} from "@angular/core";
import {LoginRequestPayload} from "./auth/login/login-request.payload";
import {LoginResponse} from "./auth/login/login-response.payload";


@Injectable({
  providedIn: 'root'
})

export class AuthService {


  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }


  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }));
  }







  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

}
