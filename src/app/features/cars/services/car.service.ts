import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { CarModel } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cars';
  private fallbackCars: CarModel[] = [
    { _id: '507f1f77bcf86cd799439011', id: 1, make: 'Ford', model: 'Focus', year: 2021 },
    { _id: '507f1f77bcf86cd799439012', id: 2, make: 'Toyota', model: 'Corolla', year: 2023 },
    { _id: '507f1f77bcf86cd799439013', id: 3, make: 'Honda', model: 'Civic', year: 2022 },
  ];

  getCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(this.apiUrl).pipe(
      map((cars) => (cars && cars.length ? cars : this.fallbackCars)),
      catchError(() => of(this.fallbackCars)),
    );
  }

  getCarById(id: string): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.apiUrl}/${id}`).pipe(
      catchError(() =>
        of(
          this.fallbackCars.find(
            (car) => car._id === id || String(car.id) === id,
          ) ?? {
            _id: id,
            make: 'Unknown',
            model: 'Unknown',
          },
        ),
      ),
    );
  }

  addCar(car: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(this.apiUrl, car).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      if (error.status === 401 || error.status === 403) {
        console.error('authorisation issue ', error.status);
        return throwError(() => new Error('You are not authorised for that action'));
      }

      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
