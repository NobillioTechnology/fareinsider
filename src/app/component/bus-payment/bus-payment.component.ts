import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-bus-payment',
  templateUrl: './bus-payment.component.html',
  styleUrls: ['./bus-payment.component.css']
})
export class BusPaymentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
