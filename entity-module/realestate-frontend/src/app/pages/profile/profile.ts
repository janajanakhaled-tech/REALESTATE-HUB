import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.authService.getMe().subscribe({

      next: (response) => {

        console.log('PROFILE RESPONSE:', response);

        this.user =
          response.data?.user ||
          response.user ||
          response.data;

        console.log('PROFILE USER:', this.user);

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log('PROFILE ERROR:', error);

        this.isLoading = false;

        this.errorMessage =
          error.error?.message ||
          'Could not load profile.';

        this.cdr.detectChanges();
      }

    });
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  goProperties(): void {
    this.router.navigateByUrl('/properties');
  }

  goEditProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
} 