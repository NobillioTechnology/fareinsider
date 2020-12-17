import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-hotel-payment',
  templateUrl: './hotel-payment.component.html',
  styleUrls: ['./hotel-payment.component.css']
})
export class HotelPaymentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
