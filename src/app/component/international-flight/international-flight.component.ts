import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-international-flight',
  templateUrl: './international-flight.component.html',
  styleUrls: ['./international-flight.component.css']
})
export class InternationalFlightComponent implements OnInit {
  IntFlights:any=[];
  url:any;
  actionType:any=-1;
  index:any;
  reqObj:any={};
  closetem:any=0;
  comission:any =0;
  comissionType:any="";
  isConnect:any;
  isCnct:any;
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
  intConectingFlyt:any={};
  fareRuleInt:any;
  // IntReturnflight:any=[];
  
  constructor(private router: Router,private route: ActivatedRoute,private service: RestDataService,private heroservice:HeroService) { }

  ngOnInit(): void {
   
    this.url=this.service.baseUrl
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.reqObj=params
    })
    this.availableIntRoundwayFlights()
    setTimeout(()=>{
    let tempArr={airlineObj:[],airlynJson:[]}
    if(this.IntFlights.length!=0){
      this.IntFlights.find((item,index)=>{
        if(tempArr.airlineObj.indexOf(item.IntOnward.FlightSegments[0].AirLineName)==-1){
          tempArr.airlineObj.push(item.IntOnward.FlightSegments[0].AirLineName)
          tempArr.airlynJson.push({"airlineName":item.IntOnward.FlightSegments[0].AirLineName,"isChkd":false}) 
        } 
      })
      this.airlineArr=tempArr
    }
  },4000)
    this.salesRule()
  }
  availableIntRoundwayFlights(){
    // this.spinner.show();
    this.service.getApiMethod(`Flights/AvailableFlights?source=${this.reqObj.source}&destination=${this.reqObj.destination}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripTypeNum}&flightType=${this.reqObj.flightTypeNum}&adults=${this.reqObj.adults}&children=${this.reqObj.children}&infants=${this.reqObj.infants}&travelClass=${this.reqObj.travelClass}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
    console.log("getflights ====>"+JSON.stringify(res)); 
    if(res.ResponseStatus==200){
      // this.spinner.hide();
      this.IntFlights=res.InternationalFlights;
      // let tempArr=[]
      // if(this.IntFlights.length!=0){
      //   this.IntFlights.find((item,index)=>{
      //     if(tempArr.indexOf(item.IntReturn.FlightSegments[0].AirLineName)==-1){
      //       tempArr.push(item.IntReturn.FlightSegments[0].AirLineName) 
      //     } 
      //   })
      //   this.airlineArr=tempArr
      // }
      // this.IntReturnflight=res.InternationalFlights.IntReturn;

      // console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
        }
   },
   (err)=>{
    // this.spinner.hide(); 
    // this.router.navigate(['login'])
    // console.log(err)
  });
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
  clearFilter(){
    this.stop=''
    this.mintime=''
    this.maxtime=''
    this.price=''
    this.checkArr=[]
    this.fareTyp=''
    this.filtersection='1'
    this.availableIntRoundwayFlights()
  }
  filterInt(){
    this.availableIntRoundwayFlights()
    setTimeout(()=>{
    let tempData=[]
    if(this.stop!=undefined){
      // alert(this.stop)
      let fyltArr=[]
      if(tempData.length==0){
        this.IntFlights.find((item,index)=>{
          if(item.IntReturn.FlightSegments.length-1==this.stop){
            fyltArr.push(item)
          }
        })
        tempData=fyltArr
       // this.IntFlights=tempData
      }else{
        tempData.find((item,index)=>{
          if(item.IntReturn.FlightSegments.length-1==this.stop){
            fyltArr.push(item)
          }
        })
        tempData=fyltArr
       // this.IntFlights=tempData
      }
      
      console.log("filterstop=====>"+JSON.stringify(tempData))
      // this.IntFlights=tempData
    }
    if(this.data.price!=undefined){
      // alert(this.price)
      let fyltArr=[]
    if(tempData.length==0){
      this.IntFlights.find((item,index)=>{
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
    // this.IntFlights=tempData
    console.log("filterprice=====>"+JSON.stringify(tempData)) 
  }
  if(this.mintime!=undefined && this.maxtime!=undefined){
    let fyltArr=[]
    // alert(this.mintime)
    // alert(this.maxtime)
    if(tempData.length==0){
      this.IntFlights.find((item,index)=>{
        let flyTime=new Date(item.IntReturn.FlightSegments[0].DepartureDateTime).getHours()+':'+new Date(item.IntReturn.FlightSegments[0].DepartureDateTime).getMinutes()
        if(flyTime>=this.mintime && flyTime<=this.maxtime){
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
    }else{
      tempData.find((item,index)=>{
        let flyTime=new Date(item.IntReturn.FlightSegments[0].DepartureDateTime).getHours()+':'+new Date(item.IntReturn.FlightSegments[0].DepartureDateTime).getMinutes()
        if(flyTime>=this.mintime && flyTime<=this.maxtime){
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
    }
    // this.IntFlights=tempData
    console.log("filtertym=====>"+JSON.stringify(tempData))
  }
  if(this.checkArr.length!=0){
    let fyltArr=[]
    if(tempData.length==0){
        this.IntFlights.find((item,index)=>{
          this.checkArr.find((temp,ind) =>{
            // alert(temp)
              if(item.IntReturn.FlightSegments[0].AirLineName==temp){
                fyltArr.push(item)
               }
            })
        })
        tempData=fyltArr
        this.IntFlights=tempData
      }else{
        tempData.find((item,index)=>{
          this.checkArr.find((temp,ind) =>{
            // alert(temp)
            if(item.IntReturn.FlightSegments[0].AirLineName==temp){
              fyltArr.push(item)
             }
          })
        })
        tempData=fyltArr
        this.IntFlights=tempData
      }
      // this.IntFlights=tempData
      console.log("filterairline=====>"+JSON.stringify(tempData))
  }
  if(this.fareTyp!=undefined){
    // alert(this.fareTyp)
    let fyltArr=[]
    if(tempData.length==0){
      this.IntFlights.find((item,index)=>{
        if(item.IntReturn.FlightSegments[0].BookingClassFare.Rule==this.fareTyp){
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
    }else{
      tempData.find((item,index)=>{
        if(item.IntReturn.FlightSegments[0].BookingClassFare.Rule==this.fareTyp){
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
    }
    // this.IntFlights=tempData
    console.log("filterfareTyp=====>"+JSON.stringify(tempData))
  }
  console.log("filterfinal=====>"+JSON.stringify(tempData))
  this.IntFlights=tempData
},3000)
  this.filtersection='1'
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
  showDetail(val,obj){
    this.intConectingFlyt=obj
    if(this.closetem==0){
      this.closetem=1
      this.actionType=val;
    }else if(this.closetem==1){
      this.closetem=0
      this.actionType=-1;
    }
    this.getFareDetailInt()
  }
  getFareDetailInt(){
    this.service.getApiMethod(`Flights/GetFareRule?key=${this.intConectingFlyt.OriginDestinationoptionId.Key}&airlineId=${this.intConectingFlyt.IntOnward.FlightSegments[0].OperatingAirlineCode}&flightId=${this.intConectingFlyt.IntOnward.FlightSegments[0].FlightNumber}&classCode=${this.intConectingFlyt.IntOnward.FlightSegments[0].BookingClassFare.ClassType}&service=${this.reqObj.flightTypeNum}&provider=${this.intConectingFlyt.Provider}&tripType=${this.reqObj.tripTypeNum}&couponFare=${this.intConectingFlyt.IntOnward.FlightSegments[0].RPH}&userType=5&user=''`).subscribe(res=>{
        this.fareRuleInt=res      
     },
     (err)=>{ 
    });
  }
  intFlightDetail(val,obj){
    let searchId=Math.floor(Math.random() * 1000000);
    localStorage.setItem("searchId",searchId.toString())
    console.log("selectedddd_flight========>"+JSON.stringify(obj))
    let dataInfo={
      "SearchId":searchId,
      "Data": JSON.stringify(obj),
    }
    this.service.testPostApiMethod(dataInfo,"Data/SaveData").subscribe(res=>{
    },
    (err)=>{
       // this.spinner.hide(); 
       // this.router.navigate(['login'])
       // console.log(err)
     });
    this.index=val
    if(obj.IntOnward.FlightSegments.length==1){
      this.isConnect=0
    }else{
      this.isConnect=1
    }
    let oneInt={"flytId":obj.FlightUId,"carrierCode":obj.IntOnward.FlightSegments[0].OperatingAirlineCode,"FlyNum":obj.IntOnward.FlightSegments[0].FlightNumber,"depdate":obj.IntOnward.FlightSegments[0].DepartureDateTime,"arrdate":obj.IntOnward.FlightSegments[0].ArrivalDateTime,"duration":obj.IntOnward.FlightSegments[0].Duration,"totfare":obj.FareDetails.ChargeableFares.NetFare,"tax":obj.FareDetails.ChargeableFares.Tax,"isconnect":this.isConnect}
    localStorage.setItem("saveFlyt", JSON.stringify(oneInt)) 
    if(obj.IntReturn.FlightSegments.length==1){
      this.isCnct=0
    }else{
      this.isCnct=1
    }
    let twoInt={"flytId":obj.FlightUId,"carrierCode":obj.IntReturn.FlightSegments[0].OperatingAirlineCode,"FlyNum":obj.IntReturn.FlightSegments[0].FlightNumber,"depdate":obj.IntReturn.FlightSegments[0].DepartureDateTime,"arrdate":obj.IntReturn.FlightSegments[0].ArrivalDateTime,"duration":obj.IntReturn.FlightSegments[0].Duration,"totfare":obj.FareDetails.ChargeableFares.NetFare,"tax":obj.FareDetails.ChargeableFares.Tax,"isconnect":this.isCnct}
    localStorage.setItem("saveRetFlyt", JSON.stringify(twoInt)) 
    this.router.navigate(['flight-details'],{ queryParams: {'index': this.index,'source':this.reqObj.source,'destination':this.reqObj.destination,'journeyDate':this.reqObj.journeyDate,'tripType':this.reqObj.tripTypeNum,'flightType':this.reqObj.flightTypeNum,'adults':this.reqObj.adults,'children':this.reqObj.children,'infants':this.reqObj.infants,'travelClass':this.reqObj.travelClass,'returnDate':this.reqObj.returnDate } }) 
  }
}
