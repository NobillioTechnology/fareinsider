import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';
import { IpServiceService } from '../../ip-service.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  loginType:any;
  index:any;
  flightDetails:any=[];
  fareDetails:any={};
  url:any;
  tripName:any;
  ind:any;
  departure:any;
  return:any;
  flyType:any;
  flightDepart:any=[];
  depFlightDet:any={};
  flightReturn:any=[];
  returnFlightDet:any={};
  returnFlightFare:any={};
  depFlightFare:any={};
  totalTime:any;
  totalTimeRet:any;
  reqObj:any={};
  logintab:any='close';
  userDetail:any={};
  ipAddress:string;
  selectedFlight:any={};
  domInt:any;
  comission:any =0;
  comissionType:any="";
  data:any={};
  isConnect:any;
  searchId:any;
  isLogin:any=0;
  selReturnFlyt:any={}
  saveFlyOne:any={};
  saveFlyRound:any={};
  action:any='close';
  adultArr:any=[];
  infantArr:any=[];
  childArr:any=[];
  titleArr:any=[];
  fNameArr:any=[];
  lNameArr:any=[];
  dobArr:any=[];
  passNoArr:any=[];
  nationArr:any=[];
  issCountryArry:any=[];
  passExpArr:any=[];
  passengertype:any=[];
  fareTab:any='close';
  mobileNum:any='close';
  closetem:any=0;
  actionType:any='close';
  countryList:any=[];
  jType:any;
  agentCode:any;
  salechanl:any;
  travelClass:any;
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService,private route: ActivatedRoute,private ip:IpServiceService) { }

  ngOnInit(){
    this.getIP()
    this.selectCountry()
    this.searchId= localStorage.getItem("searchId");
  //  this.roundFlightDetail()
   this.url=this.service.baseUrl
   this.route.queryParams.subscribe(params => {
    console.log(params);
    this.ind = params['index'];
    // alert(this.ind)
    // this.tripType=params['tripType'];
    this.departure = params['flight1'];
    this.return = params['flight2'];
    // this.flyType=params['flightType']
    this.reqObj=params
    // if(this.tripType=='oneway' && this.flyType=='domestic'){
    //   this.flightDetail()
    // }else if(this.tripType=='oneway' && this.flyType=='international'){
    //   this.internationalFlightDetail()
    // }else if(this.tripType=='roundway' && this.flyType=='domestic'){
    //  this.roundFlightDetail()
    // }else if(this.tripType=='roundway' && this.flyType=='international'){
    //  this.availableIntRoundwayFlights()
    // }
  })
  this.flightDetail()
  this.travelClass=localStorage.getItem("travelclass")
  this.userDetail = JSON.parse(localStorage.getItem('userData'));
  this.saveFlyOne=JSON.parse(localStorage.getItem('saveFlyt'));
  console.log('saved flyt====>', this.saveFlyOne);
  this.saveFlyRound=JSON.parse(localStorage.getItem('saveRetFlyt'));
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
  
  
  this.salesRule()
  for(let i=0;i<this.reqObj.adults;i++){
    if(this.reqObj.flightType=='1'){
    this.adultArr.push({"title":'Mr',"fname":'',"lName":'',"dob":new Date(),"nationality":'india',"passNo":'122121212',"issCon":'india',"passExp":new Date()})
  }else if(this.reqObj.flightType=='2'){
    this.adultArr.push({"title":'Mr',"fname":'',"lName":'',"dob":'',"nationality":'',"passNo":'',"issCon":'',"passExp":''})
  }
}
  for(let i=0;i<this.reqObj.children;i++){
    if(this.reqObj.flightType=='1'){
    this.childArr.push({"title":'Mr',"fname":'',"lName":'',"dob":new Date(),"nationality":'india',"passNo":'122121212',"issCon":'india',"passExp":new Date()})
  }else if(this.reqObj.flightType=='2'){
    this.childArr.push({"title":'Mr',"fname":'',"lName":'',"dob":'',"nationality":'',"passNo":'',"issCon":'',"passExp":''})
  }
}
  for(let i=0;i<this.reqObj.infants;i++){
    if(this.reqObj.flightType=='1'){
    this.infantArr.push({"title":'Mr',"fname":'',"lName":'',"dob":new Date(),"nationality":'india',"passNo":'122121212',"issCon":'india',"passExp":new Date()})
  }else if(this.reqObj.flightType=='2'){
    this.infantArr.push({"title":'Mr',"fname":'',"lName":'',"dob":'',"nationality":'',"passNo":'',"issCon":'',"passExp":''})
  }
}

  }
  chngeFlyt(){
    window.history.back()
  }
  salesRule(){
    // this.spinner.show();
    this.service.testGetApiMethod(`Booking/GetSalesRule?product=SV0002&agentcode=${this.agentCode}&salechannel=${this.salechanl}`).subscribe(res=>{
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
  showGst(val){
    this.action=val
  }
  flightDetail(){
    // this.spinner.show();
    this.service.getApiMethod(`Flights/AvailableFlights?source=${this.reqObj.source}&destination=${this.reqObj.destination}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&flightType=${this.reqObj.flightType}&adults=${this.reqObj.adults}&children=${this.reqObj.children}&infants=${this.reqObj.infants}&travelClass=${this.reqObj.travelClass}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
    // console.log("getflights ====>"+JSON.stringify(res)); 
    if(res.ResponseStatus==200){
      if(this.reqObj.tripType=='1' && this.reqObj.flightType=='1'){
        this.tripName='oneway'
        this.jType='O'
        this.domInt='D'
        // alert(this.tripType)
        this.flightDetails=res.DomesticOnwardFlights[this.ind].FlightSegments;
      this.totalTime=this.flightDetails[this.flightDetails.length-1].AccumulatedDuration
      this.fareDetails=res.DomesticOnwardFlights[this.ind].FareDetails.ChargeableFares
      let totAmount:any=this.netAmount(this.fareDetails.NetFare)
      localStorage.setItem("orderAount",totAmount)
      // this.flightUid=res.DomesticOnwardFlights[this.ind].FlightUId
      // this.selectedFlight=res.DomesticOnwardFlights[this.ind]
      // console.log("selFlyt"+this.selectedFlight)
      }else if(this.reqObj.tripType=='1' && this.reqObj.flightType=='2'){
        this.tripName='oneway'
        this.jType='O'
        this.domInt='I'
        this.flightDetails=res.InternationalFlights[this.ind].IntOnward.FlightSegments;
      this.totalTime=this.flightDetails[this.flightDetails.length-1].AccumulatedDuration
      // this.flightUid=res.InternationalFlights[this.ind].FlightUId
      // this.selectedFlight=res.InternationalFlights[this.ind]
      // alert(this.totalTime)
      this.fareDetails=res.InternationalFlights[this.ind].FareDetails.ChargeableFares
      let totAmount:any=this.netAmount(this.fareDetails.NetFare)
      localStorage.setItem("orderAount",totAmount)
      }else if(this.reqObj.tripType=='2' && this.reqObj.flightType=='1'){
        this.tripName='roundway'
        this.jType='R'
        this.domInt='D'
        this.flightDepart=res.DomesticOnwardFlights;
        this.flightReturn=res.DomesticReturnFlights
        this.flightDepart.find((item,index)=>{
          // console.log(JSON.stringify(item))
          if(item.FlightUId==this.departure){
            // this.selectedFlight=item
            this.depFlightDet=item.FlightSegments
            this.totalTime=this.depFlightDet[this.depFlightDet.length-1].AccumulatedDuration
            this.depFlightFare=item.FareDetails.ChargeableFares
            return 1;
          }
        })
        this.flightReturn.find((item,index)=>{
          // console.log(JSON.stringify(item))
          if(item.FlightUId==this.return){
            // this.selReturnFlyt=item
            this.returnFlightDet=item.FlightSegments
            this.totalTimeRet=this.returnFlightDet[this.returnFlightDet.length-1].AccumulatedDuration
            this.returnFlightFare=item.FareDetails.ChargeableFares
            return 1;
          }
        })
        let totAmount:any=this.netAmount(this.depFlightFare.NetFare+this.returnFlightFare.NetFare)
      localStorage.setItem("orderAount",totAmount)
      }else if(this.reqObj.tripType=='2' && this.reqObj.flightType=='2'){
        this.tripName='roundway'
        this.jType='R'
        this.domInt='I'
        // this.selectedFlight=res.InternationalFlights[this.ind]
        this.depFlightDet=res.InternationalFlights[this.ind].IntOnward.FlightSegments;
      this.totalTime=this.depFlightDet[this.depFlightDet.length-1].AccumulatedDuration
      this.depFlightFare=res.InternationalFlights[this.ind].FareDetails.ChargeableFares

      this.returnFlightDet=res.InternationalFlights[this.ind].IntReturn.FlightSegments;
      this.totalTimeRet=this.returnFlightDet[this.returnFlightDet.length-1].AccumulatedDuration
      this.returnFlightFare=res.InternationalFlights[this.ind].FareDetails.ChargeableFares
      let totAmount:any=this.netAmount(this.depFlightFare.NetFare+this.returnFlightFare.NetFare)
      localStorage.setItem("orderAount",totAmount)
      }
     
      // this.spinner.hide();
        }
        // if(this.flightDetails.length==1){
        //   this.isConnect=0
        // }else{
        //   this.isConnect=1
        // }
   },
   (err)=>{
    // this.spinner.hide(); 
    // this.router.navigate(['login'])
    // console.log(err)
  });
  }
  getIP(){
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    });
  }
  resend(){
    this.service.testGetApiMethod("/comman/ResendOtp?MobileNo="+this.data.contact).subscribe(res=>{
      // console.log("GetSalesRule ====>"+JSON.stringify(res)); 
      if(res.Status==true){
        // alert("OTP resend successfull.")
      // this.comissionType= res.Data.commType
      //   this.comission= parseInt(res.Data.commMarkup)
          }
     },
     (err)=>{
      
    });
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
         alert(res.Message)
        //  window.history.back()
        window.location.reload()
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
        this.signUp()
        this.isLogin=2
        localStorage.setItem("userData",JSON.stringify({UserID:"123213uyiy",UserName:'Guest Login'}))
        window.location.reload()
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
      localStorage.setItem('userData', JSON.stringify(res.Data));
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
  selectCountry(){
    this.service.testGetApiMethod(`comman/Country`).subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
    if(res.Status==true){
      this.countryList=res.Data;
      // console.log("getCountry ====>"+JSON.stringify(this.countryList)); 
    }
   },
   (err)=>{
  });
  // }
  }
  proceedToPay(){
    // console.log('islogin======>', this.isLogin);
    if(this.isLogin==0){
      this.showLoginForm();
    }else{
        this.bookTckt()
        if(this.reqObj.tripType=='1'){
        this.saveSelectedFlight_1()
        this.saveSelectedFare_1()
        }else if(this.reqObj.tripType=='2'){
        this.saveSelectedFlight_1()
        this.saveSelectedFlight_2()
        this.saveSelectedFare_1()
        this.saveSelectedFare_2()
        }
        this.savePassenger()
      }
  }

  bookTckt(){
    let dataInfo= {
      "searchID" :this.searchId,
      "AgentCode" :this.userDetail.Acode,
      "ClientCode":this.userDetail.UserCode,
      "UserName":this.userDetail.UserName,
      "emailAddress":this.userDetail.UserEMailD,
      "domInter":this.domInt,
      "journeyType" :this.jType,
      "departureDate":this.saveFlyOne.depdate, 
      "arrivalDate":this.saveFlyOne.arrdate,
       "adt":this.reqObj.adults,
      "chd":this.reqObj.children,
      "inf":this.reqObj.infants,
      "cabinClass":this.reqObj.travelClass,
      "SaleChannel":this.salechanl,
      "CompanyID":"1",
      "branchCode":"ETL-1",
      "trackid":this.saveFlyOne.flytId,
      "origin":this.reqObj.source,
      "destination":this.reqObj.destination,
      "UserID":this.userDetail.UserID,
      "IP":this.ipAddress,
      "Partner":this.userDetail.Partner
      
  }
  this.service.testPostApiMethod(dataInfo,"Booking/SaveSearchCriteria").subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
     if(res.Status==true){
      //  alert("search criteria saved successfully")
      // this.tabType='signIn'
       // this.router.navigate(['oneway'])
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
  saveSelectedFlight_1(){
    let dataInfo= {
    "searchID" :this.searchId,
    "trackid" :this.saveFlyOne.flytId,
    "CarrierCode" : this.saveFlyOne.carrierCode,
    "FlightNum" : this.saveFlyOne.FlyNum,
    "departureDate" :this.saveFlyOne.depdate,  
    "arrivalDate" :this.saveFlyOne.arrdate,
    "Duration" :this.saveFlyOne.duration,
    "TotalFare" :this.saveFlyOne.totfare,
    "branchCode" :"ETL-1",
    "CompanyID" :"1", 
    "AgentCode"  : this.userDetail.Acode,
    "origin" :this.reqObj.source,
    "destination" :this.reqObj.destination,
    "cabinClass" :this.reqObj.travelClass,
    "FlightID" :this.saveFlyOne.FlyNum,
    "isconnect"  :this.saveFlyOne.isconnect,
    "UserID" :this.userDetail.UserID,
    "IP" : this.ipAddress,
    "SegmentIndex" :this.saveFlyOne.flytId
}
  this.service.testPostApiMethod(dataInfo,"Booking/SaveSelectedFlight").subscribe(res=>{
    if(res.Status==true){
      // alert("selected flyt_1 saved Successfully")
    }
    },
    (err)=>{
     // this.spinner.hide(); 
     // this.router.navigate(['login'])
     // console.log(err)
   }); 
  }
  saveSelectedFlight_2(){
    let dataInfo= {
      "pjtype" : this.reqObj.tripType,
      "searchID" :this.searchId,
      "trackid" :this.saveFlyRound.flytId,
      "CarrierCode" : this.saveFlyRound.carrierCode,
      "FlightNum" : this.saveFlyRound.FlyNum,
      "departureDate" :this.saveFlyRound.depdate,  
      "arrivalDate" :this.saveFlyRound.arrdate,
      "Duration" :this.saveFlyRound.duration,
      "TotalFare" :this.saveFlyRound.totfare,
      "branchCode" :"ETL-1",
      "CompanyID" :"1", 
      "AgentCode"  : this.userDetail.Acode,
      "origin" :this.reqObj.source,
      "destination" :this.reqObj.destination,
      "cabinClass" :this.reqObj.travelClass,
      "FlightID" :this.saveFlyRound.FlyNum,
      "isconnect"  :this.saveFlyRound.isconnect,
      "UserID" :this.userDetail.UserID,
      "IP" : this.ipAddress,
      "SegmentIndex" :this.saveFlyRound.flytId
}
  this.service.testPostApiMethod(dataInfo,"Booking/SaveSelectedFlight").subscribe(res=>{
    if(res.Status==true){
      // alert("selected flyt_2 saved Successfully")
    }
    },
    (err)=>{
     // this.spinner.hide(); 
     // this.router.navigate(['login'])
     // console.log(err)
   }); 
  }
  saveSelectedFare_1(){
    let dataInfo= {
      "pjtype" : this.reqObj.tripType,
      "searchID" :this.searchId,
      "trackid" :this.saveFlyOne.flytId,
      "discount"  : "0",
      "tds"  :"0",
      "adtservicecharge" : "0",
      "chdservicecharge" : "0",
      "infservicecharge" : "0",
      "totalservicecharge" : "0",
      "adtTranfee" : "0",
      "chdTranFee" : "0",
      "infTranfee" : "0",
      "TotalTranFee" : "0",
      "CompanyID" : "1",
      "branchCode"  : "ETL-1",
      "IP" : this.ipAddress,
      "UserID" :this.userDetail.UserID,
      "AgentTax" :"0",
      "AgentTotal"  :"0",
      "CustTax" : this.netAmount(this.saveFlyOne.tax),
      "CustTotal" : this.netAmount(this.saveFlyOne.totfare),
      "adultbasefare" : "500", 
      "childbasefare" : "0",
      "infantbasefare" : "0",
      "adulttaxes" : "100", 
      "childtaxes" : "0",
      "infanttaxes" : "0",
      "CompTax" : this.saveFlyOne.tax,
      "CompTotal" :this.saveFlyOne.totfare,
      "markup" : this.comission 
}
  this.service.testPostApiMethod(dataInfo,"Booking/SaveFlightFare").subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
     if(res.Status==true){
     }
    },
    (err)=>{
   }); 
  }
  saveSelectedFare_2(){
    let dataInfo= {
      "pjtype" : this.reqObj.tripType,
      "searchID" :this.searchId,
      "trackid" :this.saveFlyRound.flytId,
      "discount"  : "0",
      "tds"  :"0",
      "adtservicecharge" : "0",
      "chdservicecharge" : "0",
      "infservicecharge" : "0",
      "totalservicecharge" : "0",
      "adtTranfee" : "0",
      "chdTranFee" : "0",
      "infTranfee" : "0",
      "TotalTranFee" : "0",
      "CompanyID" : "1",
      "branchCode"  : "ETL-1",
      "IP" : this.ipAddress,
      "UserID" :this.userDetail.UserID,
      "AgentTax" :"0",
      "AgentTotal"  :"0",
      "CustTax" : this.netAmount(this.saveFlyRound.tax),
      "CustTotal" : this.netAmount(this.saveFlyRound.totfare),
      "adultbasefare" : "500", 
      "childbasefare" : "0",
      "infantbasefare" : "0",
      "adulttaxes" : "100", 
      "childtaxes" : "0",
      "infanttaxes" : "0",
      "CompTax" : this.saveFlyRound.tax,
      "CompTotal" :this.saveFlyRound.totfare,
      "markup" : this.comission 
}
  this.service.testPostApiMethod(dataInfo,"Booking/SaveFlightFare").subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
    if(res.Status==true){
      // alert("flightfare_2 saved Successfully")
      // this.tabType='signIn'
       // this.router.navigate(['oneway'])
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
  savePassenger(){
    this.titleArr = []
      this.fNameArr= []
      this.lNameArr=[]
      this.dobArr=[]
      this.passNoArr=[]
      this.nationArr=[]
      this.issCountryArry=[]
      this.passExpArr=[]
      this.passengertype=[]
  if(this.adultArr.length!=0){
    this.adultArr.find((item,index)=>{
      this.titleArr.push(item.title)
      this.fNameArr.push(item.fname)
      this.lNameArr.push(item.lName)
      this.dobArr.push(item.dob)
      this.passNoArr.push(item.passNo)
      this.nationArr.push(item.nationality)
      this.issCountryArry.push(item.issCon)
      this.passExpArr.push(item.passExp)
      this.passengertype.push('ADT')
    })
  }
  if(this.childArr.length!=0){
    this.childArr.find((item,index)=>{
      this.titleArr.push(item.title)
      this.fNameArr.push(item.fname)
      this.lNameArr.push(item.lName)
      this.dobArr.push(item.dob)
      this.passNoArr.push(item.passNo)
      this.nationArr.push(item.nationality)
      this.issCountryArry.push(item.issCon)
      this.passExpArr.push(item.passExp)
      this.passengertype.push('CHD')
    })
  }
  if(this.infantArr.length!=0){
    this.infantArr.find((item,index)=>{
      this.titleArr.push(item.title)
      this.fNameArr.push(item.fname)
      this.lNameArr.push(item.lName)
      this.dobArr.push(item.dob)
      this.passNoArr.push(item.passNo)
      this.nationArr.push(item.nationality)
      this.issCountryArry.push(item.issCon)
      this.passExpArr.push(item.passExp)
      this.passengertype.push('INF')
    })
  }
  if(this.fNameArr[0]!='' && this.lNameArr[0]!=''){
    // alert("firstname"+this.fNameArr[0])
    let dataInfo= {
      "tt" :this.adultArr.length+ this.childArr.length+this.infantArr.length,
      "pjtype"  : this.reqObj.tripType,
      "searchID" :this.searchId,
      "trackid" :this.saveFlyOne.flytId,
      "title" :  this.titleArr,
      "firstname" :this.fNameArr,
      "lastname" : this.lNameArr,
       "dob" :  this.dobArr,
      "AgentCode" :this.userDetail.Acode,
      "UserID" : this.userDetail.UserID,
       "IP": this.ipAddress,
      "phone" : "9210394369",
      "EMailID" :this.userDetail.UserEMailD,
      "nation" :this.nationArr,
       "PassportNo" :this.passNoArr,
       "Passportexpiry" :this.passExpArr,
       "PassIssueCountry" :this.issCountryArry,
       "passengertype":  this.passengertype
}
this.service.testPostApiMethod(dataInfo,"Booking/SavePasenger").subscribe(res=>{
  // console.log("getairport ====>"+JSON.stringify(res)); 
   if(res.Status==true){
    //  alert("save passenger Successful")
    // this.tabType='signIn'
     this.router.navigate(['payment'],{ queryParams: {'tripType':this.reqObj.tripType}})
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
  }
  addGst(){
    let dataInfo= {
      "ClientCode":this.userDetail.UserCode,
      "AgentCode":this.userDetail.Acode, 
      "GstNo":this.data.gstNo, 
     "CompanyName":this.data.cmpny, 
     "Address":this.data.address,
        "Email":this.data.email, 
      "Mobile":this.data.mobile, 
  }
  this.service.testPostApiMethod(dataInfo,"Booking/UpdateClientGst").subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
     if(res.Status==true){
      // this.tabType='signIn'
       // this.router.navigate(['oneway'])
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
  showfarerule(val){
    this.fareTab=val
    if(this.fareTab=='open'){
      this.getFareDetail()
    }
  }

  getFareDetail(){
    this.service.getApiMethod(`Flights/GetFareRule?key=${this.saveFlyOne.key}&airlineId=${this.saveFlyOne.carrierCode}&flightId=${this.saveFlyOne.FlyNum}&classCode=${this.saveFlyOne.classCode}&service=${this.reqObj.flightType}&provider=${this.saveFlyOne.provider}&tripType=${this.reqObj.tripType}&couponFare=${this.saveFlyOne.couponFare}&userType=5&user=''`).subscribe(res=>{
      // console.log("getflights ====>"+JSON.stringify(res)); 
      if(res.ResponseStatus==200){
        alert("fare deatail Found")
          }
     },
     (err)=>{ 
    });
  }
  chngePswrd(){
    this.router.navigate(['change-pasword'])
  }
  
}
