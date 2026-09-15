import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Property,
  PropertyService
} from '../../services/property.service';
import {
  BookingService
} from '../../services/booking.service';
@Component({
  selector: 'app-book-viewing',
  imports: [ReactiveFormsModule],
  templateUrl: './book-viewing.html',
  styleUrl: './book-viewing.css'
})
export class BookViewing implements OnInit {
  bookingForm: FormGroup;
  property: Property | null = null;
  propertyId = '';
  isLoading = true;
  isSaving = false;
  message = '';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {
    this.bookingForm = this.fb.group({
      date: [
        '',
        Validators.required
      ],
      notes: ['']
    });
  }
  ngOnInit(): void {
    this.propertyId =
      this.route.snapshot.paramMap.get('id') || '';
    console.log(
      'BOOKING PROPERTY ID:',
      this.propertyId
    );
    if (!this.propertyId) {
      this.errorMessage =
        'Property ID not found.';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }
    this.propertyService
      .getPropertyById(this.propertyId)
      .subscribe({
        next: (response) => {
          console.log(
            'BOOKING PROPERTY RESPONSE:',
            response
          );
          this.property =
            response.data?.property ||
            response.data ||
            response.property;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(
            'BOOKING PROPERTY ERROR:',
            error
          );
          this.isLoading = false;
          this.errorMessage =
            error.error?.message ||
            'Could not load property.';
          this.cdr.detectChanges();
        }
      });
  }
  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.message = '';
    this.errorMessage = '';
    const bookingData = {
      property: this.propertyId,
      date: this.bookingForm.value.date,
      notes: this.bookingForm.value.notes
    };
    console.log(
      'BOOKING DATA:',
      bookingData
    );
    this.bookingService
      .createBooking(bookingData)
      .subscribe({
        next: (response) => {
          console.log(
            'BOOKING CREATED:',
            response
          );
          this.isSaving = false;
          this.message =
            'Viewing booked successfully!';
          this.cdr.detectChanges();
          setTimeout(() => {
            this.router.navigateByUrl(
              '/my-bookings'
            );
          }, 1000);
        },
        error: (error) => {
          console.log(
            'CREATE BOOKING ERROR:',
            error
          );
          this.isSaving = false;
          this.errorMessage =
            error.error?.message ||
            'Could not book viewing.';
          this.cdr.detectChanges();
        }
      });
  }
  goBack(): void {
    this.router.navigate([
      '/property-details',
      this.propertyId
    ]);
  }
} 