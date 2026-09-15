import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile implements OnInit {

  profileForm: FormGroup;

  isLoading = true;
  isSaving = false;

  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    console.log('LOADING EDIT PROFILE...');

    this.authService.getMe().subscribe({

      next: (response) => {

        console.log('EDIT PROFILE RESPONSE:', response);

        const user =
          response.data?.user ||
          response.user ||
          response.data;

        console.log('EDIT PROFILE USER:', user);

        this.profileForm.patchValue({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || ''
        });

        this.isLoading = false;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.log('EDIT PROFILE ERROR:', error);

        this.isLoading = false;

        this.errorMessage =
          error.error?.message ||
          'Could not load profile.';

        this.cdr.detectChanges();

      }

    });
  }

  onSubmit(): void {

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.message = '';
    this.errorMessage = '';

    this.authService.updateProfile(
      this.profileForm.value
    ).subscribe({

      next: (response) => {

        console.log('PROFILE UPDATED:', response);

        this.isSaving = false;
        this.message = 'Profile updated successfully!';

        if (response.data?.user) {
          localStorage.setItem(
            'user',
            JSON.stringify(response.data.user)
          );
        }

        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigateByUrl('/profile');
        }, 1000);

      },

      error: (error) => {

        console.log('UPDATE PROFILE ERROR:', error);

        this.isSaving = false;

        this.errorMessage =
          error.error?.message ||
          'Could not update profile.';

        this.cdr.detectChanges();

      }

    });
  }

  goBack(): void {
    this.router.navigateByUrl('/profile');
  }
} 