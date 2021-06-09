import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placesSubscription: Subscription;

  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    this.placesSubscription = this.placesService.places.subscribe(places => {
      this.offers = places;
    });
  }

  // ionViewWillEnter() {
  //   this.offers = this.placesService.places;
  // }

  onEdit(id: string, slidingRef: IonItemSliding): void {
    slidingRef.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit-offer', id]);
  }

  ngOnDestroy(): void {
    if (this.placesSubscription) {
      this.placesSubscription.unsubscribe();
    }
  }
}
