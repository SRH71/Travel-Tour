
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Booking as BookingModel } from '../../models/booking';
import { Booking as BookingService } from '../../services/booking';
import { TourPackage } from '../../models/tour-package';
import { Tour } from '../../services/tour';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tourService = inject(Tour);
  private bookingService = inject(BookingService);

  tour: TourPackage | null = null;

  numberOfPeople = 1;
  bookingDate = '';
  totalPrice = 0;

  loading = true;
  submitting = false;

  errorMessage = '';
  successMessage = '';

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
    this.tourService.getTourById(id).subscribe({
      next: (data) => {
        this.tour = data;
        this.calculateTotal();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tour:', error);
        this.errorMessage = 'Unable to load tour details.';
        this.loading = false;
      }
    });
  }

  calculateTotal(): void {
    if (!this.tour) {
      this.totalPrice = 0;
      return;
    }

    const price = this.tour.discountPrice || this.tour.pricePerPerson;
    this.totalPrice = Number(price) * this.numberOfPeople;
  }

  onPeopleChange(): void {
    this.calculateTotal();
  }
  onBookingDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.bookingDate = input.value;

    console.log('Booking date:', this.bookingDate);
}

  createBooking(): void {
    if (!this.tour) {
      return;
    }

    if (!this.bookingDate) {
      this.errorMessage = 'Please select a booking date.';
      return;
    }

    const bookingData: BookingModel = {
      userId: 1,
      tourId: this.tour.id!,
      numberOfPeople: this.numberOfPeople,
      bookingDate: this.bookingDate,
      totalPrice: this.totalPrice,
      status: 'PENDING'
    };

    this.submitting = true;
    this.errorMessage = '';

    this.bookingService.createBooking(bookingData).subscribe({
      next: (response) => {
        console.log('Booking created:', response);
        this.submitting = false;
        this.successMessage = 'Booking created successfully.';
      },
      error: (error) => {
        console.error('Error creating booking:', error);
        this.submitting = false;
        this.errorMessage = 'Unable to create booking.';
      }
    });
  }
}