

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TourPackage } from '../../models/tour-package';
import { Tour } from '../../services/tour';

@Component({
  selector: 'app-admin-tour-edit',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-tour-edit.html',
  styleUrl: './admin-tour-edit.css',
})
export class AdminTourEdit implements OnInit {

  private tourService = inject(Tour);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = false;
  saving = false;
  errorMessage = '';

  tourId!: number;

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

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.errorMessage =
        'Tour ID was not provided.';

      return;
    }

    this.tourId = Number(id);

    if (isNaN(this.tourId)) {

      this.errorMessage =
        'Invalid tour ID.';

      return;
    }

    this.loadTour();
  }

  loadTour(): void {

    this.loading = true;
    this.errorMessage = '';

    this.tourService
      .getTourById(this.tourId)
      .subscribe({

        next: (tour) => {

          this.tour = tour;

          this.loading = false;

          /*
           * Existing image preview.
           *
           * imageName comes from the database.
           */
          if (tour.imageName) {

            this.imagePreview =
              `http://localhost:8080/api/tours/images/${tour.imageName}`;
          }
        },

        error: (error) => {

          console.error(
            'Error loading tour:',
            error
          );

          this.errorMessage =
            'Unable to load the tour package.';

          this.loading = false;
        }
      });
  }

  onImageSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {

      this.selectedImage = null;

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

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {

      this.errorMessage =
        'Image size must not exceed 5 MB.';

      input.value = '';

      this.selectedImage = null;

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

  updateTour(): void {

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

    this.saving = true;

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
    /*
      if (this.tour.durationDays !== undefined) {
  
        formData.append(
          'durationDays',
          String(this.tour.durationDays)
        );
      }
        */

    if (this.tour.durationDays != null) {

      formData.append(
        'durationDays',
        String(this.tour.durationDays)
      );
    }
    /**
    if (this.tour.maxGroupSize !== undefined) {

      formData.append(
        'maxGroupSize',
        String(this.tour.maxGroupSize)
      );
    }
      */
    if (this.tour.maxGroupSize != null) {

      formData.append(
        'maxGroupSize',
        String(this.tour.maxGroupSize)
      );
    }




    formData.append(
      'pricePerPerson',
      String(this.tour.pricePerPerson)
    );

    if (this.tour.discountPrice !== null) {

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

    /*
     * Only append image when the user
     * selected a new image.
     */
    if (this.selectedImage) {

      formData.append(
        'image',
        this.selectedImage,
        this.selectedImage.name
      );
    }

    this.tourService
      .updateTour(
        this.tourId,
        formData
      )
      .subscribe({

        next: (updatedTour) => {

          console.log(
            'Tour updated:',
            updatedTour
          );

          this.saving = false;

          this.router.navigate([
            '/admin/tours'
          ]);
        },

        error: (error) => {

          console.error(
            'Error updating tour:',
            error
          );

          if (error.error?.message) {

            this.errorMessage =
              error.error.message;

          } else {

            this.errorMessage =
              'Unable to update the tour package.';
          }

          this.saving = false;
        }
      });
  }

  cancel(): void {

    this.router.navigate([
      '/admin/tours'
    ]);
  }
}