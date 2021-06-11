import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss']
})
export class BookingPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSubscription: Subscription;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingSubscription = this.bookingService.bookings.subscribe(
      booking => {
        this.loadedBookings = booking;
      }
    );
  }

  onCancelBooking(id: string, slidingRef: IonItemSliding): void {
    slidingRef.close();
    // Delete item
  }

  ngOnDestroy(): void {
    if (this.bookingSubscription) {
      this.bookingSubscription.unsubscribe();
    }
  }
}
