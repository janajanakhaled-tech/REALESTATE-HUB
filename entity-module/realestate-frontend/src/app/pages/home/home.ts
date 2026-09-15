import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
 

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.authService
      .getMe()
      .subscribe({

        next: (response) => {

          console.log(
            'HOME USER:',
            response
          );

          this.user =
            response.data?.user ||
            response.user ||
            response.data;

          console.log(
            'CURRENT USER:',
            this.user
          );

          if (this.user) {

            localStorage.setItem(
              'user',
              JSON.stringify(this.user)
            );

          }

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'HOME USER ERROR:',
            error
          );

          const savedUser =
            localStorage.getItem('user');

          if (savedUser) {

            this.user =
              JSON.parse(savedUser);

          }

          this.cdr.detectChanges();

        }

      });
  }


  viewProperties(): void {

    this.router.navigateByUrl(
      '/properties'
    );

  }


  profile(): void {

    this.router.navigateByUrl(
      '/profile'
    );

  }


  myBookings(): void {

    this.router.navigateByUrl(
      '/my-bookings'
    );

  }


  adminDashboard(): void {

    this.router.navigateByUrl(
      '/admin-dashboard'
    );

  }


  adminBookings(): void {

    this.router.navigateByUrl(
      '/admin-bookings'
    );

  }


  logout(): void {

    this.authService.logout();

    this.router.navigateByUrl(
      '/login'
    );

  }

} 