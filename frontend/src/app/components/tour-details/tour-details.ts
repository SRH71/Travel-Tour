
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TourPackage } from '../../models/tour-package';
import { Tour } from '../../services/tour';

@Component({
  selector: 'app-tour-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './tour-details.html',
  styleUrl: './tour-details.css',
})
export class TourDetails implements OnInit {
onPeopleChange() {
throw new Error('Method not implemented.');
}
createBooking() {
throw new Error('Method not implemented.');
}

  private tourService = inject(Tour);
  private route = inject(ActivatedRoute);

  tour: TourPackage | null = null;

  loading = true;
  errorMessage = '';
numberOfPeople: any;
bookingDate: any;
totalPrice: any;
successMessage: any;
submitting: any;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Tour ID was not provided.';
      this.loading = false;
      return;
    }

    this.loadTour(Number(id));
  }

  loadTour(id: number): void {

    this.loading = true;

    this.tourService.getTourById(id).subscribe({
      next: (data) => {

        this.tour = data;
        this.loading = false;
      },

      error: (error) => {

        console.error('Error loading tour:', error);

        this.errorMessage = 'Unable to load tour details.';
        this.loading = false;
      }
    });
  }
}
