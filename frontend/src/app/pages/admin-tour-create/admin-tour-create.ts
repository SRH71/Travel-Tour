
/*
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { TourPackage } from '../../models/tour-package';
import { Tour } from '../../services/tour';

@Component({
  selector: 'app-admin-tour-create',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-tour-create.html',
  styleUrl: './admin-tour-create.css',
})
export class AdminTourCreate {
onImageSelected($event: Event) {
throw new Error('Method not implemented.');
}

  private tourService = inject(Tour);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  tour: TourPackage = {
    name: '',
    description: '',
    destination: '',
    durationDays: undefined,
    maxGroupSize: undefined,
    pricePerPerson: 0,
    discountPrice: undefined,
    imageName: '',
    itinerary: '',
    inclusions: '',
    exclusions: '',
    availableFrom: '',
    availableUntil: '',
    active: true
  };
imageError: any;
imagePreview: any;


  createTour(): void {

    this.errorMessage = '';

    if (!this.tour.name.trim()) {
      this.errorMessage = 'Tour name is required.';
      return;
    }

    if (!this.tour.pricePerPerson) {
      this.errorMessage = 'Price per person is required.';
      return;
    }

    this.loading = true;

    this.tourService.createTour(this.tour).subscribe({

      next: (createdTour) => {

        console.log('Tour created:', createdTour);

        this.loading = false;

        this.router.navigate(['/admin/tours']);

      },

      error: (error) => {

        console.error('Error creating tour:', error);

        this.errorMessage =
          'Unable to create the tour package.';

        this.loading = false;

      }

    });

  }


  cancel(): void {

    this.router.navigate(['/admin/tours']);

  }

}
  */

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { TourPackage } from '../../models/tour-package';
import { Tour } from '../../services/tour';

@Component({
  selector: 'app-admin-tour-create',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-tour-create.html',
  styleUrl: './admin-tour-create.css',
})
export class AdminTourCreate {

  private tourService = inject(Tour);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  tour: TourPackage = {
    name: '',
    description: '',
    destination: '',
    durationDays: undefined,
    maxGroupSize: undefined,
    pricePerPerson: 0,
    discountPrice: undefined,
    imageName: '',
    itinerary: '',
    inclusions: '',
    exclusions: '',
    availableFrom: '',
    availableUntil: '',
    active: true
  };

  onImageSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {

      this.selectedImage = null;
      this.imagePreview = null;

      return;
    }

    const file = input.files[0];

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {

      this.errorMessage =
        'Only JPG, PNG and WEBP images are allowed.';

      input.value = '';

      this.selectedImage = null;
      this.imagePreview = null;

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {

      this.errorMessage =
        'Image size must not exceed 5 MB.';

      input.value = '';

      this.selectedImage = null;
      this.imagePreview = null;

      return;
    }

    this.errorMessage = '';

    this.selectedImage = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result as string;

    };

    reader.readAsDataURL(file);
  }

  createTour(): void {

    this.errorMessage = '';

    if (!this.tour.name.trim()) {

      this.errorMessage =
        'Tour name is required.';

      return;
    }

    if (
      this.tour.pricePerPerson === null ||
      this.tour.pricePerPerson === undefined ||
      this.tour.pricePerPerson <= 0
    ) {

      this.errorMessage =
        'Price per person is required.';

      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append(
      'name',
      this.tour.name
    );

    formData.append(
      'description',
      this.tour.description || ''
    );

    formData.append(
      'destination',
      this.tour.destination || ''
    );

    if (this.tour.durationDays !== undefined) {

      formData.append(
        'durationDays',
        String(this.tour.durationDays)
      );
    }

    if (this.tour.maxGroupSize !== undefined) {

      formData.append(
        'maxGroupSize',
        String(this.tour.maxGroupSize)
      );
    }

    formData.append(
      'pricePerPerson',
      String(this.tour.pricePerPerson)
    );

    if (this.tour.discountPrice !== undefined) {

      formData.append(
        'discountPrice',
        String(this.tour.discountPrice)
      );
    }

    formData.append(
      'itinerary',
      this.tour.itinerary || ''
    );

    formData.append(
      'inclusions',
      this.tour.inclusions || ''
    );

    formData.append(
      'exclusions',
      this.tour.exclusions || ''
    );

    if (this.tour.availableFrom) {

      formData.append(
        'availableFrom',
        this.tour.availableFrom
      );
    }

    if (this.tour.availableUntil) {

      formData.append(
        'availableUntil',
        this.tour.availableUntil
      );
    }

    formData.append(
      'active',
      String(this.tour.active)
    );

    if (this.selectedImage) {

      formData.append(
        'image',
        this.selectedImage,
        this.selectedImage.name
      );
    }

    this.tourService
      .createTour(formData)
      .subscribe({

        next: (createdTour) => {

          console.log(
            'Tour created:',
            createdTour
          );

          this.loading = false;

          this.router.navigate([
            '/admin/tours'
          ]);
        },

        error: (error) => {

          console.error(
            'Error creating tour:',
            error
          );

          if (error.error?.message) {

            this.errorMessage =
              error.error.message;

          } else {

            this.errorMessage =
              'Unable to create the tour package.';
          }

          this.loading = false;
        }
      });
  }

  cancel(): void {

    this.router.navigate([
      '/admin/tours'
    ]);
  }
}


