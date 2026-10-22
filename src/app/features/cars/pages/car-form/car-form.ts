import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarModel } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm {
  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  carForm = this.formBuilder.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: [''],
  });

  onSubmit(): void {
    const carData = this.carForm.value as CarModel;

    console.log('Submitted Car:', carData);

    this.carService.addCar(carData).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (error) => {
        console.error('Error adding car:', error);
      },
    });
  }
}
