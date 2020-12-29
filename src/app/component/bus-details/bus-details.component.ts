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
  comission:any =0;
  comissionType:any="";
  adultArr:any=[];
  infantArr:any=[];
  childArr:any=[];
  closetem:any=0;
  actionType:any='close';
  isLogin:any=0;
  data:any={};
  mTicketAllowed:any;
  IdProofRequired:any;
  PartialCancellationAllowed:any;
  // titleArr:any=[];
  // fNameArr:any=[];
  // lNameArr:any=[];
  // dobArr:any=[];
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService,private route: ActivatedRoute,private ip:IpServiceService) { }

  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    if(this.userDetail){
      this.isLogin=2
    } 
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
    if(this.saveBusObj.Mticket=="True"){
      this.mTicketAllowed="1"
     }else{
      this.mTicketAllowed="0"
     }
     if(this.saveBusObj.IdProofRequired==false){
      this.IdProofRequired="0"
     }else{
      this.IdProofRequired="1"
     }
     if(this.saveBusObj.PartialCancellationAllowed=="true"){
      this.PartialCancellationAllowed="1"
     }else{
      this.PartialCancellationAllowed="0"
     }
    this.getIP()
    this.salesRule()
    for(let i=0;i<this.reqObj.adults;i++){
      this.adultArr.push({"title":'Mr',"fname":'',"lName":'',"dob":new Date()})
    }
    for(let i=0;i<this.reqObj.children;i++){
      this.childArr.push({"title":'Mr',"fname":'',"lName":'',"dob":new Date()})
    }
    for(let i=0;i<this.reqObj.infants;i++){
      this.infantArr.push({"title":'Mr',"fname":'',"lName":'',"dob":new Date()})
    }
    
  }
  getIP(){
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    });
  }
  salesRule(){
    this.service.testGetApiMethod(`Booking/GetSalesRule?product=SV0010&agentcode=FAREIN0001&salechannel=DO-B2B2C`).subscribe(res=>{
    // console.log("GetSalesRule ====>"+JSON.stringify(res)); 
    if(res.Status==true){
    this.comissionType= res.Data.commType
      this.comission= parseInt(res.Data.commMarkup)
        }
   },
   (err)=>{
    
  });
  }
  netAmount(val){
   let netPrice=0
    if(this.comissionType=="% Mark Up"){
      netPrice =Math.round(val+ (val*this.comission)/100) 
    } else {
      netPrice = Math.round(val+this.comission) 
      
    }
    // alert(netPrice)
   return netPrice
  }
 searchcriteria(){
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
    "serviceid":this.saveBusObj.Id,
   "fare":this.saveBusObj.Fares, 
   "busType":this.saveBusObj.BusType, 
   "departTime":this.saveBusObj.DepartureTime,
   "operatorName":this.saveBusObj.Travels,
   "inventoryType":1, 
   "routeScheduleId":"0", 
   "availableSeats":this.saveBusObj.AvailableSeats, 
   "arrivalTime":this.saveBusObj.ArrivalTime,
   "idProofRequired":this.IdProofRequired, 
   "partialCancellationAllowed":this.PartialCancellationAllowed, 
   "operatorId":this.saveBusObj.OperatorId, 
   "commPCT":"1", 
   "mTicketAllowed":this.mTicketAllowed, 
   "userid":this.userDetail.UserID,
   "agentcode":this.userDetail.Acode, 
   "ip":this.ipAddress, 
   "jtype":this.jType, 
   "ticketholdkey":"2", 
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
        "seatId":this.selectedSeat.Number,
        "sRow":this.selectedSeat.Row,  
        "sColumn":this.selectedSeat.Column,  
        "zIndex":this.selectedSeat.Zindex,  
        "sLength":this.selectedSeat.Length,  
        "sWidth":this.selectedSeat.Width,  
         "Fare":this.selectedSeat.Fare,  
         "totalFareWithTaxes":parseInt(this.selectedSeat.Fare)+parseInt(this.selectedSeat.Servicetax), 
         "serviceTaxAmount":this.selectedSeat.Servicetax,  
         "serviceTaxPer":"0",  
         "operatorServiceChargeAbsolute":this.selectedSeat.OperatorServiceCharge,  
         "operatorServiceChargePercent":"0",  
         "commission":this.saveBusObj.PartnerFareDatails.Commission,  
        "available":(this.selectedSeat.IsAvailableSeat=="True")?1:0,  
        "ladiesSeat":(this.selectedSeat.IsLadiesSeat=="True")?1:0,  
        "bookedBy":"1",  
        "Ac":"0",  
        "sleeper":"0",  
        "serviceTaxApplicable":"0",  
        "inventoryType":0,  
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
saveBusfare(){
  let dataInfo={
    "searchID":this.searchId, 
    "jtype":this.jType,
    "seatid":this.selectedSeat.Number, 
     "CompanyFare":this.selectedSeat.Fare,
     "CompanyServicetax":this.selectedSeat.Servicetax,
     "CompanyDiscount":"0", 
     "CompanyCommission":this.saveBusObj.PartnerFareDatails.Commission,  
     "Companytds":"0", 
     "CompanyTotalAmount":parseInt(this.selectedSeat.Fare)+parseInt(this.selectedSeat.Servicetax),
     "CompanyTax":"0", 
     "AgentFare":this.netAmount(parseInt(this.selectedSeat.Fare)), 
     "AgentServicetax":"0", 
     "AgentDiscount":"0", 
     "AgentCommission":"0", 
     "Agenttds":"0", 
     "AgentTotalAmount":this.netAmount(parseInt(this.selectedSeat.Fare))+parseInt(this.selectedSeat.Servicetax), 
     "AgentTax":this.comission, 
     "CustomerFare":this.netAmount(parseInt(this.selectedSeat.Fare)), 
     "CustomerServicetax":"0", 
     "CustomerDiscount":"0", 
     "CustomerCommission":"0", 
     "Customertds":"0", 
     "CustomerTotalAmount":this.netAmount(parseInt(this.selectedSeat.Fare))+parseInt(this.selectedSeat.Servicetax), 
     "CustomerTax":this.comission,
     "ip":this.ipAddress,
     "Userid":this.userDetail.UserID, 
  }
  this.service.testPostApiMethod(dataInfo,"Booking/SaveBusFare").subscribe(res=>{
  },
  (err)=>{
     // this.spinner.hide(); 
     // this.router.navigate(['login'])
     // console.log(err)
   });
}
savePassenger(){
  let dataInfo={
    "tt":"2", 
    "jtype":"O",
    "searchID":this.searchId, 
    "AgentCode":this.userDetail.Acode, 
    "Title": ["Mr.","Mr."],
     "FirstName": ["Vikas","Amar"],
     "LastName":  ["Panwar","Singh"],
     "Age" :["30","26"],
     "Gender":["M","F"],
     "isLead":["1","0"]
  }
  this.service.testPostApiMethod(dataInfo,"Booking/SaveBusPasenger").subscribe(res=>{
  },
  (err)=>{
     // this.spinner.hide(); 
     // this.router.navigate(['login'])
     // console.log(err)
   });
 }
payment(){
  if(this.isLogin==0){
    this.showLoginForm();
  }else{
    this.searchcriteria()
    this.saveBus()
    this.saveBusSeat()
    this.saveBusfare()
      // this.bookTckt()
      // if(this.reqObj.tripType=='1'){
      // this.saveSelectedFlight_1()
      // this.saveSelectedFare_1()
      // }else if(this.reqObj.tripType=='2'){
      // this.saveSelectedFlight_1()
      // this.saveSelectedFlight_2()
      // this.saveSelectedFare_1()
      // this.saveSelectedFare_2()
      }
      // this.savePassenger()
    }
    showLoginForm(){
      if(this.closetem==0){
        this.closetem=1
        this.actionType='open';
      }else if(this.closetem==1){
        this.closetem=0
        this.actionType='close';
      }
    }
    sendOtp(){
      this.service.testGetApiMethod("/comman/GetOtp?MobileNo="+this.data.contact).subscribe(res=>{
      // console.log("GetSalesRule ====>"+JSON.stringify(res)); 
      if(res.Status==true){
        this.isLogin=1
        this.signUp()
        // alert("successfull")
        
      // this.comissionType= res.Data.commType
      //   this.comission= parseInt(res.Data.commMarkup)
          }
     },
     (err)=>{
      
    });
      }
      login(){
        this.service.testGetApiMethod(`Client/ClientLogin?Email=${this.data.emailAdd}&Password=${this.data.passwrd}`).subscribe(res=>{
          // console.log("getairport ====>"+JSON.stringify(res)); 
           if(res.Status==true){
            //  localStorage.setItem("userId",res.Data.UserID)
             localStorage.setItem('userData', JSON.stringify(res.Data));
            //  window.history.back()
             setTimeout(()=>{
              // window.location.reload();
              this.userDetail = JSON.parse(localStorage.getItem('userData'));
              if(this.userDetail){
                this.isLogin=2
              } 
              // this.showLoginForm();
              // this.router.navigate(['flight-details'],{ queryParams:this.route.queryParams});
              // this.ngOnInit();
            },1000)
            
            //  this.router.navigate(['window.location.pathname'])
             // this.spinner.hide();
            //  if(res.Data!=null){
            //  this.airportSrcList=res.Data;
            //  } 
           }
          },
          (err)=>{
           // this.spinner.hide(); 
           // this.router.navigate(['login'])
           // console.log(err)
         });  
      }
      verify(){
        this.service.testGetApiMethod("/comman/verifyOtp?MobileNo="+this.data.contact+"&Otp="+this.data.otp).subscribe(res=>{
          // console.log("GetSalesRule ====>"+JSON.stringify(res)); 
          if(res.Status==true){
            this.isLogin=2
            localStorage.setItem("userData",JSON.stringify({UserID:"123213uyiy"}))
            // alert("successfull")
          // this.comissionType= res.Data.commType
          //   this.comission= parseInt(res.Data.commMarkup)
              }
         },
         (err)=>{
          
        });
      }
      signUp(){
        let dataInfo={
          "FullName":'Guest Login',
          "Email":this.data.emailId,
          "Mobile":this.data.contact,
          "IP":this.ipAddress
        }
        this.service.testPostApiMethod(dataInfo,"Client/ClientRegistration").subscribe(res=>{
        },
        (err)=>{
           // this.spinner.hide(); 
           // this.router.navigate(['login'])
           // console.log(err)
         }); 
      }
}



