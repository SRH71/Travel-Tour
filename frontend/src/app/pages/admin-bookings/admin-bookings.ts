/*import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-bookings',
  imports: [],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css',
})
export class AdminBookings {

}
*/

/*
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Booking as BookingModel } from '../../models/booking';
import { Booking as BookingService } from '../../services/booking';

@Component({
  selector: 'app-admin-bookings',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css',
})
export class AdminBookings implements OnInit {

  private bookingService = inject(BookingService);

  bookings: BookingModel[] = [];

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {

    this.loading = true;
    this.errorMessage = '';

    this.bookingService.getAllBookings().subscribe({

      next: (data) => {
        this.bookings = data;
        this.loading = false;

        console.log('Bookings loaded:', data);
      },

      error: (error) => {
        console.error('Error loading bookings:', error);

        this.loading = false;
        this.errorMessage = 'Unable to load bookings.';
      }

    });
  }

  
}
*/


import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Booking as BookingModel } from '../../models/booking';
import { Booking as BookingService } from '../../services/booking';

@Component({
selector: 'app-admin-bookings',
imports: [CommonModule, RouterModule],
templateUrl: './admin-bookings.html',
styleUrl: './admin-bookings.css',
})
export class AdminBookings implements OnInit {

private bookingService = inject(BookingService);

bookings: BookingModel[] = [];

loading = true;
errorMessage = '';

ngOnInit(): void {
this.loadBookings();
}

loadBookings(): void {


this.loading = true;
this.errorMessage = '';

this.bookingService.getAllBookings().subscribe({
  next: (data) => {
    this.bookings = data;
    this.loading = false;

    console.log('Bookings loaded:', data);
  },

  error: (error: unknown) => {
    console.error('Error loading bookings:', error);

    this.loading = false;
    this.errorMessage = 'Unable to load bookings.';
  }
});


}

confirmBooking(id: number): void {


this.bookingService.confirmBooking(id).subscribe({

  next: () => {
    console.log('Booking confirmed:', id);
    this.loadBookings();
  },

  error: (error: unknown) => {
    console.error('Error confirming booking:', error);
    this.errorMessage = 'Unable to confirm booking.';
  }

});


}

cancelBooking(id: number): void {


if (!confirm('Are you sure you want to cancel this booking?')) {
  return;
}

this.bookingService.cancelBooking(id).subscribe({

  next: () => {
    console.log('Booking cancelled:', id);
    this.loadBookings();
  },

  error: (error: unknown) => {
    console.error('Error cancelling booking:', error);
    this.errorMessage = 'Unable to cancel booking.';
  }

});


}
}
