/*

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourPackage } from '../models/tour-package';

@Injectable({
  providedIn: 'root',
})
export class Tour {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/tours';

  getAllTours(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(this.apiUrl);
  }

  getTourById(id: number): Observable<TourPackage> {
    return this.http.get<TourPackage>(
      `${this.apiUrl}/${id}`
    );
  }

  createTour(formData: FormData): Observable<TourPackage> {

    return this.http.post<TourPackage>(
      this.apiUrl,
      formData
    );
  }

  updateTour(
    id: number,
    formData: FormData
  ): Observable<TourPackage> {

    return this.http.put<TourPackage>(
      `${this.apiUrl}/${id}`,
      formData
    );
  }

  deleteTour(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}

*/

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourPackage } from '../models/tour-package';

@Injectable({
  providedIn: 'root',
})
export class Tour {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/tours';

  getAllTours(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(this.apiUrl);
  }

  getTourById(id: number): Observable<TourPackage> {
    return this.http.get<TourPackage>(
      `${this.apiUrl}/${id}`
    );
  }

  // Download tour image through Angular HttpClient
  getTourImage(imageName: string): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/images/${imageName}`,
      { responseType: 'blob' }
    );
  }

  createTour(formData: FormData): Observable<TourPackage> {
    return this.http.post<TourPackage>(
      this.apiUrl,
      formData
    );
  }

  updateTour(
    id: number,
    formData: FormData
  ): Observable<TourPackage> {

    return this.http.put<TourPackage>(
      `${this.apiUrl}/${id}`,
      formData
    );
  }

  deleteTour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}