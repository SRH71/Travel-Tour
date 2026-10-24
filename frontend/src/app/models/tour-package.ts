export interface TourPackage {
  id?: number;

  name: string;
  description?: string;
  destination?: string;

  durationDays?: number;
  maxGroupSize?: number;

  pricePerPerson: number;
  discountPrice?: number;

  imageName?: string;

  itinerary?: string;
  inclusions?: string;
  exclusions?: string;

  availableFrom?: string;
  availableUntil?: string;

  active: boolean;
  createdAt?: string;
}