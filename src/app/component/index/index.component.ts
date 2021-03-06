import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  myForm: any = FormGroup;
  busForm: any = FormGroup;
  flightList:any=[];
  airportSrcList:any=[];
  airportDesList:any=[];
  source:any;
  countrySrc:any;
  destination:any;
  countryDes:any;
  flightType:any;
  // flight_type:any;
  msgFlag:any='0'
  temp:any={};
  journeydate:any;
  returndate:any;
  selectionType:any='flight';
  isActive:any='flight';
  busSrcList:any=[];
  busDesList:any=[];
  errMsg:any='0';
  sourceId:any;
  destinationId:any;
  trvlClass:any;
  model: NgbDateStruct;
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService) {
    this.myForm = new FormGroup({
      selectWay: new FormControl('',[Validators.required]),
      goingfrom: new FormControl('',[Validators.required]),
      goingTo: new FormControl('',[Validators.required]),
      depDate: new FormControl('',[Validators.required]),
      returnDate: new FormControl(''),
      adult: new FormControl('',[Validators.required]),
      child: new FormControl('',[Validators.required]),
      infant: new FormControl('',[Validators.required]),
      class: new FormControl('',[Validators.required]), 	
    }) 
    this.busForm = new FormGroup({
      tripTyp:new FormControl('',[Validators.required]),
      source: new FormControl('',[Validators.required]),
      destination: new FormControl('',[Validators.required]),
      fromDate: new FormControl('',[Validators.required]),
      // toDate: new FormControl(''),
     
    
    }) 
   }
  ngOnInit(): void {
    // alert(this.myForm.value.returnDate)
    this.myForm.controls["selectWay"].setValue('1');
    this.myForm.controls["adult"].setValue('1');
    this.myForm.controls["child"].setValue('0');
    this.myForm.controls["infant"].setValue('0');
    this.myForm.controls["class"].setValue('E');
    this.busForm.controls["tripTyp"].setValue('1');
  //  this.selectSrc()
    // source=HYD&destination=BLR&journeyDate=24-09-2020&tripType=1&flightType=1&adults=1&children=0&infants=0&travelClass=E&userType=5&returnDate=24-09-2020
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
    //       dlink.download = 'myrequestfile.txt'; 
    //       dlink.href =  makeTextFile(temp);
    //       dlink.click(); 
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
    saveTextfileBus(obj){
      let dataInfo={
        "Method": "SearchBus",
        "Services" :"Bus",
        "Data" :JSON.stringify(obj)
      }
      this.service.testPostApiMethod(dataInfo,"Comman/SaveLogs").subscribe(res=>{
      },
      (err)=>{
       }); 
    }
   availableFlights(){
     console.log('im clicked search');
     if(this.myForm.value.class=='E'){
      this.trvlClass='Economy'
     }else if(this.myForm.value.class=='PE'){
      this.trvlClass='Premium Economy'
     }else if(this.myForm.value.class=='B'){
      this.trvlClass='Business'
     }
     localStorage.setItem("travelclass",this.myForm.value.class)
    //  alert("toggleDate====="+JSON.stringify(this.myForm.value.depDate))
     this.journeydate=this.myForm.value.depDate.day+'-'+this.myForm.value.depDate.month+'-'+this.myForm.value.depDate.year
     this.returndate=this.myForm.value.returnDate.day+'-'+this.myForm.value.returnDate.month+'-'+this.myForm.value.returnDate.year
    //  alert("toggleDate====="+ this.journeydate)
    // this.journeydate = new Date(this.myForm.value.depDate).getDate() + '-' + (new Date(this.myForm.value.depDate).getMonth() + 1) + '-' + new Date(this.myForm.value.depDate).getFullYear();
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

    if(this.myForm.value.selectWay=='1'){
      // this.returndate=this.journeydate
        this.temp={'source':this.source,'destination':this.destination,'journeyDate':this.journeydate,'tripTypeNum':this.myForm.value.selectWay,'flightTypeNum':this.flightType,'adults':this.myForm.value.adult,'children':this.myForm.value.child,'infants':this.myForm.value.infant,'travelClass':this.myForm.value.class,'returnDate':this.journeydate}
            this.service.getApiMethod(`Flights/AvailableFlights?source=${this.temp.source}&destination=${this.temp.destination}&journeyDate=${this.temp.journeyDate}&tripType=${this.temp.tripTypeNum}&flightType=${this.temp.flightTypeNum}&adults=${this.temp.adults}&children=${this.temp.children}&infants=${this.temp.infants}&travelClass=${this.temp.travelClass}&userType=5&returnDate=${this.temp.returnDate}`).subscribe(res=>{
              // console.log("getflights ====>"+JSON.stringify(res)); 
              if(res.ResponseStatus==200){
                this.saveTextfile(`Flights/AvailableFlights?source=${this.temp.source}&destination=${this.temp.destination}&journeyDate=${this.temp.journeyDate}&tripType=${this.temp.tripTypeNum}&flightType=${this.temp.flightTypeNum}&adults=${this.temp.adults}&children=${this.temp.children}&infants=${this.temp.infants}&travelClass=${this.temp.travelClass}&userType=5&returnDate=${this.temp.returnDate}`)
                this.saveTextfile(res)
                this.router.navigate(['oneway'],{ queryParams: {'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate}})
                  }
             },
             (err)=>{
              
            });
          // else if(this.myForm.value.selectWay=='2' && this.flightType=='1'){
          //   this.router.navigate(['roundway'],{ queryParams: {'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate}})
          // }else if(this.myForm.value.selectWay=='2' && this.flightType=='2'){
          //   this.router.navigate(['international-flight'],{ queryParams:{'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate} })
          // }
        
    }else if(this.myForm.value.selectWay=='2') {
      if(this.myForm.value.returnDate==''){
        this.msgFlag='1'
      }else if(this.myForm.value.returnDate!=''){
        this.msgFlag='0'
        this.temp={'source':this.source,'destination':this.destination,'journeyDate':this.journeydate,'tripTypeNum':this.myForm.value.selectWay,'flightTypeNum':this.flightType,'adults':this.myForm.value.adult,'children':this.myForm.value.child,'infants':this.myForm.value.infant,'travelClass':this.myForm.value.class,'returnDate':this.returndate}
        this.service.getApiMethod(`Flights/AvailableFlights?source=${this.temp.source}&destination=${this.temp.destination}&journeyDate=${this.temp.journeyDate}&tripType=${this.temp.tripTypeNum}&flightType=${this.temp.flightTypeNum}&adults=${this.temp.adults}&children=${this.temp.children}&infants=${this.temp.infants}&travelClass=${this.temp.travelClass}&userType=5&returnDate=${this.temp.returnDate}`).subscribe(res=>{
          if(res.ResponseStatus==200){
            this.saveTextfile(`Flights/AvailableFlights?source=${this.temp.source}&destination=${this.temp.destination}&journeyDate=${this.temp.journeyDate}&tripType=${this.temp.tripTypeNum}&flightType=${this.temp.flightTypeNum}&adults=${this.temp.adults}&children=${this.temp.children}&infants=${this.temp.infants}&travelClass=${this.temp.travelClass}&userType=5&returnDate=${this.temp.returnDate}`)
            this.saveTextfile(res)
            if(this.myForm.value.selectWay=='2' && this.flightType=='1'){
              this.router.navigate(['roundway'],{ queryParams: {'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate}})
            }else if(this.myForm.value.selectWay=='2' && this.flightType=='2'){
              this.router.navigate(['international-flight'],{ queryParams:{'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate} })
            }
          }
         },
         (err)=>{ 
        });
      }
      }
        
          
         
      





// if(this.myForm.value.selectWay=='1'){
//   this.returndate=this.journeydate
//   this.service.getApiMethod(`Flights/AvailableFlights?source=${this.source}&destination=${this.destination}&journeyDate=${this.journeydate}&tripType=${this.myForm.value.selectWay}&flightType=${this.flightType}&adults=${this.myForm.value.adult}&children=${this.myForm.value.child}&infants=${this.myForm.value.infant}&travelClass=${this.myForm.value.class}&userType=5&returnDate=${this.returndate}`).subscribe(res=>{
//     // console.log("getbooks ====>"+JSON.stringify(res)); 
//     this.temp={'source':this.source,'destination':this.destination,'journeyDate':this.journeydate,'tripTypeNum':this.myForm.value.selectWay,'flightTypeNum':this.flightType,'adults':this.myForm.value.adult,'children':this.myForm.value.child,'infants':this.myForm.value.infant,'travelClass':this.myForm.value.class,'returnDate':this.returndate}
//     if(res.ResponseStatus==200){
//       if(this.myForm.value.selectWay=='1'){
//         // let obj = JSON.stringify({ 'tripType':'oneway','flightType':this.flight_type  })
//         this.router.navigate(['oneway'],{ queryParams: {'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate}})
//       }else if(this.myForm.value.selectWay=='2' && this.flightType=='1'){
//         this.router.navigate(['roundway'],{ queryParams: {'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate}})
//       }else if(this.myForm.value.selectWay=='2' && this.flightType=='2'){
//         this.router.navigate(['international-flight'],{ queryParams:{'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate} })
//       }
     
//       // this.spinner.hide();
//       this.flightList=res.data;
//     }
//    },
//    (err)=>{
//     // this.spinner.hide(); 
//     // this.router.navigate(['login'])
//     // console.log(err)
//   });
// }else if(this.myForm.value.selectWay=='2' && this.myForm.value.returnDate=='') {
//   this.msgFlag='1'
//   }else if(this.myForm.value.selectWay=='2' && this.myForm.value.returnDate!=''){
//     this.msgFlag='0'
//     this.service.getApiMethod(`Flights/AvailableFlights?source=${this.source}&destination=${this.destination}&journeyDate=${this.journeydate}&tripType=${this.myForm.value.selectWay}&flightType=${this.flightType}&adults=${this.myForm.value.adult}&children=${this.myForm.value.child}&infants=${this.myForm.value.infant}&travelClass=${this.myForm.value.class}&userType=5&returnDate=${this.returndate}`).subscribe(res=>{
//       console.log("getbooks ====>"+JSON.stringify(res)); 
//       this.temp={'source':this.source,'destination':this.destination,'journeyDate':this.journeydate,'tripTypeNum':this.myForm.value.selectWay,'flightTypeNum':this.flightType,'adults':this.myForm.value.adult,'children':this.myForm.value.child,'infants':this.myForm.value.infant,'travelClass':this.myForm.value.class,'returnDate':this.returndate}
//       if(res.ResponseStatus==200){
//         if(this.myForm.value.selectWay=='1'){
//           // let obj = JSON.stringify({ 'tripType':'oneway','flightType':this.flight_type  })
//           this.router.navigate(['oneway'],{ queryParams: {'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate}})
//         }else if(this.myForm.value.selectWay=='2' && this.flightType=='1'){
//           this.router.navigate(['roundway'],{ queryParams: {'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate}})
//         }else if(this.myForm.value.selectWay=='2' && this.flightType=='2'){
//           this.router.navigate(['international-flight'],{ queryParams:{'source':this.temp.source,'destination':this.temp.destination,'journeyDate':this.temp.journeyDate,'tripTypeNum':this.temp.tripTypeNum,'flightTypeNum':this.temp.flightTypeNum,'adults':this.temp.adults,'children':this.temp.children,'infants':this.temp.infants,'travelClass':this.temp.travelClass,'returnDate':this.temp.returnDate} })
//         }
       
//         // this.spinner.hide();
//         this.flightList=res.data;
//       }
//      },
//      (err)=>{
//       // this.spinner.hide(); 
//       // this.router.navigate(['login'])
//       // console.log(err)
//     });
//   }
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
  searchAction(val){
    this.selectionType=val
    this.isActive=val
  }
  // selectSrc(){
  //   this.service.getApiMethod("Buses/Sources").subscribe(res=>{
  //   if(res!=null){
  //     this.busSrcList=res;
  //   }
  //  },
  //  (err)=>{
  // });
  // }
  searchSrcBus(){
    if(this.busForm.value.source.length>2 && this.busForm.value.source.length<6){
      // alert("inside")
    this.service.testGetApiMethod(`Comman/BusCity?City=${this.busForm.value.source}`).subscribe(res=>{
   console.log("getbuscity ====>"+JSON.stringify(res.Data)); 
    if(res.Status==true){
      if(res.Data!=null){
        this.busSrcList=[]
        this.busSrcList=res.Data;
      }   
    }
   },
   (err)=>{
  });
  } else {
    //alert("ddddd")
    // console.log("========="+JSON.stringify(this.busSrcList))
    this.busSrcList.find((item,index)=>{
      // console.log(item.City+"========="+this.busForm.value.source.trim())
      if(item.City==this.busForm.value.source.trim()){
        this.sourceId=item.Id
        //alert("4444"+this.sourceId)
        return 1;
      }
    }) 
  }
  }

  searchDesBus(){
    if(this.busForm.value.destination.length>2 && this.busForm.value.destination.length<6){
      // alert("inside")
    this.service.testGetApiMethod(`Comman/BusCity?City=${this.busForm.value.destination}`).subscribe(res=>{
  //  console.log("getbuscity ====>"+JSON.stringify(res.Data)); 
    if(res.Status==true){
      if(res.Data!=null){
        this.busDesList=[]
        this.busDesList=res.Data;
      }   
    }
   },
   (err)=>{
  });
  } else {
    //alert("ddddd")
    // console.log("========="+JSON.stringify(this.busDesList))
    this.busDesList.find((item,index)=>{
      // console.log(item.City+"========="+this.busForm.value.destination.trim())
      if(item.City==this.busForm.value.destination.trim()){
        this.destinationId=item.Id
        //alert("4444"+this.sourceId)
        return 1;
      }
    }) 
  }
  }
  // searchDesBus1(){
  //   this.busDesList=[]
  //   if(this.busForm.value.destination.length>2 && this.busForm.value.destination.length<6){
  //   this.service.testGetApiMethod(`Comman/BusCity?City=${this.busForm.value.destination}`).subscribe(res=>{
  //  // console.log("getairport ====>"+JSON.stringify(res)); 
  //   if(res.Status==true){
  //     if(res.Data!=null){
  //     this.busDesList=res.Data;
  //     this.busDesList.find((item,index)=>{
  //       // console.log(JSON.stringify(item))
  //       if(item.City==this.busForm.value.destination){
  //         this.destinationId=item.Id
  //         return 1;
  //       }
  //     })
  //     }   
  //   }
  //  },
  //  (err)=>{
  // });
  // }
  // }
  searchBuses(){
    // this.journeydate = new Date(this.busForm.value.fromDate).getDate() + '-' + (new Date(this.busForm.value.fromDate).getMonth() + 1) + '-' + new Date(this.busForm.value.fromDate).getFullYear();
    this.journeydate = this.busForm.value.fromDate.day + '-' +this.busForm.value.fromDate.month + '-' +this.busForm.value.fromDate.year;
    this.service.getApiMethod(`Buses/AvailableBuses?sourceId=${this.sourceId}&destinationId=${this.destinationId}&journeyDate=${this.journeydate}&tripType=1&userType=5&returnDate=${this.journeydate}`).subscribe(res=>{
      // console.log("getbuses ====>"+JSON.stringify(res)); 
      if(res.ResponseStatus==200){
        this.saveTextfileBus(`Buses/AvailableBuses?sourceId=${this.sourceId}&destinationId=${this.destinationId}&journeyDate=${this.journeydate}&tripType=1&userType=5&returnDate=${this.journeydate}`)
        this.saveTextfileBus(res)
        this.router.navigate(['bus-result'],{ queryParams: {'sourceId':this.sourceId,'destinationId':this.destinationId,'journeyDate':this.journeydate,'tripType':'1','returnDate':this.journeydate,'srcName':this.busForm.value.source,'destName':this.busForm.value.destination}})        
     }
     (err)=>{
     
      }
    });
  }
    // this.busSrcList.find((item,index)=>{
    //   // console.log(JSON.stringify(item))
    //   if(item.City==this.busForm.value.source){
    //     console.log(JSON.stringify(item))
    //     this.sourceId=item.Id
    //     return 1;
    //   }
    // })
    // this.busDesList.find((item,index)=>{
    //   // console.log(JSON.stringify(item))
    //   if(item.City==this.busForm.value.destination){
    //     this.destinationId=item.Id
    //     return 1;
    //   }
    // })
    // this.journeydate = new Date(this.busForm.value.fromDate).getDate() + '-' + (new Date(this.busForm.value.fromDate).getMonth() + 1) + '-' + new Date(this.busForm.value.fromDate).getFullYear();
    // this.returndate = new Date(this.busForm.value.toDate).getDate() + '-' + (new Date(this.busForm.value.toDate).getMonth() + 1) + '-' + new Date(this.busForm.value.toDate).getFullYear();
    
      // this.returndate=this.journeydate
    
    // else if(this.busForm.value.tripTyp=='2' && this.busForm.value.toDate==''){
    //   this.errMsg='1'
    // }else if(this.busForm.value.tripTyp=='2' && this.busForm.value.toDate!=''){
    //   this.errMsg='0'
    //       this.router.navigate(['bus-result'],{ queryParams: {'sourceId':this.sourceId,'destinationId':this.destinationId,'journeyDate':this.journeydate,'tripType':this.busForm.value.tripTyp,'returnDate':this.returndate,'srcName':this.busForm.value.source,'destName':this.busForm.value.destination}})
    // }
  
  
    // if(this.busForm.value.tripTyp=='1'){
    //   this.returndate=this.journeydate
    //   this.service.getApiMethod(`Buses/AvailableBuses?sourceId=${this.busForm.value.source}&destinationId=${this.busForm.value.destination}&journeyDate=${this.journeydate}&tripType=${this.busForm.value.tripTyp}&userType=5&returnDate=${this.returndate}`).subscribe(res=>{
    //     console.log("getflights ====>"+JSON.stringify(res)); 
    //     if(res.ResponseStatus==200){
    //       this.router.navigate(['bus-result'],{ queryParams: {'sourceId':this.busForm.value.source,'destinationId':this.busForm.value.destination,'journeyDate':this.journeydate,'tripType':this.busForm.value.tripTyp,'returnDate':this.returndate,'srcName':this.sourceName,'destName':this.destinationName}})
    //       // this.spinner.hide();
    //       // this.busList=res.AvailableTrips;
    //       // console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
    //         }
    //    },
    //    (err)=>{
    //     // this.spinner.hide(); 
    //     // this.router.navigate(['login'])
    //     // console.log(err)
    //   });
    // }else if(this.busForm.value.tripTyp=='2' && this.busForm.value.toDate==''){
    //   this.errMsg='1'
    // }else if(this.busForm.value.tripTyp=='2' && this.busForm.value.toDate!=''){
    //   this.errMsg='0'
    //   this.service.getApiMethod(`Buses/AvailableBuses?sourceId=${this.busForm.value.source}&destinationId=${this.busForm.value.destination}&journeyDate=${this.journeydate}&tripType=${this.busForm.value.tripTyp}&userType=5&returnDate=${this.returndate}`).subscribe(res=>{
    //     console.log("getflights ====>"+JSON.stringify(res)); 
    //     if(res.ResponseStatus==200){
    //       this.router.navigate(['bus-result'],{ queryParams: {'sourceId':this.busForm.value.source,'destinationId':this.busForm.value.destination,'journeyDate':this.journeydate,'tripType':this.busForm.value.tripTyp,'returnDate':this.returndate}})
    //       // this.spinner.hide();
    //       // this.busList=res.AvailableTrips;
    //       // console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
    //         }
    //    },
    //    (err)=>{
    //     // this.spinner.hide(); 
    //     // this.router.navigate(['login'])
    //     // console.log(err)
    //   });
    // }
  
}
