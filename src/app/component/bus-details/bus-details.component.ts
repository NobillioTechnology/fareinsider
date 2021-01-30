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
  // seatBlockOneway:any={};
  selectedSeat:any=[];
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
  titleArr:any=[];
  fNameArr:any=[];
  lNameArr:any=[];
  genderArr:any=[];
  ageArr:any=[];
  baseFare:any=0
  tax:any=0
  mobileNum:any='close';
  agentCode:any;
  salechanl:any;
  leadArr:any=[]
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService,private route: ActivatedRoute,private ip:IpServiceService) { }

  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    if(this.userDetail){
      this.isLogin=2
      this.agentCode=this.userDetail.Acode
      this.salechanl='DO-B2B2C'
      if(this.userDetail.UserType=="Agent"){
        this.salechanl='SA-B2B'
      }
    }else{
      this.agentCode='FAREIN0001'
      this.salechanl='DO-B2B2C'
    }
  
    // alert(this.fNameArr[this.fNameArr.length-1])
    // this.seatBlockOneway = JSON.parse(localStorage.getItem('onewayObject'));
    this.selectedSeat = JSON.parse(localStorage.getItem('seatSelected'));
    this.searchId= localStorage.getItem("searchId");
    this.route.queryParams.subscribe(params => {
      //  console.log(params);
       this.reqObj=params
       for(let i=0;i<this.selectedSeat.length;i++){
        this.baseFare=this.baseFare+parseInt(this.selectedSeat[i].Fare)
        this.tax=this.tax+parseInt(this.selectedSeat[i].Servicetax)
       }
     
      //  this.baseFare=(parseInt(this.selectedSeat.Fare))*(this.reqObj.noOfSeats)
      //  this.tax=(this.netAmount(parseInt(this.selectedSeat.Servicetax)))*(this.reqObj.noOfSeats)
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
    for(let i=0;i<this.reqObj.noOfSeats;i++){
      this.adultArr.push({"title":'Mr',"fname":'',"lName":'','age':''})
    } 
    // alert(this.isLogin)
  }
  getIP(){
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      console.log("IP ====>"+JSON.stringify(this.ipAddress)); 
    });
  }
  salesRule(){
    this.service.testGetApiMethod(`Booking/GetSalesRule?product=SV0010&agentcode=${this.agentCode}&salechannel=${this.salechanl}`).subscribe(res=>{
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
  timeConvert(val){
    var minutes = val%60
    var hours = (val - minutes) / 60
    var boardingTym=hours+":"+minutes
    return boardingTym
    console.log(boardingTym)
   }
  chngeBus(){
    window.history.back()
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
   "ticketholdkey":this.saveBusObj.Provider,
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

// saveBusSeat(){
//   let dataInfo={
//        "searchId":this.searchId,  
//         "seatId":this.selectedSeat.Number,
//         "sRow":this.selectedSeat.Row,  
//         "sColumn":this.selectedSeat.Column,  
//         "zIndex":this.selectedSeat.Zindex,  
//         "sLength":this.selectedSeat.Length,  
//         "sWidth":this.selectedSeat.Width,  
//          "Fare":this.selectedSeat.Fare,  
//          "totalFareWithTaxes":parseInt(this.selectedSeat.Fare)+parseInt(this.selectedSeat.Servicetax), 
//          "serviceTaxAmount":this.selectedSeat.Servicetax,  
//          "serviceTaxPer":"0",  
//          "operatorServiceChargeAbsolute":this.selectedSeat.OperatorServiceCharge,  
//          "operatorServiceChargePercent":"0",  
//          "commission":this.saveBusObj.PartnerFareDatails.Commission,  
//         "available":(this.selectedSeat.IsAvailableSeat=="True")?1:0,  
//         "ladiesSeat":(this.selectedSeat.IsLadiesSeat=="True")?1:0,  
//         "bookedBy":"1",  
//         "Ac":"0",  
//         "sleeper":"0",  
//         "serviceTaxApplicable":"0",  
//         "inventoryType":0,  
//         "boardingPoints":this.seatBlockOneway.BoardingId,  
//         "jType":this.jType,
//         "IP":this.ipAddress,   
//         "userid":this.userDetail.UserID,  
//         "dropingpointId":this.seatBlockOneway.DroppingId
//   }
//   this.service.testPostApiMethod(dataInfo,"Booking/SaveBusSeat").subscribe(res=>{
//   },
//   (err)=>{
//      // this.spinner.hide(); 
//      // this.router.navigate(['login'])
//      // console.log(err)
//    });
// }
// saveBusfare(){
//   let dataInfo={
//     "searchID":this.searchId, 
//     "jtype":this.jType,
//     "seatid":this.selectedSeat.Number, 
//      "CompanyFare":this.selectedSeat.Fare,
//      "CompanyServicetax":this.selectedSeat.Servicetax,
//      "CompanyDiscount":"0", 
//      "CompanyCommission":this.saveBusObj.PartnerFareDatails.Commission,  
//      "Companytds":"0", 
//      "CompanyTotalAmount":parseInt(this.selectedSeat.Fare)+parseInt(this.selectedSeat.Servicetax),
//      "CompanyTax":"0", 
//      "AgentFare":this.netAmount(parseInt(this.selectedSeat.Fare)), 
//      "AgentServicetax":"0", 
//      "AgentDiscount":"0", 
//      "AgentCommission":"0", 
//      "Agenttds":"0", 
//      "AgentTotalAmount":this.netAmount(parseInt(this.selectedSeat.Fare))+parseInt(this.selectedSeat.Servicetax), 
//      "AgentTax":this.comission, 
//      "CustomerFare":this.netAmount(parseInt(this.selectedSeat.Fare)), 
//      "CustomerServicetax":"0", 
//      "CustomerDiscount":"0", 
//      "CustomerCommission":"0", 
//      "Customertds":"0", 
//      "CustomerTotalAmount":this.netAmount(parseInt(this.selectedSeat.Fare))+parseInt(this.selectedSeat.Servicetax), 
//      "CustomerTax":this.comission,
//      "ip":this.ipAddress,
//      "Userid":this.userDetail.UserID, 
//   }
//   this.service.testPostApiMethod(dataInfo,"Booking/SaveBusFare").subscribe(res=>{
//   },
//   (err)=>{
//      // this.spinner.hide(); 
//      // this.router.navigate(['login'])
//      // console.log(err)
//    });
// }
savePassenger(){
  this.titleArr = []
      this.fNameArr= []
      this.lNameArr=[]
      this.genderArr=[]
      this.ageArr=[]
      this.leadArr=[]
      if(this.adultArr.length!=0){
        this.adultArr.find((item,index)=>{
          this.titleArr.push(item.title)
          if(item.title=="Mr" || item.title=="Mstr"){
            this.genderArr.push("M")
          }else if(item.title=="Ms" || item.title=="Mrs"){
            this.genderArr.push("F")
          }
          if(index==0){
            this.leadArr.push("1")
          }
          else{
            this.leadArr.push("0")
          }
          this.fNameArr.push(item.fname)
          this.lNameArr.push(item.lName)
          this.ageArr.push(item.age)
        })
      }
      if(this.fNameArr[0]!='' && this.lNameArr[0]!='' && this.ageArr[0]!=''){
        let dataInfo={
          "tt":this.reqObj.noOfSeats,
          "jtype":this.jType,
          "searchID":this.searchId, 
          "AgentCode":this.userDetail.Acode, 
          "Title": this.titleArr,
          "FirstName":this.fNameArr,
          "LastName":this.lNameArr,
          "Age" :this.ageArr,
          "Gender":this.genderArr,
          "isLead":this.leadArr
        }
        this.service.testPostApiMethod(dataInfo,"Booking/SaveBusPasenger").subscribe(res=>{
          if(res.Status==true){
             this.router.navigate(['bus-payment'],{ queryParams: {'baseFare':this.baseFare,'tax':this.tax}})
           }
        },
        (err)=>{
           // this.spinner.hide(); 
           // this.router.navigate(['login'])
           // console.log(err)
         });
      }
 }
payment(){
  if(this.isLogin==0){
    this.showLoginForm();
  }else{
    this.searchcriteria()
    this.saveBus()
    for(let i=0;i<this.selectedSeat.length;i++){
      let dataInfo={
        "searchId":this.searchId,  
         "seatId":this.selectedSeat[i].Number,
         "sRow":this.selectedSeat[i].Row,  
         "sColumn":this.selectedSeat[i].Column,  
         "zIndex":this.selectedSeat[i].Zindex,  
         "sLength":this.selectedSeat[i].Length,  
         "sWidth":this.selectedSeat[i].Width,  
          "Fare":this.selectedSeat[i].Fare,  
          "totalFareWithTaxes":parseInt(this.selectedSeat[i].Fare)+parseInt(this.selectedSeat[i].Servicetax), 
          "serviceTaxAmount":this.selectedSeat[i].Servicetax,  
          "serviceTaxPer":"0",  
          "operatorServiceChargeAbsolute":this.selectedSeat[i].OperatorServiceCharge,  
          "operatorServiceChargePercent":"0",  
          "commission":this.saveBusObj.PartnerFareDatails.Commission,  
         "available":(this.selectedSeat[i].IsAvailableSeat=="True")?1:0,  
         "ladiesSeat":(this.selectedSeat[i].IsLadiesSeat=="True")?1:0,  
         "bookedBy":"1",  
         "Ac":"0",  
         "sleeper":"0",  
         "serviceTaxApplicable":"0",  
         "inventoryType":0,  
         "boardingPoints":this.reqObj.BoardingId,  
         "jType":this.jType,
         "IP":this.ipAddress,   
         "userid":this.userDetail.UserID,  
         "dropingpointId":this.reqObj.DroppingId
   }
   this.service.testPostApiMethod(dataInfo,"Booking/SaveBusSeat").subscribe(res=>{
   },
   (err)=>{
      // this.spinner.hide(); 
      // this.router.navigate(['login'])
      // console.log(err)
    });
    let datainfo={
      "searchID":this.searchId, 
      "jtype":this.jType,
      "seatid":this.selectedSeat[i].Number, 
       "CompanyFare":this.selectedSeat[i].Fare,
       "CompanyServicetax":this.selectedSeat[i].Servicetax,
       "CompanyDiscount":"0", 
       "CompanyCommission":this.saveBusObj.PartnerFareDatails.Commission,  
       "Companytds":"0", 
       "CompanyTotalAmount":parseInt(this.selectedSeat[i].Fare)+parseInt(this.selectedSeat[i].Servicetax),
       "CompanyTax":"0", 
       "AgentFare":this.netAmount(parseInt(this.selectedSeat[i].Fare)), 
       "AgentServicetax":"0", 
       "AgentDiscount":"0", 
       "AgentCommission":"0", 
       "Agenttds":"0", 
       "AgentTotalAmount":this.netAmount(parseInt(this.selectedSeat[i].Fare))+parseInt(this.selectedSeat[i].Servicetax), 
       "AgentTax":this.comission, 
       "CustomerFare":this.netAmount(parseInt(this.selectedSeat[i].Fare)), 
       "CustomerServicetax":"0", 
       "CustomerDiscount":"0", 
       "CustomerCommission":"0", 
       "Customertds":"0", 
       "CustomerTotalAmount":this.netAmount(parseInt(this.selectedSeat[i].Fare))+parseInt(this.selectedSeat[i].Servicetax), 
       "CustomerTax":this.comission,
       "ip":this.ipAddress,
       "Userid":this.userDetail.UserID, 
    }
    this.service.testPostApiMethod(datainfo,"Booking/SaveBusFare").subscribe(res=>{
    },
    (err)=>{
       // this.spinner.hide(); 
       // this.router.navigate(['login'])
       // console.log(err)
     });
    }
  
    this.savePassenger()
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
    enterNum(){
      if(this.data.contact.length==10){
        this.mobileNum='show'
      }else
        this.mobileNum='close'
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
            alert(res.Message)
            //  localStorage.setItem("userId",res.Data.UserID)
             localStorage.setItem('userData', JSON.stringify(res.Data));
            //  window.history.back()
            window.location.reload();
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
           }else{
            alert(res.Message)
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
          if(res.Status==true){
            alert(res.Message)
          }else{
            alert(res.Message)
          }
        },
        (err)=>{
           // this.spinner.hide(); 
           // this.router.navigate(['login'])
           // console.log(err)
         }); 
      }
      chngePswrd(){
        this.router.navigate(['change-pasword'])
      }
}



