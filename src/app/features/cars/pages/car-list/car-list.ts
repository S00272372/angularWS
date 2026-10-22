import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CarCard } from '../../components/car-card/car-card';
import { CarModel } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [AsyncPipe, CarCard, RouterLink],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
})
export class CarList implements OnInit {
  private carService = inject(CarService);

  cars$!: Observable<CarModel[]>;

  ngOnInit(): void {
    this.cars$ = this.carService.getCars();
  }
}

