import { Component, OnInit } from '@angular/core';
import { AuthService } from './providers/auth.service';


@Component({
  selector: 'app-root',
  template: `
          <nav-bar></nav-bar>
          <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.checkAuthStatus()
  }
}
