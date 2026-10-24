import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LoginRequest } from '../../models/auth';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  login(): void {

    this.errorMessage = '';

    if (!this.loginRequest.username || !this.loginRequest.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.isLoading = true;

    this.auth.login(this.loginRequest).subscribe({
      next: response => {

        this.isLoading = false;

        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },

      error: error => {

        this.isLoading = false;

        console.error('Login error:', error);

        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else if (error.status === 403) {
          this.errorMessage = 'Access denied.';
        } else {
          this.errorMessage =
            'Login failed. Please check that the authentication service is running.';
        }
      }
    });
  }

}

