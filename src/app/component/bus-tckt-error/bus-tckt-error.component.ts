import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-bus-tckt-error',
  templateUrl: './bus-tckt-error.component.html',
  styleUrls: ['./bus-tckt-error.component.css']
})
export class BusTcktErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
