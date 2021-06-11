import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { delay, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private $places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
      149.99,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      // eslint-disable-next-line @typescript-eslint/quotes
      "L'Amour Toujours",
      'A romantic place in Paris!',
      'https://miro.medium.com/max/4096/1*t-nXIcaD3oP6CS4ydXV1xw.jpeg',
      189.99,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg',
      99.99,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    )
  ]);
  get places(): Observable<Place[]> {
    return this.$places.asObservable();
  }
  constructor(private authService: AuthService) {}

  getPlace(id: string): Observable<Place> {
    return this.places.pipe(
      take(1),
      map(places => ({ ...places.find(p => p.id === id) }))
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ): Observable<Place[]> {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://miro.medium.com/max/4096/1*t-nXIcaD3oP6CS4ydXV1xw.jpeg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this.$places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(
    placeId: string,
    title: string,
    description: string
  ): Observable<Place[]> {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this.$places.next(updatedPlaces);
      })
    );
  }
}
