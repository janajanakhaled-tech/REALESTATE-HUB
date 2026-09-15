import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  message = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({

      next: (response) => {

        console.log('LOGIN SUCCESS:', response);

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

        this.message = 'Login successful!';

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },

      error: (error) => {

        console.log('LOGIN ERROR:', error);

        this.isLoading = false;

        this.errorMessage =
          error.error?.message ||
          'Invalid email or password.';
      }
    });
  }
} 