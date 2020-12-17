import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-hotel-result',
  templateUrl: './hotel-result.component.html',
  styleUrls: ['./hotel-result.component.css']
})
export class HotelResultComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
