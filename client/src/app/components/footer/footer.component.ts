import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlaskapiService } from 'src/app/flaskapi.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public signOutSubscription: Subscription;
  isLoggedIn: boolean;

  constructor(
    private flaskApiService: FlaskapiService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') == 'false') {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  ngOnDestroy(){
    if (this.signOutSubscription) {
      this.signOutSubscription.unsubscribe();
    }
  }

  signOut() {
    this.signOutSubscription = this.flaskApiService
      .signOut()
      .subscribe((response) => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('email', '');
        localStorage.setItem('count', '0');
        localStorage.setItem('show', 'false');
        localStorage.setItem('name', '');
        this.router.navigate(['/account']);
      });
  }

}
