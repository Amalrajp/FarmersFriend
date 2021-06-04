import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error_msg;
  user_name;
  password;
  roles;
  btn_disable=false;
  path_keys = {
    'plant': 'plant',
    'b-unit': 'b_unit',
    'dashboard': 'dashboard',
    'machine': 'machine',
    'user-management': 'user_management',
    'add-user': 'user_management',
    'bu-config': 'bu_config',
    'plc-config': 'plc_config',
    'shift-details': 'shift',
    'report': 'report',
  }
  constructor(private router: Router, private auth: AuthService, private service: ConfigService) { }

  ngOnInit() {
    this.service.getRoles().subscribe(res => this.roles = res)
  }

  onLogin(event) {
    this.btn_disable=true
    event.preventDefault();//just on clicking Login button, it won't route to next page
    this.error_msg = "";

    this.auth.login(this.user_name, this.password).subscribe(
      (res) => {
        let payload = JSON.parse(window.atob(res.token.split('.')[1]));
        let path_access = this.roles.find(item => item.role == payload.role).pages
        let paths = []
        for (const key in this.path_keys) if (path_access[this.path_keys[key]]) paths.push(key)
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', payload.role);
        localStorage.setItem('username', payload.username);
        localStorage.setItem('paths', paths.toString());
        this.router.navigate(['/homepage']);
      },
      (err) => {
        // if(err.status==504) alert("Cannot connect to server.")
        this.btn_disable=false
        this.error_msg = err.error.message
        this.router.navigate(['/homepage']);
      }
      )
  }

}
