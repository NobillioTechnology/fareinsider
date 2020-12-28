import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
// import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';
import { IpServiceService } from '../../ip-service.service';
@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.css']
})
export class BusDetailsComponent implements OnInit {
  reqObj:any={};
  saveBusObj:any={};
  jType:any;
  userDetail:any={};
  ipAddress:string;
  searchId:any;
  seatBlockOneway:any={};
  selectedSeat:any={};
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService,private route: ActivatedRoute,private ip:IpServiceService) { }

  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    this.seatBlockOneway = JSON.parse(localStorage.getItem('onewayObject'));
    this.selectedSeat = JSON.parse(localStorage.getItem('seatSelected'));
    this.searchId= localStorage.getItem("searchId");
    this.route.queryParams.subscribe(params => {
      //  console.log(params);
       this.reqObj=params
       if(this.reqObj.tripType=='1'){
       this.jType="O"
       }else if(this.reqObj.tripType=='2'){
        this.jType="R"
       }
    })
    this.saveBusObj=JSON.parse(localStorage.getItem('saveBusObj'));
    this.getIP()
  }
  getIP(){
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    });
  }
 searchcriteria(){
 
  // console.log("selectedddd_flight========>"+JSON.stringify(obj))
  // this.index=val
  let dataInfo={
    "searchId":this.searchId, 
    "Origin":this.reqObj.source, 
    "destination":this.reqObj.destination, 
    "departDate": this.reqObj.Journeydate,
    "arrdatetime": this.saveBusObj.ArrivalTime,
    "tripType":this.jType, 
    "clientcode":this.userDetail.UserCode,
    "agentCode":this.userDetail.Acode, 
    "salechannel":"DO-B2C", 
    "userid":this.userDetail.UserID,
    "IP":this.ipAddress,
  }
  this.service.testPostApiMethod(dataInfo,"Booking/SaveBusSearchCriteria").subscribe(res=>{
  },
  (err)=>{
     // this.spinner.hide(); 
     // this.router.navigate(['login'])
     // console.log(err)
   });
 }
 saveBus(){
  let dataInfo={
    "searchid":this.searchId, 
    "serviceid":"0",
   "fare":this.saveBusObj.Fares, 
   "busType":this.saveBusObj.BusType, 
   "departTime":this.saveBusObj.DepartureTime,
   "operatorName":this.saveBusObj.Travels,
   "inventoryType":this.saveBusObj.InventoryType, 
   "routeScheduleId":"0", 
   "availableSeats":this.saveBusObj.AvailableSeats, 
   "arrivalTime":this.saveBusObj.ArrivalTime,
   "idProofRequired":this.saveBusObj.IdProofRequired, 
   "partialCancellationAllowed":this.saveBusObj.PartialCancellationAllowed, 
   "operatorId":"0", 
   "commPCT":"0", 
   "mTicketAllowed":this.saveBusObj.Mticket, 
   "userid":this.userDetail.UserID,
   "agentcode":this.userDetail.Acode, 
   "ip":this.ipAddress, 
   "jtype":this.jType, 
   "ticketholdkey":"0", 
   "seatblockjson":"0"
  }
  this.service.testPostApiMethod(dataInfo,"Booking/SaveBus").subscribe(res=>{
  },
  (err)=>{
     // this.spinner.hide(); 
     // this.router.navigate(['login'])
     // console.log(err)
   });
}
saveBusSeat(){
  let dataInfo={
    "searchId":this.searchId,  
        "seatId":"S", 
        "sRow":this.selectedSeat.Row,  
        "sColumn":this.selectedSeat.Column,  
        "zIndex":this.selectedSeat.Zindex,  
        "sLength":this.selectedSeat.Length,  
        "sWidth":this.selectedSeat.Width,  
         "Fare":this.selectedSeat.Fare,  
         "totalFareWithTaxes":"0", 
         "serviceTaxAmount":this.selectedSeat.Servicetax,  
         "serviceTaxPer":"0",  
         "operatorServiceChargeAbsolute":this.selectedSeat.OperatorServiceCharge,  
         "operatorServiceChargePercent":"0",  
         "commission":this.saveBusObj.PartnerFareDatails.Commission,  
        "available":this.selectedSeat.IsAvailableSeat,  
        "ladiesSeat":this.selectedSeat.IsLadiesSeat,  
        "bookedBy":"0",  
        "Ac":"0",  
        "sleeper":"0",  
        "serviceTaxApplicable":"0",  
        "inventoryType":this.saveBusObj.InventoryType,  
        "boardingPoints":this.seatBlockOneway.BoardingId,  
        "jType":this.jType,
        "IP":this.ipAddress,   
        "userid":this.userDetail.UserID,  
        "dropingpointId":this.seatBlockOneway.DroppingId
  }
  this.service.testPostApiMethod(dataInfo,"Booking/SaveBusSeat").subscribe(res=>{
  },
  (err)=>{
     // this.spinner.hide(); 
     // this.router.navigate(['login'])
     // console.log(err)
   });
}
payment(){
  this.searchcriteria()
  this.saveBus()
  this.saveBusSeat()
}
}

