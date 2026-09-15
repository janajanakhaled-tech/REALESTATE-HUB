import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  BookingService
} from '../../services/booking.service';

import {
  PropertyService
} from '../../services/property.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  totalUsers = 0;

  totalProperties = 0;

  totalBookings = 0;

  pendingBookings = 0;

  approvedBookings = 0;

  rejectedBookings = 0;

  isLoading = true;

  errorMessage = '';

  constructor(
    private http: HttpClient,
    private bookingService: BookingService,
    private propertyService: PropertyService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.isLoading = true;

    this.errorMessage = '';

    this.loadUsers();

    this.loadProperties();

    this.loadBookings();

  }

  loadUsers(): void {

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
            'DASHBOARD USERS:',
            response
          );

          this.totalUsers =
            response.data?.users?.length ||
            response.results ||
            0;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'DASHBOARD USERS ERROR:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Could not load users.';

          this.cdr.detectChanges();

        }

      });

  }

  loadProperties(): void {

    this.propertyService
      .getAllProperties()
      .subscribe({

        next: (response) => {

          console.log(
            'DASHBOARD PROPERTIES:',
            response
          );

          this.totalProperties =
            response.data?.properties?.length ||
            0;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'DASHBOARD PROPERTIES ERROR:',
            error
          );

          this.cdr.detectChanges();

        }

      });

  }

  loadBookings(): void {

    this.bookingService
      .getAllBookings()
      .subscribe({

        next: (response) => {

          console.log(
            'DASHBOARD BOOKINGS:',
            response
          );

          const bookings =
            response.data?.bookings ||
            response.bookings ||
            [];

          this.totalBookings =
            bookings.length;

          this.pendingBookings =
            bookings.filter(
              (booking: any) =>
                booking.status === 'pending'
            ).length;

          this.approvedBookings =
            bookings.filter(
              (booking: any) =>
                booking.status === 'approved'
            ).length;

          this.rejectedBookings =
            bookings.filter(
              (booking: any) =>
                booking.status === 'rejected'
            ).length;

          this.isLoading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'DASHBOARD BOOKINGS ERROR:',
            error
          );

          this.isLoading = false;

          this.errorMessage =
            error.error?.message ||
            'Could not load bookings.';

          this.cdr.detectChanges();

        }

      });

  }

  goHome(): void {

    this.router.navigateByUrl(
      '/home'
    );

  }

  goBookings(): void {

    this.router.navigateByUrl(
      '/admin-bookings'
    );

  }

  goProperties(): void {

    this.router.navigateByUrl(
      '/properties'
    );

  }
  goUsers(): void {

  this.router.navigateByUrl(
    '/user-management'
  );

}

} 