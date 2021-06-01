import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  @Input() place: Place;

  constructor(private modalCrtl: ModalController) {}

  ngOnInit() {}

  onCancel(): void {
    this.modalCrtl.dismiss(null, 'cancel');
  }

  onBookPlace(): void {
    this.modalCrtl.dismiss({ message: 'Dummy message!' }, 'confirm');
  }
}
