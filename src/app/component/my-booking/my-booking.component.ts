import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  userDetail:any={};
  data:any={};
  bookingList:any=[];
  bRefNo:any;
  userType:any;
  constructor(private router: Router,private service: RestDataService) { }

  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    this.userType = this.userDetail.UserType;
    if(this.userType=="Agent"){
     this.searchforagent()
    }else{
      this.searchForClient()
    }
   
  }
  search(){
    if(this.userType=="Agent"){
      this.searchforagent()
     }else{
       this.searchForClient()
     }
  }
  searchForClient(){
    // alert("ok")
    if(this.data.bRefNo==undefined){
      this.data.bRefNo=''
    }
    if(this.data.fromDate==undefined){
      this.data.fromDate=''
    }
    if(this.data.toDate==undefined){
      this.data.toDate=''
    }
    // if(this.data.fromDate!=undefined && this.data.toDate!=undefined){ 
      this.service.testGetApiMethod(`Client/ClientBooking?ClientCode=${this.userDetail.UserCode}&BrefNo=${this.data.bRefNo}&FromDate=${this.data.fromDate}&ToDate=${this.data.toDate}`).subscribe(res=>{
      // console.log("getairport ====>"+JSON.stringify(res)); 
      if(res.Status==true){
       
        // this.router.navigate(['oneway'])
        // this.spinner.hide();
        if(res.Data!=null){
          this.bookingList=res.Data
        }
      }
     },
     (err)=>{
      // this.spinner.hide(); 
      // this.router.navigate(['login'])
      // console.log(err)
    });
  }
  searchforagent(){
    // alert("ok")
    if(this.data.bRefNo==undefined){
      this.data.bRefNo=''
    }
    if(this.data.fromDate==undefined){
      this.data.fromDate=''
    }
    if(this.data.toDate==undefined){
      this.data.toDate=''
    }
    // if(this.data.fromDate!=undefined && this.data.toDate!=undefined){ 
      this.service.testGetApiMethod(`Agent/AgentBooking?AgentCode=${this.userDetail.UserCode}&BrefNo=${this.data.bRefNo}&FromDate=${this.data.fromDate}&ToDate=${this.data.toDate}`).subscribe(res=>{
      // console.log("getairport ====>"+JSON.stringify(res)); 
      if(res.Status==true){
       
        // this.router.navigate(['oneway'])
        // this.spinner.hide();
        if(res.Data!=null){
          this.bookingList=res.Data
        }
      }
     },
     (err)=>{
      // this.spinner.hide(); 
      // this.router.navigate(['login'])
      // console.log(err)
    });
  }
// }
showTckt(val,tem){
  this.bRefNo=val
  if(tem=="Bus"){
    window.location.replace(`https://secure.fareinsider.com/Busticket.aspx?item=${this.bRefNo}`);
  }else{
    window.location.replace(`https://secure.fareinsider.com/FlightTicket.aspx?item=${this.bRefNo}`);
  }
  
}
}
