import { Component, inject, input, signal } from '@angular/core';
import { CarModel } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  templateUrl: './car-details.html',
  styleUrl: './car-details.scss',
})
export class CarDetails {
  private carService = inject(CarService);

  readonly id = input.required<string>();
  readonly car = signal<CarModel | null>(null);

  ngOnInit(): void {
    this.carService.getCarById(this.id()).subscribe((car) => {
      this.car.set(car);
    });
  }
}
