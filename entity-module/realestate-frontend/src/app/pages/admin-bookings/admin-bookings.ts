import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-admin-bookings',
  imports: [CommonModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css'
})
export class AdminBookings implements OnInit {

  bookings: any[] = [];

  isLoading = true;

  errorMessage = '';

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.bookingService
      .getAllBookings()
      .subscribe({

        next: (response) => {

          console.log(
            'ADMIN BOOKINGS RESPONSE:',
            response
          );

          this.bookings =
            response.data?.bookings ||
            response.bookings ||
            [];

          console.log(
            'ADMIN BOOKINGS:',
            this.bookings
          );

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(
            'ADMIN BOOKINGS ERROR:',
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

  approveBooking(id: string): void {

    this.bookingService
      .updateBookingStatus(
        id,
        'approved'
      )
      .subscribe({

        next: (response) => {

          console.log(
            'BOOKING APPROVED:',
            response
          );

          this.loadBookings();
        },

        error: (error) => {

          console.log(
            'APPROVE BOOKING ERROR:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Could not approve booking.';

          this.cdr.detectChanges();
        }

      });
  }

  rejectBooking(id: string): void {

    this.bookingService
      .updateBookingStatus(
        id,
        'rejected'
      )
      .subscribe({

        next: (response) => {

          console.log(
            'BOOKING REJECTED:',
            response
          );

          this.loadBookings();
        },

        error: (error) => {

          console.log(
            'REJECT BOOKING ERROR:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Could not reject booking.';

          this.cdr.detectChanges();
        }

      });
  }

  goHome(): void {

    this.router.navigateByUrl(
      '/home'
    );
  }

} 