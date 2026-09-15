import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {

  users: any[] = [];

  isLoading = true;

  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadUsers();

  }


  loadUsers(): void {

    this.isLoading = true;

    this.errorMessage = '';

    const token =
      localStorage.getItem('token');

    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.http
      .get<any>(
        'http://localhost:5000/api/v1/users',
        { headers }
      )
      .subscribe({

        next: (response) => {

          console.log(
            'USERS RESPONSE:',
            response
          );

          this.users =
            response.data?.users ||
            response.users ||
            [];

          this.isLoading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'USERS ERROR:',
            error
          );

          this.isLoading = false;

          this.errorMessage =
            error.error?.message ||
            'Could not load users.';

          this.cdr.detectChanges();

        }

      });

  }


  changeRole(
    userId: string,
    role: string
  ): void {

    const confirmed = confirm(
      `Are you sure you want to change this user's role to ${role}?`
    );

    if (!confirmed) {
      return;
    }

    const token =
      localStorage.getItem('token');

    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.http
      .patch<any>(
        `http://localhost:5000/api/v1/users/${userId}/role`,
        { role },
        { headers }
      )
      .subscribe({

        next: (response) => {

          console.log(
            'ROLE UPDATED:',
            response
          );

          this.loadUsers();

        },

        error: (error) => {

          console.log(
            'ROLE UPDATE ERROR:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Could not update user role.';

          this.cdr.detectChanges();

        }

      });

  }


  goHome(): void {

    this.router.navigateByUrl(
      '/home'
    );

  }


  goDashboard(): void {

    this.router.navigateByUrl(
      '/admin-dashboard'
    );

  }

} 