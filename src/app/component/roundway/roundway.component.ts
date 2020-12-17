import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roundway',
  templateUrl: './roundway.component.html',
  styleUrls: ['./roundway.component.css']
})
export class RoundwayComponent implements OnInit {
  onwardFlightList:any=[];
  returnFlightList:any=[];
  url:any;
  actionType:any=-1;
  action:any=-1;
  selFlight:any={};
  selReturnFlight:any={};
  selGo:any;
  selRet:any;
  reqObj:any={};
  comission:any =0;
  comissionType:any="";
  isConnect:any;
  data:any={};
  price:any=0;
  stop:any;
  mintime:any;
  maxtime:any;
  isActive:any;
  isAct:any;
  airlineArr:any=[];
  checkArr:any=[];
  fareTyp:any;
  filtersection:any='1';
  // conectingFlyt:any={};
  retData:any={};
  conectingFlyt:any={};
  fareRule_1:any;
  conectingFlyt_2:any={};
  fareRule_2:any;
  constructor(private router: Router,private route: ActivatedRoute,private service: RestDataService,private heroservice:HeroService) { }

  ngOnInit(): void {
    
    this.url=this.service.baseUrl
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.reqObj=params
    })
    this.availableFlights()
    setTimeout(()=>{
        let tempArr={airlineObj:[],airlynJson:[]}
        if(this.onwardFlightList.length!=0){
          this.onwardFlightList.find((item,index)=>{
            if(tempArr.airlineObj.indexOf(item.FlightSegments[0].AirLineName)==-1){
              tempArr.airlineObj.push(item.FlightSegments[0].AirLineName)
              tempArr.airlynJson.push({"airlineName":item.FlightSegments[0].AirLineName,"isChkd":false}) 
            } 
          })
          this.airlineArr=tempArr
          console.log("airlines====>"+JSON.stringify(this.airlineArr))
        }
      },4000)
    this.salesRule()
  this.data.FlightUId="ET-0"
  this.retData.FlightUId="ETR-0"
  }
  availableFlights(){
    // this.spinner.show();
    this.service.getApiMethod(`Flights/AvailableFlights?source=${this.reqObj.source}&destination=${this.reqObj.destination}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripTypeNum}&flightType=${this.reqObj.flightTypeNum}&adults=${this.reqObj.adults}&children=${this.reqObj.children}&infants=${this.reqObj.infants}&travelClass=${this.reqObj.travelClass}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
    console.log("getflights ====>"+JSON.stringify(res)); 
    if(res.ResponseStatus==200){
      // this.spinner.hide();
      this.onwardFlightList=res.DomesticOnwardFlights;
      // let tempArr=[]
      // if(this.onwardFlightList.length!=0){
      //   this.onwardFlightList.find((item,index)=>{
      //     if(tempArr.indexOf(item.FlightSegments[0].AirLineName)==-1){
      //       tempArr.push(item.FlightSegments[0].AirLineName) 
      //     } 
      //   })
      //   this.airlineArr=tempArr
      // }
      this.returnFlightList=res.DomesticReturnFlights;
      this.selFlight=this.onwardFlightList[0];
      this.selReturnFlight=this.returnFlightList[0];
  // alert("1111========>"+this.onwardFlightList[0].FlightSegments[0].IntDepartureAirportName)
  //     alert("2222===>"+this.onwardFlightList[0].FlightSegments[this.onwardFlightList[0].FlightSegments.length-1].IntArrivalAirportName)

  //     alert("3333====>>"+this.onwardFlightList[0].FlightSegments[0].DepartureDateTime)

        }
   },
   (err)=>{
    // this.spinner.hide(); 
    // this.router.navigate(['login'])
    // console.log(err)
  });
  }
  salesRule(){
    // this.spinner.show();
    this.service.testGetApiMethod(`Booking/GetSalesRule?product=SV0002&agentcode=FAREIN0001&salechannel=DO-B2B2C`).subscribe(res=>{
    console.log("GetSalesRule ====>"+JSON.stringify(res)); 
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
  showDetail(val){
    this.actionType=val;
  }
  showDetail_ret(val){
    this.action=val;
  }
changeRadio(id,obj){
  this.conectingFlyt=obj
  this.selFlight=obj
  if(obj.FlightSegments.length==1){
    this.isConnect=0
  }else{
    this.isConnect=1
  }
  this.getFareDetail_1()
  let oneDom={"flytId":obj.FlightUId,"carrierCode":obj.FlightSegments[0].OperatingAirlineCode,"FlyNum":obj.FlightSegments[0].FlightNumber,"depdate":obj.FlightSegments[0].DepartureDateTime,"arrdate":obj.FlightSegments[0].ArrivalDateTime,"duration":obj.FlightSegments[0].Duration,"totfare":obj.FareDetails.ChargeableFares.NetFare,"tax":obj.FareDetails.ChargeableFares.Tax,"isconnect":this.isConnect}
  localStorage.setItem("saveFlyt", JSON.stringify(oneDom)) 
  // console.log("flight1111====>"+JSON.stringify(this.selFlight))
}
getFareDetail_1(){
  this.service.getApiMethod(`Flights/GetFareRule?key=${this.conectingFlyt.OriginDestinationoptionId.Key}&airlineId=${this.conectingFlyt.FlightSegments[0].OperatingAirlineCode}&flightId=${this.conectingFlyt.FlightSegments[0].FlightNumber}&classCode=${this.conectingFlyt.FlightSegments[0].BookingClassFare.ClassType}&service=${this.reqObj.flightTypeNum}&provider=${this.conectingFlyt.Provider}&tripType=${this.reqObj.tripTypeNum}&couponFare=${this.conectingFlyt.FlightSegments[0].RPH}&userType=5&user=''`).subscribe(res=>{
    // console.log("getflights ====>"+JSON.stringify(res)); 
    // console.log("getfareRule ====>"+JSON.stringify(res)); 
      this.fareRule_1=res      
   },
   (err)=>{ 
  });
}
selectRadio(id,object){
  this.conectingFlyt_2=object
  this.selReturnFlight=object
  if(object.FlightSegments.length==1){
    this.isConnect=0
  }else{
    this.isConnect=1
  }
  this.getFareDetail_2()
  let twoDom={"flytId":object.FlightUId,"carrierCode":object.FlightSegments[0].OperatingAirlineCode,"FlyNum":object.FlightSegments[0].FlightNumber,"depdate":object.FlightSegments[0].DepartureDateTime,"arrdate":object.FlightSegments[0].ArrivalDateTime,"duration":object.FlightSegments[0].Duration,"totfare":object.FareDetails.ChargeableFares.NetFare,"tax":object.FareDetails.ChargeableFares.Tax,"isconnect":this.isConnect}
  localStorage.setItem("saveRetFlyt", JSON.stringify(twoDom)) 
  // console.log("flight2222====>"+JSON.stringify(this.selReturnFlight))
}
getFareDetail_2(){
  this.service.getApiMethod(`Flights/GetFareRule?key=${this.conectingFlyt_2.OriginDestinationoptionId.Key}&airlineId=${this.conectingFlyt_2.FlightSegments[0].OperatingAirlineCode}&flightId=${this.conectingFlyt_2.FlightSegments[0].FlightNumber}&classCode=${this.conectingFlyt_2.FlightSegments[0].BookingClassFare.ClassType}&service=${this.reqObj.flightTypeNum}&provider=${this.conectingFlyt_2.Provider}&tripType=${this.reqObj.tripTypeNum}&couponFare=${this.conectingFlyt_2.FlightSegments[0].RPH}&userType=5&user=''`).subscribe(res=>{
    // console.log("getflights ====>"+JSON.stringify(res)); 
    // console.log("getfareRule ====>"+JSON.stringify(res)); 
      this.fareRule_2=res      
   },
   (err)=>{ 
  });
}
bookNow(tem,val){
  this.selGo=tem;
  this.selRet=val;

  this.router.navigate(['flight-details'],{ queryParams: { 'flight1':this.selGo, 'flight2':this.selRet,'source':this.reqObj.source,'destination':this.reqObj.destination,'journeyDate':this.reqObj.journeyDate,'tripType':this.reqObj.tripTypeNum,'flightType':this.reqObj.flightTypeNum,'adults':this.reqObj.adults,'children':this.reqObj.children,'infants':this.reqObj.infants,'travelClass':this.reqObj.travelClass,'returnDate':this.reqObj.returnDate }}) 
}
selectStop(val){
  this.stop=val
  this.isActive=val

}
selectTime(val,tem){
  this.mintime=val
  this.maxtime=tem
  this.isAct=val
}
getValue(val){
  this.price=val
}
checkAirline(val){
  // alert(JSON.stringify(val))
  if(this.checkArr.indexOf(val.airlineName)==-1){
    this.checkArr.push(val.airlineName)
  }
}
fareType(val){
 this.fareTyp=val
}
closeFilter(val){
this.filtersection=val
}
filter(){
  this.filter1()
  this.filter2()
}
filter1(){
  this.availableFlights()
  setTimeout(()=>{
let tempData=[]
if(this.stop!=undefined){
  // alert(this.stop)
  let fyltArr=[]
  if(tempData.length==0){
    this.onwardFlightList.find((item,index)=>{
      if(item.FlightSegments.length-1==this.stop){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
   // this.onwardFlightList=tempData
  }else{
    tempData.find((item,index)=>{
      if(item.FlightSegments.length-1==this.stop){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
   // this.onwardFlightList=tempData
  }
  
  console.log("filterstop=====>"+JSON.stringify(tempData))
  // this.onwardFlightList=tempData
}
if(this.data.price!=undefined){
  // alert(this.price)
  let fyltArr=[]
if(tempData.length==0){
  this.onwardFlightList.find((item,index)=>{
    let totPrice=this.netAmount(item.FareDetails.ChargeableFares.NetFare)
    if(totPrice<=this.price){
      fyltArr.push(item)  
    }
  })
  tempData=fyltArr
//  }else{
  tempData.find((item,index)=>{
    let totPrice=this.netAmount(item.FareDetails.ChargeableFares.NetFare)
    if(totPrice<=this.price){
      fyltArr.push(item)
    }
  })
  tempData=fyltArr
}
// this.onwardFlightList=tempData
console.log("filterprice=====>"+JSON.stringify(tempData)) 
}
if(this.mintime!=undefined && this.maxtime!=undefined){
let fyltArr=[]
// alert(this.mintime)
// alert(this.maxtime)
if(tempData.length==0){
  this.onwardFlightList.find((item,index)=>{
    let flyTime=new Date(item.FlightSegments[0].DepartureDateTime).getHours()+':'+new Date(item.FlightSegments[0].DepartureDateTime).getMinutes()
    if(flyTime>=this.mintime && flyTime<=this.maxtime){
      fyltArr.push(item)
    }
  })
  tempData=fyltArr
}else{
  tempData.find((item,index)=>{
    let flyTime=new Date(item.FlightSegments[0].DepartureDateTime).getHours()+':'+new Date(item.FlightSegments[0].DepartureDateTime).getMinutes()
    if(flyTime>=this.mintime && flyTime<=this.maxtime){
      fyltArr.push(item)
    }
  })
  tempData=fyltArr
}
// this.onwardFlightList=tempData
console.log("filtertym=====>"+JSON.stringify(tempData))
}
if(this.checkArr.length!=0){
let fyltArr=[]
if(tempData.length==0){
    this.onwardFlightList.find((item,index)=>{
      this.checkArr.find((temp,ind) =>{
        // alert(temp)
          if(item.FlightSegments[0].AirLineName==temp){
            fyltArr.push(item)
           }
        })
    })
    tempData=fyltArr
    this.onwardFlightList=tempData
  }else{
    tempData.find((item,index)=>{
      this.checkArr.find((temp,ind) =>{
        // alert(temp)
        if(item.FlightSegments[0].AirLineName==temp){
          fyltArr.push(item)
         }
      })
    })
    tempData=fyltArr
    this.onwardFlightList=tempData
  }
  // this.onwardFlightList=tempData
  console.log("filterairline=====>"+JSON.stringify(tempData))
}
if(this.fareTyp!=undefined){
// alert(this.fareTyp)
let fyltArr=[]
if(tempData.length==0){
  this.onwardFlightList.find((item,index)=>{
    if(item.FlightSegments[0].BookingClassFare.Rule==this.fareTyp){
      fyltArr.push(item)
    }
  })
  tempData=fyltArr
}else{
  tempData.find((item,index)=>{
    if(item.FlightSegments[0].BookingClassFare.Rule==this.fareTyp){
      fyltArr.push(item)
    }
  })
  tempData=fyltArr
}
// this.onwardFlightList=tempData
console.log("filterfareTyp=====>"+JSON.stringify(tempData))
}
console.log("filterfinal=====>"+JSON.stringify(tempData))
this.onwardFlightList=tempData
},3000)
this.filtersection='1'
}
filter2(){
  this.availableFlights()
  setTimeout(()=>{
  let tempData=[]
  if(this.stop!=undefined){
    // alert(this.stop)
    let fyltArr=[]
    if(tempData.length==0){
      this.returnFlightList.find((item,index)=>{
        if(item.FlightSegments.length-1==this.stop){
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
     // this.returnFlightList=tempData
    }else{
      tempData.find((item,index)=>{
        if(item.FlightSegments.length-1==this.stop){
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
     // this.returnFlightList=tempData
    }
    
    console.log("filterstop=====>"+JSON.stringify(tempData))
    // this.returnFlightList=tempData
  }
  if(this.data.price!=undefined){
    // alert(this.price)
    let fyltArr=[]
  if(tempData.length==0){
    this.returnFlightList.find((item,index)=>{
      let totPrice=this.netAmount(item.FareDetails.ChargeableFares.NetFare)
      if(totPrice<=this.price){
        fyltArr.push(item)  
      }
    })
    tempData=fyltArr
  //  }else{
    tempData.find((item,index)=>{
      let totPrice=this.netAmount(item.FareDetails.ChargeableFares.NetFare)
      if(totPrice<=this.price){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
  }
  // this.returnFlightList=tempData
  console.log("filterprice=====>"+JSON.stringify(tempData)) 
  }
  if(this.mintime!=undefined && this.maxtime!=undefined){
  let fyltArr=[]
  // alert(this.mintime)
  // alert(this.maxtime)
  if(tempData.length==0){
    this.returnFlightList.find((item,index)=>{
      let flyTime=new Date(item.FlightSegments[0].DepartureDateTime).getHours()+':'+new Date(item.FlightSegments[0].DepartureDateTime).getMinutes()
      if(flyTime>=this.mintime && flyTime<=this.maxtime){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
  }else{
    tempData.find((item,index)=>{
      let flyTime=new Date(item.FlightSegments[0].DepartureDateTime).getHours()+':'+new Date(item.FlightSegments[0].DepartureDateTime).getMinutes()
      if(flyTime>=this.mintime && flyTime<=this.maxtime){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
  }
  // this.returnFlightList=tempData
  console.log("filtertym=====>"+JSON.stringify(tempData))
  }
  if(this.checkArr.length!=0){
  let fyltArr=[]
  if(tempData.length==0){
      this.returnFlightList.find((item,index)=>{
        this.checkArr.find((temp,ind) =>{
          // alert(temp)
            if(item.FlightSegments[0].AirLineName==temp){
              fyltArr.push(item)
             }
          })
      })
      tempData=fyltArr
      this.returnFlightList=tempData
    }else{
      tempData.find((item,index)=>{
        this.checkArr.find((temp,ind) =>{
          // alert(temp)
          if(item.FlightSegments[0].AirLineName==temp){
            fyltArr.push(item)
           }
        })
      })
      tempData=fyltArr
      this.returnFlightList=tempData
    }
    // this.returnFlightList=tempData
    console.log("filterairline=====>"+JSON.stringify(tempData))
  }
  if(this.fareTyp!=undefined){
  // alert(this.fareTyp)
  let fyltArr=[]
  if(tempData.length==0){
    this.returnFlightList.find((item,index)=>{
      if(item.FlightSegments[0].BookingClassFare.Rule==this.fareTyp){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
  }else{
    tempData.find((item,index)=>{
      if(item.FlightSegments[0].BookingClassFare.Rule==this.fareTyp){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
  }
  // this.returnFlightList=tempData
  console.log("filterfareTyp=====>"+JSON.stringify(tempData))
  }
  console.log("filterfinal=====>"+JSON.stringify(tempData))
  this.returnFlightList=tempData
},3000)
  this.filtersection='1'
  }
  
  }
  


