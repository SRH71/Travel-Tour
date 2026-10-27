
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Booking as BookingModel } from '../models/booking';

@Injectable({
providedIn: 'root',
})
export class Booking {

private http = inject(HttpClient);

// private apiUrl = 'http://localhost:8080/api/bookings';
private apiUrl = 'https://travel-api-gateway.onrender.com/api/bookings';  

// Get all bookings
getAllBookings(): Observable<BookingModel[]> {
return this.http.get<BookingModel[]>(this.apiUrl);
}

// Get booking by ID
getBookingById(id: number): Observable<BookingModel> {
return this.http.get<BookingModel>(
`${this.apiUrl}/${id}`
);
}

// Create booking
createBooking(
bookingData: BookingModel
): Observable<BookingModel> {


return this.http.post<BookingModel>(
  this.apiUrl,
  bookingData
);


}

// Update booking
updateBooking(
id: number,
bookingData: BookingModel
): Observable<BookingModel> {


return this.http.put<BookingModel>(
  `${this.apiUrl}/${id}`,
  bookingData
);


}

// Delete booking
deleteBooking(id: number): Observable<void> {


return this.http.delete<void>(
  `${this.apiUrl}/${id}`
);


}

// Get bookings by user ID
getBookingsByUserId(
userId: number
): Observable<BookingModel[]> {


return this.http.get<BookingModel[]>(
  `${this.apiUrl}/user/${userId}`
);

}

// Confirm booking
confirmBooking(
id: number
): Observable<BookingModel> {


return this.http.put<BookingModel>(
  `${this.apiUrl}/${id}/confirm`,
  {}
);

}

// Cancel booking
cancelBooking(
id: number
): Observable<BookingModel> {


return this.http.put<BookingModel>(
  `${this.apiUrl}/${id}/cancel`,
  {}
);

}

}
