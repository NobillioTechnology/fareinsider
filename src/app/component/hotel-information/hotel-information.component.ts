import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-hotel-information',
  templateUrl: './hotel-information.component.html',
  styleUrls: ['./hotel-information.component.css']
})
export class HotelInformationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
