import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AuthGuard{
  constructor(private router: Router) {}
  isLoggedIn: Boolean | undefined;
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      localStorage.getItem('isLoggedIn') != null &&
      localStorage.getItem('isLoggedIn') == 'true'
    ) {
      return true;
    }
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/account']);
    return false;
  }
}
