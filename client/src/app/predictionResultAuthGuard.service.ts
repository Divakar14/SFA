import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class PredictionResultAuthGuard{
  constructor(private router: Router) {}
  isLoggedIn: Boolean | undefined;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      localStorage.getItem('isLoggedIn') == 'true' &&
      localStorage.getItem('show') == 'true'
    ) {
      return true;
    }
    this.router.navigate(['/predict']);
    return false;
  }
}
