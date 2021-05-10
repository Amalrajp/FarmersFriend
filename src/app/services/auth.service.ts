import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private login_url = "/ptrm/api/authenticate";
  private signup_url = "/ptrm/api/register";
  

  login(user, pass) {
    return this.http.post<any>(this.login_url, { username: user, password: pass });
  }

  register(form_data) {
    return this.http.post<any>(this.signup_url, form_data);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
