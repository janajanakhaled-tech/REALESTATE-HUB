import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

import {
  BookingService
} from '../../services/booking.service';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {

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
      .getMyBookings()
      .subscribe({

        next: (response) => {

          console.log(
            'MY BOOKINGS RESPONSE:',
            response
          );

          this.bookings =
            response.data?.bookings ||
            response.bookings ||
            [];

          console.log(
            'MY BOOKINGS:',
            this.bookings
          );

          this.isLoading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'MY BOOKINGS ERROR:',
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

  cancelBooking(id: string): void {

    const confirmed = confirm(
      'Are you sure you want to cancel this booking?'
    );

    if (!confirmed) {
      return;
    }

    this.bookingService
      .cancelBooking(id)
      .subscribe({

        next: (response) => {

          console.log(
            'BOOKING CANCELLED:',
            response
          );

          this.loadBookings();

        },

        error: (error) => {

          console.log(
            'CANCEL BOOKING ERROR:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Could not cancel booking.';

          this.cdr.detectChanges();

        }

      });
  }

  goProperties(): void {

    this.router.navigateByUrl(
      '/properties'
    );

  }

  goHome(): void {

    this.router.navigateByUrl(
      '/home'
    );

  }

} 