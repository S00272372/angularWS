import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CarCard } from '../../components/car-card/car-card';
import { CarService } from '../../services/car.service';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CarCard, RouterLink],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
})
export class CarList {
  private carService = inject(CarService);

  state = toSignal(withLoadState(this.carService.getCars()), { requireSync: true });
}