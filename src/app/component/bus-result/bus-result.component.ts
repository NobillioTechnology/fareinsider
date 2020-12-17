import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bus-result',
  templateUrl: './bus-result.component.html',
  styleUrls: ['./bus-result.component.css']
})
export class BusResultComponent implements OnInit {
  busList:any=[];
  actionType:any=-1;
  reqObj:any={};
  source:any;
  busObj:any={};
  destination:any;
  action:any=-1;
  rowLayout:any=[];
  seatLayout:any=[];
  isSelect:any=-1;
  seatObj:any={};
  data:any={};
  flag:any=1;
  onewayObj:any={};
  roundwayObj:any={}
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //  console.log(params);
       this.reqObj=params
    })
    // var date=new Date(this.reqObj.journeyDate).getFullYear() + '-' + (new Date(this.reqObj.journeyDate).getMonth() + 1) + '-' + new Date(this.reqObj.journeyDate).getDate();
    // this.jrnyDate=new Date(date).toLocaleDateString()
    this.availableBuses()
   
  }
 
  availableBuses(){
    // this.spinner.show();
    this.service.getApiMethod(`Buses/AvailableBuses?sourceId=${this.reqObj.sourceId}&destinationId=${this.reqObj.destinationId}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
    console.log("getbuses ====>"+JSON.stringify(res)); 
    if(res.ResponseStatus==200){
      // this.spinner.hide();
      this.busList=res.AvailableTrips;
      this.source=this.reqObj.srcName
      this.destination=this.reqObj.destName
      // console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
        }
   },
   (err)=>{
    // this.spinner.hide(); 
    // this.router.navigate(['login'])
    // console.log(err)
  });
  }
  returnBus(){
    this.service.getApiMethod(`Buses/AvailableBuses?sourceId=${this.reqObj.destinationId}&destinationId=${this.reqObj.sourceId}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
      // console.log("getflights ====>"+JSON.stringify(res)); 
      if(res.ResponseStatus==200){
        // this.spinner.hide();
        this.busList=res.AvailableTrips;
        this.source=this.reqObj.destName
        this.destination=this.reqObj.srcName
        this.flag=2
        // console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
          }
     },
     (err)=>{
      // this.spinner.hide(); 
      // this.router.navigate(['login'])
      // console.log(err)
    });
  }
  selectSeat(val,obj){
      this.actionType=val;
      this.busObj=obj
      console.log("busObj ====>"+JSON.stringify(this.busObj)); 
      this.service.getApiMethod(`Buses/TripDetails?tripId=${this.busObj.Id}&sourceId=${this.busObj.SourceId}&destinationId=${this.busObj.DestinationId}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&userType=5&provider=${this.busObj.Provider}&travelOPerator=${this.busObj.Travels}&user=''&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
       
        if(res.ResponseStatus==200){
          // this.spinner.hide();
          this.seatLayout=res.Seats;
          for(let i=1; i<=this.seatLayout[this.seatLayout.length-1].Row; i++){
            this.rowLayout.push({'Row':i,'Seats':[]})
          }
          // console.log("row===>"+JSON.stringify(this.rowLayout))
         
            for(let k=0;k<this.rowLayout.length;k++){
              for(let j=0;j<this.seatLayout.length;j++){
              if(this.rowLayout[k].Row==this.seatLayout[j].Row){
            //     alert("k===="+k)
            //     alert("j====="+j)
              
            //     alert("new======="+this.rowLayout[k].Row)
            // alert("old========="+this.seatLayout[j].Row)
            
            this.rowLayout[k].Seats.push(this.seatLayout[j])
          }
        } 
        // console.log("seatssssss=====>"+JSON.stringify(this.rowLayout))
          }
         
            }
       },
     
       (err)=>{
        // this.spinner.hide(); 
        // this.router.navigate(['login'])
        // console.log(err)
      });
  }
  showBDpoints(val,obj){
    this.action=val;
    this.busObj=obj 
  }
  selectYourSeat(val,obj){
    this.isSelect=val
    this.seatObj=obj
    alert("seat selected")
    // alert("seat====="+JSON.stringify(this.seatObj))
  }
  blockSeat(){
    // alert(this.reqObj.tripType)
    // alert(this.flag)
    if(this.reqObj.tripType=='1'){
      this.onewayObj={"BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],"BoardingPointDetails": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],"BusTypeName":this.busObj.BusType,"CancellationPolicy":this.busObj.CancellationPolicy,
      "ConvenienceFee": this.busObj.ConvenienceFee,
      "DepartureTime": this.busObj.DepartureTime,
      "DestinationId": this.busObj.DestinationId,
      "DestinationName": this.destination,
      "DisplayName":this.busObj.DisplayName, "Operator": this.busObj.Travels,
      "PartialCancellationAllowed": this.busObj.PartialCancellationAllowed,
      "DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2],"JourneyDate":this.reqObj.journeyDate,
      "DroppingPointDetails":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],"Fares": this.seatObj.Fare,
      "Provider": this.busObj.Provider,
    "ReturnDate":this.reqObj.returnDate,
    "Seatcodes":  this.seatObj.SeatCode,
    "SeatNos": this.seatObj.Number,
    "ServiceCharge":this.seatObj.OperatorServiceCharge,
    "Servicetax": this.seatObj.Servicetax,
    "SourceId":this.busObj.SourceId,
    "SourceName": this.source,"TripId": this.busObj.Id,
    "TripType": this.reqObj.tripType,
    }
    console.log("oneway====>"+JSON.stringify(this.onewayObj))
    localStorage.setItem('onewayObject', JSON.stringify(this.onewayObj));
      this.router.navigate(['bus-details'],{ queryParams: {'DisplayName':this.busObj.DisplayName,'BusType':this.busObj.BusType,'source':this.source,'destination':this.destination,'Journeydate':this.busObj.Journeydate,'Duration':this.busObj.Duration,'boardingPoint':this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],'boardingTime':this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-3],'dropingPoint':this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],'dropingTime':this.data.dropingId.split('~')[this.data.dropingId.split('~').length-3],'seatNo':this.seatObj.Number,'DepartureTime':this.busObj.DepartureTime,'ArrivalTime':this.busObj.ArrivalTime}})
    }else if(this.reqObj.tripType=='2' && this.flag==1){
      this.onewayObj={"BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],"BoardingPointDetails": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],"BusTypeName":this.busObj.BusType,"CancellationPolicy":this.busObj.CancellationPolicy,
      "ConvenienceFee": this.busObj.ConvenienceFee,
      "DepartureTime": this.busObj.DepartureTime,
      "DestinationId": this.busObj.DestinationId,
      "DestinationName": this.destination,
      "DisplayName":this.busObj.DisplayName, "Operator": this.busObj.Travels,
      "PartialCancellationAllowed": this.busObj.PartialCancellationAllowed,
      "DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2],"JourneyDate":this.reqObj.journeyDate,
      "DroppingPointDetails":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],"Fares": this.seatObj.Fare,
      "Provider": this.busObj.Provider,
    "ReturnDate":this.reqObj.returnDate,
    "Seatcodes":  this.seatObj.SeatCode,
    "SeatNos": this.seatObj.Number,
    "ServiceCharge":this.seatObj.OperatorServiceCharge,
    "Servicetax": this.seatObj.Servicetax,
    "SourceId":this.busObj.SourceId,
    "SourceName": this.source,"TripId": this.busObj.Id,
    "TripType": this.reqObj.tripType,
    }
    console.log("oneway====>"+JSON.stringify(this.onewayObj))
    localStorage.setItem('onewayObject', JSON.stringify(this.onewayObj));
    this.actionType=-1;
        this.returnBus()  
    }else if(this.reqObj.tripType=='2' && this.flag==2){
      this.roundwayObj={"BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],"BoardingPointDetails": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],"BusTypeName":this.busObj.BusType,"CancellationPolicy":this.busObj.CancellationPolicy,
      "ConvenienceFee": this.busObj.ConvenienceFee,
      "DepartureTime": this.busObj.DepartureTime,
      "DestinationId": this.busObj.DestinationId,
      "DestinationName": this.destination,
      "DisplayName":this.busObj.DisplayName, "Operator": this.busObj.Travels,
      "PartialCancellationAllowed": this.busObj.PartialCancellationAllowed,
      "DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2],"JourneyDate":this.reqObj.journeyDate,
      "DroppingPointDetails":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],"Fares": this.seatObj.Fare,
      "Provider": this.busObj.Provider,
    "ReturnDate":this.reqObj.returnDate,
    "Seatcodes":  this.seatObj.SeatCode,
    "SeatNos": this.seatObj.Number,
    "ServiceCharge":this.seatObj.OperatorServiceCharge,
    "Servicetax": this.seatObj.Servicetax,
    "SourceId":this.busObj.SourceId,
    "SourceName": this.source,"TripId": this.busObj.Id,
    "TripType": this.reqObj.tripType,
    }
    console.log("roundway====>"+JSON.stringify(this.roundwayObj))
    localStorage.setItem('roundwayObject', JSON.stringify(this.roundwayObj));
      this.router.navigate(['bus-details'],{ queryParams: {'DisplayName':this.busObj.DisplayName,'BusType':this.busObj.BusType,'source':this.source,'destination':this.destination,'Journeydate':this.busObj.Journeydate,'Duration':this.busObj.Duration,'boardingPoint':this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],'boardingTime':this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-3],'dropingPoint':this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],'dropingTime':this.data.dropingId.split('~')[this.data.dropingId.split('~').length-3],'seatNo':this.seatObj.Number,'DepartureTime':this.busObj.DepartureTime,'ArrivalTime':this.busObj.ArrivalTime}}) 

  }
 
  }
}

// let dataInfo={
//   "Address": "Hyderabad",
//   "Ages": "24",
//   "BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],
//   "BoardingPointDetails": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],
//   "BusTypeName":this.busObj.BusType,
//   "CancellationPolicy":this.busObj.CancellationPolicy,
//   "City": "Hyderabad",
//   "ConvenienceFee": this.busObj.ConvenienceFee,
//   "DepartureTime": this.busObj.DepartureTime,
//   "DestinationId": this.busObj.DestinationId,
//   "DestinationName": this.destination,
//   "DisplayName":this.busObj.DisplayName,
//   "DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2],
//   "DroppingPointDetails":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],
//   "EmailId": "guru.m@i2space.com",
//   "EmergencyMobileNo": "9999999999",
//   "Fares": this.seatObj.Fare,
//   "Genders": "M",
//   "IdCardIssuedBy": "Gov",
//   "IdCardNo": "142341789",
//   "IdCardType": "PAN_CARD",
//   "JourneyDate":this.reqObj.journeyDate,
//   "MobileNo": "9999999999",
//   "Names": "Guru",
//   "NoofSeats": "1",
//   "Operator": this.busObj.Travels,
//   "PartialCancellationAllowed": this.busObj.PartialCancellationAllowed,
//   "PostalCode": "500035",
//   "Provider": this.busObj.Provider,
//   "ReturnDate":this.reqObj.returnDate,
//   "Seatcodes":  this.seatObj.SeatCode,
//   "SeatNos": this.seatObj.Number,
//   "ServiceCharge":this.seatObj.OperatorServiceCharge,
//   "Servicetax": this.seatObj.Servicetax,
//   "SourceId":this.busObj.SourceId,
//   "SourceName": this.source,
//   "State": "Telangana",
//   "Titles": "Mr",
//   "TripId": this.busObj.Id,
//   "TripType": this.reqObj.tripType,
//   "UserType": 5
 
// }
// this.service.postApiMethod(dataInfo,"Buses/BlockBusTicket").subscribe(res=>{
// console.log("getflights ====>"+JSON.stringify(res)); 
// if(res.ResponseStatus==200){     
//   // this.spinner.hide();
//   // this.busList=res.AvailableTrips;
//   // console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
//     }
// },
// (err)=>{
// // this.spinner.hide(); 
// // this.router.navigate(['login'])
// // console.log(err)
// });
