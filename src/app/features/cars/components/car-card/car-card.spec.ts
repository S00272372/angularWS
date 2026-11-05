import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCard } from './car-card';

describe('CarCard', () => {
  let fixture: ComponentFixture<CarCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCard],
    }).compileComponents();

   fixture = TestBed.createComponent(CarCard);
    fixture.componentRef.setInput('car', {
      _id: '1',
      make: 'Toyota',
      model: 'Corolla',
      year: 2022,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the car details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Toyota Corolla');
    expect(compiled.textContent).toContain('Year: 2022');
  });
});
