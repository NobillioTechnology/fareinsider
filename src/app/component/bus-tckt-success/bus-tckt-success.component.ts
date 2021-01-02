import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';

@Component({
  selector: 'app-bus-tckt-success',
  templateUrl: './bus-tckt-success.component.html',
  styleUrls: ['./bus-tckt-success.component.css']
})
export class BusTcktSuccessComponent implements OnInit {
  ticketHtml:any;
  searchId:any;
  constructor(private router: Router,private service: RestDataService,) { }

  ngOnInit(): void {
    let url= location.href
    this.searchId= url.split('/')[url.split('/').length-1]
    this.getTicket()
  }
 getTicket(){
    this.service.testGetApiMethod(`Booking/GetBusTicketHtml?SearchId=${this.searchId}`).subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
    if(res.Status==true){
    this.ticketHtml=res.Data
    }
   },
   (err)=>{
    // this.spinner.hide(); 
    // this.router.navigate(['login'])
    // console.log(err)
  });
  
  }
}