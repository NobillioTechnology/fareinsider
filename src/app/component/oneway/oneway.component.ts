import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-oneway',
  templateUrl: './oneway.component.html',
  styleUrls: ['./oneway.component.css']
})
export class OnewayComponent implements OnInit {
  myForm: any = FormGroup;
  flightList:any=[];
  url:any;
  actionType:any=-1;
  actionInt:any=-1;
  index:any;
  IntflightList:any=[]
  flightType:any;
  reqObj:any={};
  closetem:any=0;
  closetemp:any=0;
  comission:any =0;
  comissionType:any=""
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
  conectingFlyt:any={};
  fareRule:any;
  intConectingFlyt:any={};
  fareRuleInt:any;
  agentCode:any;
  salechanl:any;
  userDetail:any={};
  airportSrcList:any=[];
  airportDesList:any=[];
  source:any;
  countrySrc:any;
  destination:any;
  countryDes:any;
  // flightType:any;
  journeydate:any;
  returndate:any;
  travelClass:any;
  searchFlag:any='0';
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService,private route: ActivatedRoute) {
    this.myForm = new FormGroup({
      // selectWay: new FormControl('',[Validators.required]),
      goingfrom: new FormControl('',[Validators.required]),
      goingTo: new FormControl('',[Validators.required]),
      depDate: new FormControl('',[Validators.required]),
      // returnDate: new FormControl(''),
      // adult: new FormControl('',[Validators.required]),
      // child: new FormControl('',[Validators.required]),
      // infant: new FormControl('',[Validators.required]),
      // class: new FormControl('',[Validators.required]), 	
    }) 
   }

  ngOnInit(): void {
    this.url=this.service.baseUrl
    // this.flightType='domestic'
    // this.url=this.service.baseUrl
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    if(this.userDetail){
      // this.isLogin=2
      this.agentCode=this.userDetail.Acode
      this.salechanl='DO-B2B2C'
      if(this.userDetail.UserType=="Agent"){
        this.salechanl='SA-B2B'
      }
    }else{
      this.agentCode='FAREIN0001'
      this.salechanl='DO-B2B2C'
    }
  
    this.route.queryParams.subscribe(params => {
    //  console.log(params);
     this.reqObj=params
    //  console.log("param====>"+JSON.stringify(this.reqObj))
    //  alert()
    //  this.flightType=params['flightType']
    //  if(this.flightType=='domestic'){
    //   this.availableFlights()
    // }else if(this.flightType=='international'){
    //   this.availableInternationalFlights()
    // }
    })
    this.availableFlights()
    this.travelClass=localStorage.getItem("travelclass")
    
    setTimeout(()=>{
      if(this.reqObj.flightTypeNum=='1'){
        let tempArr={airlineObj:[],airlynJson:[]}
        if(this.flightList.length!=0){
          this.flightList.find((item,index)=>{
            if(tempArr.airlineObj.indexOf(item.FlightSegments[0].AirLineName)==-1){
              tempArr.airlineObj.push(item.FlightSegments[0].AirLineName)
              tempArr.airlynJson.push({"airlineName":item.FlightSegments[0].AirLineName,"isChkd":false}) 
            } 
          })
          this.airlineArr=tempArr
          console.log("airlines====>"+JSON.stringify(this.airlineArr))
        }
      }else if(this.reqObj.flightTypeNum=='2'){
        let tempArr={airlineObj:[],airlynJson:[]}
        if(this.IntflightList.length!=0){
          this.IntflightList.find((item,index)=>{
            if(tempArr.airlineObj.indexOf(item.IntOnward.FlightSegments[0].AirLineName)==-1){
              tempArr.airlineObj.push(item.IntOnward.FlightSegments[0].AirLineName)
              tempArr.airlynJson.push({"airlineName":item.IntOnward.FlightSegments[0].AirLineName,"isChkd":false}) 
            } 
          })
          this.airlineArr=tempArr
        }
      }
    },4000)
  
    this.salesRule()
  
  }
  // savetoTextFile(temp) {
  //   (function() {
  //     var textFile = null,
  //       makeTextFile = function(text) {
  //         var data = new Blob([text], {
  //           type: 'text/plain'
  //         });
  //         if (textFile !== null) {
  //           window.URL.revokeObjectURL(textFile);
  //         }
  //         textFile = window.URL.createObjectURL(data);
  //         // console.log("saveTxt====="+textFile)
  //         return textFile;  
  //       }; 
  //       var array=JSON.stringify(temp)
  //       // makeTextFile(array);
  //       const dlink: HTMLAnchorElement = document.createElement('a');
  //       dlink.download = 'myresponsefile.txt'; // the file name
  //       // const myFileContent: string = 'I am a text file! ';
  //       dlink.href =  makeTextFile(array);
  //       dlink.click(); // this will trigger the dialog window
  //       dlink.remove();
  //   })();
  //   }
    // saveReqtoTextFile(temp) {
    //   (function() {
    //     var textFile = null,
    //       makeTextFile = function(text) {
    //         var data = new Blob([text], {
    //           type: 'text/plain'
    //         });
    //         if (textFile !== null) {
    //           window.URL.revokeObjectURL(textFile);
    //         }
    //         textFile = window.URL.createObjectURL(data);
    //         // console.log("saveTxt====="+textFile)
    //         return textFile;  
    //       }; 
    //       // var array=JSON.stringify(temp)
    //       // makeTextFile(array);
    //       const dlink: HTMLAnchorElement = document.createElement('a');
    //       dlink.download = 'myrequestfile.txt'; // the file name
    //       // const myFileContent: string = 'I am a text file! ';
    //       dlink.href =  makeTextFile(temp);
    //       dlink.click(); // this will trigger the dialog window
    //       dlink.remove();
    //   })();
    //   }
    saveTextfile(obj){
      let dataInfo={
        "Method": "SearchFlight",
        "Services" :"Flight",
        "Data" :JSON.stringify(obj)
      }
      this.service.testPostApiMethod(dataInfo,"Comman/SaveLogs").subscribe(res=>{
      },
      (err)=>{
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
    if(val.isChkd==false){
      if(this.checkArr.indexOf(val.airlineName)!=-1){
        this.checkArr.splice(this.checkArr.indexOf(val.airlineName),1)
      }
    }else{
      if(this.checkArr.indexOf(val.airlineName)==-1){
        this.checkArr.push(val.airlineName)
      }
    }
   
    console.log("chkAirlineAAray====="+JSON.stringify(this.checkArr))
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
    this.isActive=''
    this.isAct=''
    this.price=''
    this.checkArr=[]
    this.fareTyp=''
    this.filtersection='1'
    this.availableFlights()
  }
  filter(){
if(this.reqObj.flightTypeNum=='1'){
  this.filterDom()
}else if(this.reqObj.flightTypeNum=='2'){
  this.filterInt()
}
  }
filterDom(){
  this.availableFlights()
  setTimeout(()=>{
    let tempData=[]
    if(this.stop!=undefined){
      // alert(this.stop)
      let fyltArr=[]
      if(tempData.length==0){
        this.flightList.find((item,index)=>{
          if(item.FlightSegments.length-1==this.stop){
            fyltArr.push(item)
          }
        })
        tempData=fyltArr
       // this.flightList=tempData
      }else{
        tempData.find((item,index)=>{
          if(item.FlightSegments.length-1==this.stop){
            fyltArr.push(item)
          }
        })
        tempData=fyltArr
       // this.flightList=tempData
      }
      
      console.log("filterstop=====>"+JSON.stringify(tempData))
      // this.flightList=tempData
    }
    if(this.data.price!=undefined){
      // alert(this.price)
      let fyltArr=[]
    if(tempData.length==0){
      this.flightList.find((item,index)=>{
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
    // this.flightList=tempData
    console.log("filterprice=====>"+JSON.stringify(tempData)) 
  }
  if(this.mintime!=undefined && this.maxtime!=undefined){
    let fyltArr=[]
    
    let fromTym=this.mintime*60
    let toTym=this.maxtime*60
    // alert(fromTym)
    // alert(toTym)
    if(tempData.length==0){
      this.flightList.find((item,index)=>{
        // let flyTime=new Date(item.FlightSegments[0].DepartureDateTime).getHours()+':'+new Date(item.FlightSegments[0].DepartureDateTime).getMinutes()
              let flyTime=(new Date(item.FlightSegments[0].DepartureDateTime).getHours()*60)+new Date(item.FlightSegments[0].DepartureDateTime).getMinutes()
if(toTym==0){
  if(flyTime>=fromTym){
    // alert(flyTime)
    fyltArr.push(item)
  }
}
       else if(flyTime>=fromTym && flyTime<=toTym){
          // alert(flyTime)
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
    }else{
      // alert("hi")
      tempData.find((item,index)=>{
        // let flyTime=new Date(item.FlightSegments[0].DepartureDateTime).getHours()+':'+new Date(item.FlightSegments[0].DepartureDateTime).getMinutes()
        let flyTime=(new Date(item.FlightSegments[0].DepartureDateTime).getHours()*60)+new Date(item.FlightSegments[0].DepartureDateTime).getMinutes()
        if(toTym==0){
          if(flyTime>=fromTym){
            fyltArr.push(item)
          }
        }else if(flyTime>=fromTym && flyTime<=toTym){
                  fyltArr.push(item)
                }
      })
      tempData=fyltArr
    }
    // this.flightList=tempData
    console.log("filtertym=====>"+JSON.stringify(tempData))
  }
  if(this.checkArr.length!=0){
    let fyltArr=[]
    if(tempData.length==0){
        this.flightList.find((item,index)=>{
          this.checkArr.find((temp,ind) =>{
            // alert(temp)
              if(item.FlightSegments[0].AirLineName==temp){
                fyltArr.push(item)
               }
            })
        })
        tempData=fyltArr
        this.flightList=tempData
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
        this.flightList=tempData
      }
      // this.flightList=tempData
      console.log("filterairline=====>"+JSON.stringify(tempData))
  }
  if(this.fareTyp!=undefined){
    // alert(this.fareTyp)
    let fyltArr=[]
    if(tempData.length==0){
      this.flightList.find((item,index)=>{
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
    // this.flightList=tempData
    console.log("filterfareTyp=====>"+JSON.stringify(tempData))
  }
  console.log("filterfinal=====>"+JSON.stringify(tempData))
  this.flightList=tempData
  
   },3000)
   this.filtersection='1'
}
filterInt(){
  this.availableFlights()
  setTimeout(()=>{
  let tempData=[]
  if(this.stop!=undefined){
    // alert(this.stop)
    let fyltArr=[]
    if(tempData.length==0){
      this.IntflightList.find((item,index)=>{
        if(item.IntOnward.FlightSegments.length-1==this.stop){
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
     // this.IntflightList=tempData
    }else{
      tempData.find((item,index)=>{
        if(item.IntOnward.FlightSegments.length-1==this.stop){
          fyltArr.push(item)
        }
      })
      tempData=fyltArr
     // this.IntflightList=tempData
    }
    
    console.log("filterstop=====>"+JSON.stringify(tempData))
    // this.IntflightList=tempData
  }
  if(this.data.price!=undefined){
    // alert(this.price)
    let fyltArr=[]
  if(tempData.length==0){
    this.IntflightList.find((item,index)=>{
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
  // this.IntflightList=tempData
  console.log("filterprice=====>"+JSON.stringify(tempData)) 
}
if(this.mintime!=undefined && this.maxtime!=undefined){
  let fyltArr=[]
  let fromTym=this.mintime*60
  let toTym=this.maxtime*60
  // alert(this.mintime)
  // alert(this.maxtime)
  if(tempData.length==0){
    this.IntflightList.find((item,index)=>{
      let flyTime=(new Date(item.IntOnward.FlightSegments[0].DepartureDateTime).getHours()*60)+new Date(item.IntOnward.FlightSegments[0].DepartureDateTime).getMinutes()
      if(toTym==0){
        if(flyTime>=fromTym){
          fyltArr.push(item)
        }
      }else if(flyTime>=fromTym && flyTime<=toTym){
                fyltArr.push(item)
              }
    })
    tempData=fyltArr
  }else{
    tempData.find((item,index)=>{
      let flyTime=(new Date(item.IntOnward.FlightSegments[0].DepartureDateTime).getHours()*60)+new Date(item.IntOnward.FlightSegments[0].DepartureDateTime).getMinutes()
      if(toTym==0){
        if(flyTime>=fromTym){
          fyltArr.push(item)
        }
      }else if(flyTime>=fromTym && flyTime<=toTym){
                fyltArr.push(item)
              }
    })
    tempData=fyltArr
  }
  // this.IntflightList=tempData
  console.log("filtertym=====>"+JSON.stringify(tempData))
}
if(this.checkArr.length!=0){
  let fyltArr=[]
  if(tempData.length==0){
      this.IntflightList.find((item,index)=>{
        this.checkArr.find((temp,ind) =>{
          // alert(temp)
            if(item.IntOnward.FlightSegments[0].AirLineName==temp){
              fyltArr.push(item)
             }
          })
      })
      tempData=fyltArr
      this.IntflightList=tempData
    }else{
      tempData.find((item,index)=>{
        this.checkArr.find((temp,ind) =>{
          // alert(temp)
          if(item.IntOnward.FlightSegments[0].AirLineName==temp){
            fyltArr.push(item)
           }
        })
      })
      tempData=fyltArr
      this.IntflightList=tempData
    }
    // this.IntflightList=tempData
    console.log("filterairline=====>"+JSON.stringify(tempData))
}
if(this.fareTyp!=undefined){
  // alert(this.fareTyp)
  let fyltArr=[]
  if(tempData.length==0){
    this.IntflightList.find((item,index)=>{
      if(item.IntOnward.FlightSegments[0].BookingClassFare.Rule==this.fareTyp){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
  }else{
    tempData.find((item,index)=>{
      if(item.IntOnward.FlightSegments[0].BookingClassFare.Rule==this.fareTyp){
        fyltArr.push(item)
      }
    })
    tempData=fyltArr
  }
  // this.IntflightList=tempData
  console.log("filterfareTyp=====>"+JSON.stringify(tempData))
}
console.log("filterfinal=====>"+JSON.stringify(tempData))
this.IntflightList=tempData
},3000)
this.filtersection='1'
}
  salesRule(){
    // this.spinner.show();
    this.service.testGetApiMethod(`Booking/GetSalesRule?product=SV0002&agentcode=${this.agentCode}&salechannel=${this.salechanl}`).subscribe(res=>{
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
  availableFlights(){
   
    // this.spinner.show();
    this.service.getApiMethod(`Flights/AvailableFlights?source=${this.reqObj.source}&destination=${this.reqObj.destination}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripTypeNum}&flightType=${this.reqObj.flightTypeNum}&adults=${this.reqObj.adults}&children=${this.reqObj.children}&infants=${this.reqObj.infants}&travelClass=${this.reqObj.travelClass}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
    console.log("getflights ====>"+JSON.stringify(res)); 
    if(res.ResponseStatus==200){
      // this.spinner.hide();
      if(this.searchFlag=='1'){ 
      this.saveTextfile(`Flights/AvailableFlights?source=${this.reqObj.source}&destination=${this.reqObj.destination}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripTypeNum}&flightType=${this.reqObj.flightTypeNum}&adults=${this.reqObj.adults}&children=${this.reqObj.children}&infants=${this.reqObj.infants}&travelClass=${this.reqObj.travelClass}&userType=5&returnDate=${this.reqObj.returnDate}`)
      this.saveTextfile(res)}
      if(this.reqObj.flightTypeNum=='1'){
        this.flightType='domestic'
        this.flightList=res.DomesticOnwardFlights;
      
      }else if(this.reqObj.flightTypeNum=='2'){
        this.flightType='international'
        this.IntflightList=res.InternationalFlights;
      }
        }
   },
   (err)=>{
    
  });
  }
  // availableInternationalFlights(){
  //   // this.spinner.show();
  //   this.service.getApiMethod("Flights/AvailableFlights?source=DXB&destination=WAW&journeyDate=30-10-2020&tripType=1&flightType=2&adults=1&children=0&infants=0&travelClass=E&userType=5&returnDate=30-10-2020").subscribe(res=>{
  //   console.log("getflights ====>"+JSON.stringify(res)); 
  //   if(res.ResponseStatus==200){
  //     // this.spinner.hide();
  //     this.IntflightList=res.InternationalFlights;
  //     console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
  //       }
  //  },
  //  (err)=>{
  //   // this.spinner.hide(); 
  //   // this.router.navigate(['login'])
  //   // console.log(err)
  // });
  // }
  showDetail(val,obj){
    this.conectingFlyt=obj
    if(this.closetem==0){
      this.closetem=1
      this.actionType=val;
    }else if(this.closetem==1){
      this.closetem=0
      this.actionType=-1;
    }
    this.getFareDetail()
  }
 
  flightDetail(val,obj){
    let searchId=Math.floor(Math.random() * 1000000);
    localStorage.setItem("searchId",searchId.toString())
    console.log("selectedddd_flight========>"+JSON.stringify(obj))
    this.index=val
    this.conectingFlyt=obj
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
    if(obj.FlightSegments.length==1){
        this.isConnect=0
      }else{
        this.isConnect=1
      }
      let oneDom={"flytId":obj.FlightUId,"carrierCode":obj.FlightSegments[0].OperatingAirlineCode,"FlyNum":obj.FlightSegments[0].FlightNumber,"depdate":obj.FlightSegments[0].DepartureDateTime,"arrdate":obj.FlightSegments[0].ArrivalDateTime,"duration":obj.FlightSegments[0].Duration,"totfare":obj.FareDetails.ChargeableFares.NetFare,"tax":obj.FareDetails.ChargeableFares.Tax,"isconnect":this.isConnect,
    "classCode":obj.FlightSegments[0].BookingClassFare.ClassType,"couponFare":obj.FlightSegments[0].RPH,"key":obj.OriginDestinationoptionId.Key,"provider":obj.Provider,}
      localStorage.setItem("saveFlyt", JSON.stringify(oneDom)) 
      // console.log('saving flyte =======>', JSON.stringify(oneDom));
      this.router.navigate(['flight-details'],{ queryParams: {'index': this.index,'source':this.reqObj.source,'destination':this.reqObj.destination,'journeyDate':this.reqObj.journeyDate,'tripType':this.reqObj.tripTypeNum,'flightType':this.reqObj.flightTypeNum,'adults':this.reqObj.adults,'children':this.reqObj.children,'infants':this.reqObj.infants,'travelClass':this.reqObj.travelClass,'returnDate':this.reqObj.returnDate } }) 
//  this.getFareDetail()
    //  this.getTaxDetail()

}
getFareDetail(){
  this.service.getApiMethod(`Flights/GetFareRule?key=${this.conectingFlyt.OriginDestinationoptionId.Key}&airlineId=${this.conectingFlyt.FlightSegments[0].OperatingAirlineCode}&flightId=${this.conectingFlyt.FlightSegments[0].FlightNumber}&classCode=${this.conectingFlyt.FlightSegments[0].BookingClassFare.ClassType}&service=${this.reqObj.flightTypeNum}&provider=${this.conectingFlyt.Provider}&tripType=${this.reqObj.tripTypeNum}&couponFare=${this.conectingFlyt.FlightSegments[0].RPH}&userType=5&user=''`).subscribe(res=>{
    // console.log("getflights ====>"+JSON.stringify(res)); 
    // console.log("getfareRule ====>"+JSON.stringify(res)); 
      this.fareRule=res      
   },
   (err)=>{ 
  });
}
showIntFlightDetail(val,obj){
  this.intConectingFlyt=obj
  if(this.closetemp==0){
    this.closetemp=1
    this.actionInt=val;
  }else if(this.closetemp==1){
    this.closetemp=0
    this.actionInt=-1;
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
internationalFlightDetail(val,obj){
  // this.index=val
  let searchId=Math.floor(Math.random() * 1000000);
  localStorage.setItem("searchId",searchId.toString())
  console.log("selectedddd_flight========>"+JSON.stringify(obj))
  this.index=val
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
  if(obj.IntOnward.FlightSegments.length==1){
    this.isConnect=0
  }else{
    this.isConnect=1
  }
  let oneInt={"flytId":obj.FlightUId,"carrierCode":obj.IntOnward.FlightSegments[0].OperatingAirlineCode,"FlyNum":obj.IntOnward.FlightSegments[0].FlightNumber,"depdate":obj.IntOnward.FlightSegments[0].DepartureDateTime,"arrdate":obj.IntOnward.FlightSegments[0].ArrivalDateTime,"duration":obj.IntOnward.FlightSegments[0].Duration,"totfare":obj.FareDetails.ChargeableFares.NetFare,"tax":obj.FareDetails.ChargeableFares.Tax,"isconnect":this.isConnect}
  localStorage.setItem("saveFlyt", JSON.stringify(oneInt)) 
  this.router.navigate(['flight-details'],{ queryParams: {'index': this.index,'source':this.reqObj.source,'destination':this.reqObj.destination,'journeyDate':this.reqObj.journeyDate,'tripType':this.reqObj.tripTypeNum,'flightType':this.reqObj.flightTypeNum,'adults':this.reqObj.adults,'children':this.reqObj.children,'infants':this.reqObj.infants,'travelClass':this.reqObj.travelClass,'returnDate':this.reqObj.returnDate} }) 
}
getTaxDetail(){
  let dataInfo={
    "ActualBaseFare":this.conectingFlyt.FareDetails.ChargeableFares.ActualBaseFare,
    "ActualBaseFareRet": 0,
    "AdultPax": this.reqObj.adults,
    "BookedFrom": "",
    "BookingDate": new Date(),
    "ChildPax": this.reqObj.children,
    "Conveniencefee": this.conectingFlyt.FareDetails.ChargeableFares.Conveniencefee,
    "ConveniencefeeRet": 0,
    "Destination": this.reqObj.destination,
    "DestinationName": "Bangalore, BLR",
    "FlightId": this.conectingFlyt.OriginDestinationoptionId.Id,
    "FlightIdRet": "",
    "FlightType": this.reqObj.flightTypeNum,
    "GSTDetails":
    {
    "GSTCompanyAddress": "Hyderabad",
    "GSTCompanyContactNumber": "9234234234",
    "GSTCompanyName": "i2space",
    "GSTNumber": "534234234233",
    "GSTCompanyEmail": "guru.m@i2space.com",
    "GSTFirstName": "Guru",
    "GSTLastName": "Bharat"
    },
    "InfantPax": this.reqObj.infants,
    "IsLCC": this.conectingFlyt.IsLCC,
    "IsLCCRet":"",
    "IsNonStopFlight": false,
    "JourneyDate": this.reqObj.journeyDate,
    "key": this.conectingFlyt.OriginDestinationoptionId.Key,
    "keyRet": "",
    "OcTax": this.conectingFlyt.FlightSegments[0].OcTax,
    "OnwardFlightSegments": [this.conectingFlyt.FlightSegments
//     {
//     "AirEquipType": this.conectingFlyt.FlightSegments[0].OcTax,
//     "ArrivalAirportCode":this.conectingFlyt.FlightSegments[0].OcTax,
//     "ArrivalDateTime": this.conectingFlyt.FlightSegments[0].OcTax,
//     "ArrivalDateTimeZone": this.conectingFlyt.FlightSegments[0].OcTax,
//     "DepartureAirportCode":this.conectingFlyt.FlightSegments[0].OcTax,
//     "DepartureDateTime": this.conectingFlyt.FlightSegments[0].OcTax,
//     "DepartureDateTimeZone": this.conectingFlyt.FlightSegments[0].OcTax,
//     "Duration":this.conectingFlyt.FlightSegments[0].OcTax,
//  "FlightNumber": this.conectingFlyt.FlightSegments[0].OcTax,
//  "OperatingAirlineCode": this.conectingFlyt.FlightSegments[0].OcTax,
//  "OperatingAirlineFlightNumber":this.conectingFlyt.FlightSegments[0].OcTax,
//  "RPH":this.conectingFlyt.FlightSegments[0].OcTax,
//  "StopQuantity": this.conectingFlyt.FlightSegments[0].OcTax,
//  "AirLineName": this.conectingFlyt.FlightSegments[0].OcTax,
//  "AirportTax":this.conectingFlyt.FlightSegments[0].OcTax,
//  "ImageFileName": this.conectingFlyt.FlightSegments[0].OcTax,
//  "ViaFlight": "",
//  "Discount": "0",
//  "AirportTaxChild": "0",
//  "AirportTaxInfant": "0",
//  "AdultTaxBreakup": "0",
//  "ChildTaxBreakup": "0",
//  "InfantTaxBreakup": "0",
//  "OcTax": "0",
//  "BookingClass": {
//  "Availability": "",
//  "ResBookDesigCode": "",
//  "IntBIC": ""
//  },
//  "BookingClassFare": {
//  "AdultFare": "",
//  "Bookingclass": "",
//  "ClassType": "L",
//  "Farebasiscode": "LSAVER",
//  "Rule": "Refundable",
//  "AdultCommission": null,
//  "ChildCommission": null,
//  "CommissionOnTCharge": null,
//  "ChildFare": null,
//  "InfantFare": null
//  },
//  "IntNumStops": null,
//  "IntOperatingAirlineName": null,
//  "IntArrivalAirportName": "Bangalore",
//  "IntDepartureAirportName": "Hyderabad",
//  "IntMarketingAirlineCode": "1238",
//  "IntLinkSellAgrmnt": null,
//  "IntConx": null,
//  "IntAirpChg": null,
//  "IntInsideAvailOption": null,
//  "IntGenTrafRestriction": null,
//  "IntDaysOperates": null,
//  "IntJourneyTime": null,
//  "IntEndDate": null,
//  "IntStartTerminal": "",
//  "IntEndTerminal": "",
//  "IntFltTm": null,
//  "IntLSAInd": null,
//  "IntMile": "0",
//  "Cabin": null,
//  "itineraryNumber": null,
//  "BaggageAllowed": {
//  "CheckInBaggage": "7 Kg",
//  "HandBaggage": "10 Kg"
//  },
//  "AccumulatedDuration": "0"
//  }
 ],
 "provider":this.conectingFlyt.Provider,
 "ReturnDate":this.reqObj.returnDate,
 "Rule":this.fareRule,
 "RuleRet": "",
 "SCharge": this.conectingFlyt.FareDetails.ChargeableFares.SCharge,
 "SChargeRet": 0,
 "Source":this.reqObj.source,
 "SourceName":this.conectingFlyt.FlightSegments[0].IntDepartureAirportName+","+this.reqObj.source,
 "Tax": this.conectingFlyt.FareDetails.ChargeableFares.Tax,
 "TaxRet": 0,
 "TCharge": this.conectingFlyt.FareDetails.NonchargeableFares.TCharge,
 "TChargeRet": 0,
 "TDiscount":this.conectingFlyt.FareDetails.ChargeableFares.TDiscount,
 "TDiscountRet": 0,
 "TMarkup": this.conectingFlyt.FareDetails.NonchargeableFares.TMarkup,
 "TMarkupRet": 0,
 "TPartnerCommission": this.conectingFlyt.FareDetails.ChargeableFares.TPartnerCommission,
 "TPartnerCommissionRet": 0,
 "TravelClass": this.reqObj.travelClass,
 "TripType": this.reqObj.tripTypeNum,
 "TSdiscount": this.conectingFlyt.FareDetails.NonchargeableFares.TSdiscount,
 "TSdiscountRet": 0,
 "User": "",
 "UserType":5
  }
  this.service.postApiMethod(dataInfo,"Flights/GetTaxDetails").subscribe(res=>{
    // console.log("getflights ====>"+JSON.stringify(res)); 
    if(res.ResponseStatus==200){
        }
   },
   (err)=>{
    
  });
}
searchSrcAirport(){
  this.airportSrcList=[]
  // this.spinner.show();testGetApiMethod
  // var data={
  //   "Country": "india"
  // }
  if(this.myForm.value.goingfrom.length>2 && this.myForm.value.goingfrom.length<6){
  this.service.testGetApiMethod(`comman/Airport?airport=${this.myForm.value.goingfrom}`).subscribe(res=>{
 // console.log("getairport ====>"+JSON.stringify(res)); 
  if(res.Status==true){
    // this.router.navigate(['oneway'])
    // this.spinner.hide();
    if(res.Data!=null){
    this.airportSrcList=res.Data;
    } 
  }
 },
 (err)=>{
  // this.spinner.hide(); 
  // this.router.navigate(['login'])
  // console.log(err)
});
}
}
searchDesAirport(){
  this.airportDesList=[]
  // this.spinner.show();testGetApiMethod
  // var data={
  //   "Country": "india"
  // }
  if(this.myForm.value.goingTo.length>2 && this.myForm.value.goingTo.length<6){
  this.service.testGetApiMethod(`comman/Airport?airport=${this.myForm.value.goingTo}`).subscribe(res=>{
  // console.log("getairport ====>"+JSON.stringify(res)); 
  if(res.Status==true){
    // this.router.navigate(['oneway'])
    // this.spinner.hide();
    if(res.Data!=null){
    this.airportDesList=res.Data;
    }
  }
 },
 (err)=>{
  // this.spinner.hide(); 
  // this.router.navigate(['login'])
  // console.log(err)
});
}
}
searchAgain(){
  // alert("ok")
  this.searchFlag='1'
  this.journeydate = new Date(this.myForm.value.depDate).getDate() + '-' + (new Date(this.myForm.value.depDate).getMonth() + 1) + '-' + new Date(this.myForm.value.depDate).getFullYear();
  // this.returndate = new Date(this.myForm.value.returnDate).getDate() + '-' + (new Date(this.myForm.value.returnDate).getMonth() + 1) + '-' + new Date(this.myForm.value.returnDate).getFullYear();
  this.countrySrc= this.myForm.value.goingfrom.split(' ')[this.myForm.value.goingfrom.split(' ').length-2]
  let src=this.myForm.value.goingfrom.split('(')[this.myForm.value.goingfrom.split('(').length-1]
  this.source=src.split(')')[src.split(')').length-2]
  this.countryDes= this.myForm.value.goingTo.split(' ')[this.myForm.value.goingTo.split(' ').length-2]
  let dest=this.myForm.value.goingTo.split('(')[this.myForm.value.goingTo.split('(').length-1]
  this.destination=dest.split(')')[dest.split(')').length-2]
  if(this.countrySrc==this.countryDes){
   this.flightType=1
  }else{
    this.flightType=2
  }
  this.reqObj={"source":this.source,"destination":this.destination,"journeyDate":this.journeydate,"flightTypeNum":this.flightType,"returnDate":this.journeydate,"tripTypeNum":this.reqObj.tripTypeNum,"adults":this.reqObj.adults,"children":this.reqObj.children,"infants":this.reqObj.infants,"travelClass":this.reqObj.travelClass}
  this.availableFlights()

}
}
