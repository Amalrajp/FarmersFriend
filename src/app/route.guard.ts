import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    let paths = (localStorage.getItem('paths') || "").split(',');
    if (next.url[0].path == 'role-config' && localStorage.getItem('role') == 'Admin') return true
    else if (paths.includes(next.url[0].path) && this.auth.loggedIn()) return true;
    else {
      this.router.navigate(['./']);
      return false
    }
  }
}
