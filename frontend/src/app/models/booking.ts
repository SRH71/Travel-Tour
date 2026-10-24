

export interface Booking {
  id?: number;
  userId: number;
  tourId: number;
  numberOfPeople: number;
  bookingDate: string;
  totalPrice: number;
  status: string;
}