import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor() { }
  title = 'Sales Forecasting Application';
  current: any;
  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') == null) {
      localStorage.setItem('isLoggedIn', 'false');
    }
  }
}
