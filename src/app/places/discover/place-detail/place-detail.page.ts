import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController
} from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/booking/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private placesService: PlacesService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      if (!param.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(param.get('placeId'));
    });
  }

  onBookPlace(): void {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionEl => {
        actionEl.present();
      });

    // this.router.navigate(['/places/tabs/discover']);
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // if this page is the first page then pop() will not work
    // this.navCtrl.pop();
  }

  openBookingModal(mode: 'select' | 'random'): void {
    console.log('mode', mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { place: this.place }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData);
        if (resultData.role === 'confirm') {
          console.log('bookwd!');
        }
      });
  }
}
