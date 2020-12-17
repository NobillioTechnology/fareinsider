import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
// import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.css']
})
export class BusDetailsComponent implements OnInit {
  reqObj:any={}
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //  console.log(params);
       this.reqObj=params
    })
  }
 
}
