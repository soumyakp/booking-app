import { Component, OnInit } from '@angular/core';
import { IonSegment, MenuController } from '@ionic/angular';

import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  }

  toggleMenu(): void {
    this.menuCtrl.toggle('m1');
  }

  onSegmentChange(event: any): void {
    console.log(event.detail);
  }
}
