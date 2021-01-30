import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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
  myForm: any = FormGroup;
  agentCode:any;
  salechanl:any;
  userDetail:any={};
  airportSrcList:any=[];
  airportDesList:any=[];
  source:any;
  countrySrc:any;
  destination:any;
  countryDes:any;
  flightType:any;
  journeydate:any;
  returndate:any;
  travelClass:any;
  searchFlag:any='0';
  constructor(private router: Router,private route: ActivatedRoute,private service: RestDataService,private heroservice:HeroService) {
    this.myForm = new FormGroup({
      // selectWay: new FormControl('',[Validators.required]),
      goingfrom: new FormControl('',[Validators.required]),
      goingTo: new FormControl('',[Validators.required]),
      depDate: new FormControl('',[Validators.required]),
      returnDate: new FormControl(''),
      // adult: new FormControl('',[Validators.required]),
      // child: new FormControl('',[Validators.required]),
      // infant: new FormControl('',[Validators.required]),
      // class: new FormControl('',[Validators.required]), 	
    }) 
   }

  ngOnInit(): void {
   
    this.url=this.service.baseUrl
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.reqObj=params
    })
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
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
  
    this.availableIntRoundwayFlights()
    this.travelClass=localStorage.getItem("travelclass")
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
  availableIntRoundwayFlights(){
    // this.spinner.show();
    this.service.getApiMethod(`Flights/AvailableFlights?source=${this.reqObj.source}&destination=${this.reqObj.destination}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripTypeNum}&flightType=${this.reqObj.flightTypeNum}&adults=${this.reqObj.adults}&children=${this.reqObj.children}&infants=${this.reqObj.infants}&travelClass=${this.reqObj.travelClass}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
    console.log("getflights ====>"+JSON.stringify(res)); 
    if(res.ResponseStatus==200){
      // this.spinner.hide();
      if(this.searchFlag=='1'){ 
      this.saveTextfile(`Flights/AvailableFlights?source=${this.reqObj.source}&destination=${this.reqObj.destination}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripTypeNum}&flightType=${this.reqObj.flightTypeNum}&adults=${this.reqObj.adults}&children=${this.reqObj.children}&infants=${this.reqObj.infants}&travelClass=${this.reqObj.travelClass}&userType=5&returnDate=${this.reqObj.returnDate}`)
      this.saveTextfile(res)}
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
    this.isActive=''
    this.isAct=''
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
      "Trip":"I"
    }
    this.service.testPostApiMethod(dataInfo,"Data/SaveRoundTripData").subscribe(res=>{
    },
    (err)=>{
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
  searchAgain(){
    // alert("ok")
    this.searchFlag='1'
    this.journeydate = new Date(this.myForm.value.depDate).getDate() + '-' + (new Date(this.myForm.value.depDate).getMonth() + 1) + '-' + new Date(this.myForm.value.depDate).getFullYear();
    this.returndate = new Date(this.myForm.value.returnDate).getDate() + '-' + (new Date(this.myForm.value.returnDate).getMonth() + 1) + '-' + new Date(this.myForm.value.returnDate).getFullYear();
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
    this.reqObj={"source":this.source,"destination":this.destination,"journeyDate":this.journeydate,"flightTypeNum":this.flightType,"returnDate":this.returndate,"tripTypeNum":this.reqObj.tripTypeNum,"adults":this.reqObj.adults,"children":this.reqObj.children,"infants":this.reqObj.infants,"travelClass":this.reqObj.travelClass}
    this.availableIntRoundwayFlights()
  
  }
}
