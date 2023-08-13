import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class LoggedInAuthGuard{
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      this.router.navigate(['/account']);
      return false;
    }
    return true;
  }
}
