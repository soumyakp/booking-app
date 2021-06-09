import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss']
})
export class BookingPage implements OnInit {
  loadedBookings: Booking[];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings;
  }

  onCancelBooking(id: string, slidingRef: IonItemSliding): void {
    slidingRef.close();
    // Delete item
  }
}
