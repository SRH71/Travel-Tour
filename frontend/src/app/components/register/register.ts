import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

 // private apiUrl = 'http://localhost:8080/api/auth/register';
  private apiUrl = 'https://travel-api-gateway.onrender.com/api/auth/register';

  user = {
    username: '',
    email: '',
    password: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (
      !this.user.username ||
      !this.user.email ||
      !this.user.password
    ) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.http.post(
      this.apiUrl,
      this.user,
      {
        responseType: 'text'
      }
    ).subscribe({

      next: (response) => {

        console.log('Registration successful:', response);

        this.successMessage = 'Registration successful!';

        this.user = {
          username: '',
          email: '',
          password: ''
        };

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },

      error: (error) => {

        console.error('Registration error:', error);

        if (error.status === 409) {
          this.errorMessage =
            'Username or email already exists.';
        }
        else if (error.status === 400) {
          this.errorMessage =
            'Invalid registration data.';
        }
        else if (error.status === 0) {
          this.errorMessage =
            'Cannot connect to the authentication server.';
        }
        else {
          this.errorMessage =
            'Registration failed. Please try again.';
        }
      }

    });
  }
}
