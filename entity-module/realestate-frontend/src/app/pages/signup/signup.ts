import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  signupForm: FormGroup;
  message = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
      role: ['customer', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.errorMessage = '';

    console.log('Sending data:', this.signupForm.value);

    this.authService.signup(this.signupForm.value).subscribe({

      next: (response) => {

        console.log('SUCCESS:', response);

        this.isLoading = false;

        if (response.token) {
          this.authService.saveToken(response.token);
        }

        if (response.data?.user) {
          localStorage.setItem(
            'user',
            JSON.stringify(response.data.user)
          );
        }

        this.message = 'Account created successfully!';

        this.signupForm.reset({
          role: 'customer'
        });
      },

      error: (error) => {

        console.log('ERROR:', error);

        this.isLoading = false;

        this.errorMessage =
          error.error?.message ||
          error.message ||
          'Something went wrong. Please try again.';
      }

    });
  }
} 