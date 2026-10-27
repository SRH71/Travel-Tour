

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Tour } from '../../services/tour';
import { TourPackage } from '../../models/tour-package';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin-tours',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-tours.html',
  styleUrl: './admin-tours.css'
})
export class AdminTours implements OnInit {

  private tourService = inject(Tour);
  private authService = inject(Auth);
  private router = inject(Router);

  tours: TourPackage[] = [];

  loading = false;

  errorMessage = '';

  username: string | null = null;

  ngOnInit(): void {

    this.username = this.authService.getUsername();

    this.loadTours();
  }

  loadTours(): void {

    this.loading = true;
    this.errorMessage = '';

    this.tourService.getAllTours().subscribe({

      next: (data) => {

        this.tours = data;

        this.loading = false;

      },

      error: (error) => {

        console.error('Error loading tours:', error);

        this.errorMessage =
          'Unable to load tour packages.';

        this.loading = false;

      }

    });
  }

  
getImageUrl(imageName: string | undefined): string {
  if (!imageName) {
    return 'assets/images/no-image.jpg';
  }

  return 'https://travel-api-gateway.onrender.com/api/tours/images/' + imageName;
}


  deleteTour(id: number | undefined): void {

    if (id === undefined) {
      return;
    }

    const confirmed = confirm(
      'Are you sure you want to delete this tour package?'
    );

    if (!confirmed) {
      return;
    }

    this.tourService.deleteTour(id).subscribe({

      next: () => {

        this.tours =
          this.tours.filter(tour => tour.id !== id);

      },

      error: (error) => {

        console.error('Error deleting tour:', error);

        this.errorMessage =
          'Unable to delete the tour package.';

      }

    });
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}
