import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  ticketHtml:any;
  searchId:any;
  constructor(private router: Router,private service: RestDataService,) { }

  ngOnInit(): void {
    let url= location.href
    this.searchId= url.split('/')[url.split('/').length-1]
    this.getTicket()
  }
 getTicket(){
    this.service.testGetApiMethod(`Booking/GetTicketHtml?SearchId=${this.searchId}`).subscribe(res=>{
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
