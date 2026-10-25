

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Booking as BookingModel } from '../../models/booking';
import { Booking as BookingService } from '../../services/booking';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {

  private bookingService = inject(BookingService);

  bookings: BookingModel[] = [];

  loading = true;
  errorMessage = '';

  // Temporary: current logged-in user
  userId = 1;

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {

    this.loading = true;
    this.errorMessage = '';

    this.bookingService.getBookingsByUserId(this.userId)
      .subscribe({
        next: (data) => {
          console.log('My bookings:', data);

          this.bookings = data;
          this.loading = false;
        },

        error: (error) => {
          console.error('Error loading bookings:', error);

          this.errorMessage = 'Unable to load your bookings.';
          this.loading = false;
        }
      });
  }
}

