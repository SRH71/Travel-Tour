

import { Component, inject, OnInit } from '@angular/core';
import { TourPackage } from '../../models/tour-package';
import { Tour } from '../../services/tour';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tours',
  imports: [RouterModule, CommonModule],
  templateUrl: './tours.html',
  styleUrl: './tours.css',
})
export class Tours implements OnInit {

  private tourService = inject(Tour);

  tours: TourPackage[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.loading = true;

    this.tourService.getAllTours().subscribe({
      next: (data) => {
        this.tours = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tours:', error);
        this.errorMessage = 'Unable to load tours.';
        this.loading = false;
      }
    });
  }
}
