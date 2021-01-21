import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { HeroService } from '../../hero.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
// import { saveAs } from 'file-saver';
// import { FileSaver }  from 'angular-file-saver';
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
  rowLayoutUpper:any=[];
  seatLayout:any=[];
  // isSelect:any=-1;
  seatObj:any={};
  data:any={};
  flag:any=1;
  onewayObj:any={};
  roundwayObj:any={};
  bustypeArr:any=[];
  BusTypArr:any=[];
  filtersection:any='1';
  mintime:any;
  maxtime:any;
  isAct:any;
  isActiveTym:any;
  isActive:any=false;
  mintimeArvl:any;
  maxtimeArvl:any;
  busOprtArr:any=[];
  BusOprArr:any=[];
  boardingPointArr:any=[];
  BuspickUpArr:any=[];
  seatArr:any=[];
  amount:any=0;
  totalAmm:any=0;
  deckType:any='lower';
  isActiveDeck:any='lower';
  index:any;
  busForm: any = FormGroup;
  busSrcList:any=[];
  busDesList:any=[];
  // errMsg:any='0';
  sourceId:any;
  destinationId:any;
  journeydate:any;
  searchFlag:any='0';
  constructor(private router: Router,private service: RestDataService,private heroservice:HeroService,private route: ActivatedRoute) {
    this.busForm = new FormGroup({
      // tripTyp:new FormControl('',[Validators.required]),
      source: new FormControl('',[Validators.required]),
      destination: new FormControl('',[Validators.required]),
      fromDate: new FormControl('',[Validators.required]),
      // toDate: new FormControl(''),
     
    
    }) 
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //  console.log(params);
       this.reqObj=params
    })
    // var date=new Date(this.reqObj.journeyDate).getFullYear() + '-' + (new Date(this.reqObj.journeyDate).getMonth() + 1) + '-' + new Date(this.reqObj.journeyDate).getDate();
    // this.jrnyDate=new Date(date).toLocaleDateString()
    this.availableBuses()
    // setTimeout(()=>{
    //     let tempArr={bustypeObj:[],bustypeJson:[]}
    //     if(this.busList.length!=0){
    //       this.busList.find((item,index)=>{
    //         if(tempArr.bustypeObj.indexOf(item.BusType)==-1){
    //           tempArr.bustypeObj.push(item.BusType)
    //           tempArr.bustypeJson.push({"bustypeName":item.BusType,"isChkd":false}) 
    //         } 
    //       })
    //       this.bustypeArr=tempArr
    //       console.log("bustypes====>"+JSON.stringify(this.bustypeArr))
    //     }
    // },10000)
   
  }
  // saveAFile(): void {
  //   const dlink: HTMLAnchorElement = document.createElement('a');
  //   dlink.download = 'myfile.txt'; // the file name
  //   const myFileContent: string = 'I am a text file! 😂';
  //   dlink.href = 'data:text/plain;charset=utf-16,' + myFileContent;
  //   dlink.click(); // this will trigger the dialog window
  //   dlink.remove();
  // }
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
  //       let a = document.createElement('a')
  //       a.href =  makeTextFile(array);
  //       a.download = 'myresponse.txt'
  //       document.body.appendChild(a)
  //       a.click()
  //       document.body.removeChild(a)
       
  //   })();
  //   }
  //   saveReqtoTextFile(temp) {
  //     (function() {
  //       var textFile = null,
  //         makeTextFile = function(text) {
  //           var data = new Blob([text], {
  //             type: 'text/plain'
  //           });
  //           if (textFile !== null) {
  //             window.URL.revokeObjectURL(textFile);
  //           }
  //           textFile = window.URL.createObjectURL(data);
  //           // console.log("saveTxt====="+textFile)
  //           return textFile;  
  //         }; 
  //         // var array=JSON.stringify(temp)
  //         // makeTextFile(array);
  //         const dlink: HTMLAnchorElement = document.createElement('a');
  //         dlink.download = 'myrequestfile.txt'; // the file name
  //         // const myFileContent: string = 'I am a text file! ';
  //         dlink.href =  makeTextFile(temp);
  //         dlink.click(); // this will trigger the dialog window
  //         dlink.remove();
  //     })();
  //     }
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
  availableBuses(){
    // this.spinner.show();
    this.service.getApiMethod(`Buses/AvailableBuses?sourceId=${this.reqObj.sourceId}&destinationId=${this.reqObj.destinationId}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
    // console.log("getbuses ====>"+JSON.stringify(res)); 
    if(res.ResponseStatus==200){
      // this.spinner.hide();
      this.busList=res.AvailableTrips;
     if(this.searchFlag=='1'){ 
      this.saveTextfileBus(`Buses/AvailableBuses?sourceId=${this.reqObj.sourceId}&destinationId=${this.reqObj.destinationId}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&userType=5&returnDate=${this.reqObj.returnDate}`)
      this.saveTextfileBus(res)
    }
      this.source=this.reqObj.srcName
      this.destination=this.reqObj.destName
      let tempArr={bustypeObj:[],bustypeJson:[]}
      if(this.busList.length!=0){
        // this.busList.find((item,index)=>{
        //   if(tempArr.bustypeObj.indexOf(item.BusType)==-1){
        //     tempArr.bustypeObj.push(item.BusType)
        //     tempArr.bustypeJson.push({"bustypeName":item.BusType,"isChkd":false}) 
        //   } 
        // })
        // this.bustypeArr=tempArr
        // console.log("bustypes====>"+JSON.stringify(this.bustypeArr))
        this.bustypeArr=[{"bustypeName":'AC Semi-Sleeper',"isChkd":false,"busTypeId":1},{"bustypeName":'AC Sleeper',"isChkd":false,"busTypeId":2},
        {"bustypeName":'Non-AC Semi-Sleeper',"isChkd":false,"busTypeId":3},{"bustypeName":'Non-AC Sleeper',"isChkd":false,"busTypeId":4}]
      }
      let oprtArr={busOprObj:[],busOprJson:[]}
      if(this.busList.length!=0){
        this.busList.find((item,index)=>{
          if(oprtArr.busOprObj.indexOf(item.Travels)==-1){
            oprtArr.busOprObj.push(item.Travels)
            oprtArr.busOprJson.push({"busOprName":item.Travels,"isChkd":false}) 
          } 
        })
        this.busOprtArr=oprtArr
        // console.log("busOpr====>"+JSON.stringify(this.busOprtArr))
      }
      let boardingArr={boardingObj:[],boardingJson:[]}
      if(this.busList.length!=0){
        this.busList.find((item,index)=>{
          item.BoardingTimes.find((tem,index)=>{
          if(boardingArr.boardingObj.indexOf(tem.Location)==-1){
            boardingArr.boardingObj.push(tem.Location)
            boardingArr.boardingJson.push({"locationName":tem.Location,"isChkd":false}) 
          } 
        })
      })
        // this.busList[0].BoardingTimes.find((item,index)=>{
        //   //     boardingArr.boardingObj.push(item.Travels)
        //       boardingArr.boardingJson.push({"locationName":item.Location,"isChkd":false}) 
         
        //   })
        this.boardingPointArr=boardingArr
        // console.log("busOpr====>"+JSON.stringify(this.busOprtArr))
      
      // console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
        }
   }
   (err)=>{
    // this.spinner.hide(); 
    // this.router.navigate(['login'])
    // console.log(err)
    }
  });
  }
  // returnBus(){
  //   this.service.getApiMethod(`Buses/AvailableBuses?sourceId=${this.reqObj.destinationId}&destinationId=${this.reqObj.sourceId}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&userType=5&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
  //     // console.log("getflights ====>"+JSON.stringify(res)); 
  //     if(res.ResponseStatus==200){
  //       // this.spinner.hide();
  //       this.busList=res.AvailableTrips;
  //       this.source=this.reqObj.destName
  //       this.destination=this.reqObj.srcName
  //       this.flag=2
  //       // console.log("listOfFlight=====>"+JSON.stringify(this.flightList)) 
  //         }
  //    },
  //    (err)=>{
  //     // this.spinner.hide(); 
  //     // this.router.navigate(['login'])
  //     // console.log(err)
  //   });
  // }
  searchAgain(){
   this.searchFlag='1'
    this.journeydate = new Date(this.busForm.value.fromDate).getDate() + '-' + (new Date(this.busForm.value.fromDate).getMonth() + 1) + '-' + new Date(this.busForm.value.fromDate).getFullYear();
this.reqObj={"sourceId":this.sourceId,"destinationId":this.destinationId,"journeyDate":this.journeydate,"tripType":'1',"returnDate":this.journeydate,'srcName':this.busForm.value.source,'destName':this.busForm.value.destination}
  this.availableBuses()
console.log("search again===="+JSON.stringify(this.reqObj))
}
  selectSeat(val,obj){
      this.actionType=val;
      this.busObj=obj
    
      // console.log("busObj ====>"+JSON.stringify(this.busObj)); 
      this.service.getApiMethod(`Buses/TripDetails?tripId=${this.busObj.Id}&sourceId=${this.busObj.SourceId}&destinationId=${this.busObj.DestinationId}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&userType=5&provider=${this.busObj.Provider}&travelOPerator=${this.busObj.Travels}&user=''&returnDate=${this.reqObj.returnDate}`).subscribe(res=>{
       
        if(res.ResponseStatus==200){
          // this.spinner.hide();
          this.saveTextfileBus(`Buses/TripDetails?tripId=${this.busObj.Id}&sourceId=${this.busObj.SourceId}&destinationId=${this.busObj.DestinationId}&journeyDate=${this.reqObj.journeyDate}&tripType=${this.reqObj.tripType}&userType=5&provider=${this.busObj.Provider}&travelOPerator=${this.busObj.Travels}&user=''&returnDate=${this.reqObj.returnDate}`)
          this.saveTextfileBus(res)
          this.seatLayout=res.Seats;
          let lowerDeck=[];
          let upperdeck=[];
         for(let a=0; a<this.seatLayout.length; a++){
         if(this.seatLayout[a].Zindex==0){
          lowerDeck.push(this.seatLayout[a])
         }else if(this.seatLayout[a].Zindex==1)
         upperdeck.push(this.seatLayout[a])
         }
          this.rowLayout=[]
          for(let i=1; i<=lowerDeck[lowerDeck.length-1].Row; i++){
            this.rowLayout.push({'Row':i,'Seats':[]})
          }
          // console.log("row===>"+JSON.stringify(this.rowLayout))
         
            for(let k=0;k<this.rowLayout.length;k++){
              for(let j=0;j<lowerDeck.length;j++){
              if(this.rowLayout[k].Row==lowerDeck[j].Row){
                if(k==0){
                  this.rowLayout[k].Seats.push(lowerDeck[j])
                }else if(this.rowLayout[k-1].Seats.length==1){
                  // alert(this.rowLayout[k-1].Seats[0].Column-1)
                  let col= this.rowLayout[k-1].Seats[0].Column-1
                  for(let l=0;l<col;l++){
                
                    this.rowLayout[k-1].Seats.splice(l,0,{})
                  }
                  this.rowLayout[k].Seats.push(lowerDeck[j])
                }else{
                  this.rowLayout[k].Seats.push(lowerDeck[j])
                }
           
          }
        } 
          }  
         
        
//  console.log("seatssssss=====>"+JSON.stringify(this.rowLayout))

 if(upperdeck.length!=0){
   this.rowLayoutUpper=[]
 for(let i=1; i<=upperdeck[upperdeck.length-1].Row; i++){
   this.rowLayoutUpper.push({'Row':i,'Seats':[]})
 }
 // console.log("row===>"+JSON.stringify(this.rowLayoutUpper))

   for(let k=0;k<this.rowLayoutUpper.length;k++){
     for(let j=0;j<upperdeck.length;j++){
     if(this.rowLayoutUpper[k].Row==upperdeck[j].Row){
      if(k==0){
        this.rowLayoutUpper[k].Seats.push(upperdeck[j])
      }else if(this.rowLayoutUpper[k-1].Seats.length==1){
        // alert(this.rowLayout[k-1].Seats[0].Column-1)
        let col= this.rowLayoutUpper[k-1].Seats[0].Column-1
        for(let l=0;l<col;l++){
      
          this.rowLayoutUpper[k-1].Seats.splice(l,0,{})
        }
        this.rowLayoutUpper[k].Seats.push(upperdeck[j])
      }else{
        this.rowLayoutUpper[k].Seats.push(upperdeck[j])
      }
  //  this.rowLayoutUpper[k].Seats.push(upperdeck[j])
 }
} 
 }   }  
// console.log("seatssssssUppr=====>"+JSON.stringify(this.rowLayoutUpper))
            }
       },
     
       (err)=>{
        // this.spinner.hide(); 
        // this.router.navigate(['login'])
        // console.log(err)
      });
      this.seatArr=[] 
      this.totalAmm=0
      this.deckType='lower'
      this.isActiveDeck='lower'
  }
  chngedeck(val){
    this.deckType=val
    this.isActiveDeck=val
  }
  showBDpoints(val,obj){
    this.action=val;
    this.busObj=obj 
  }
timeConvert(val){
    var minutes = val%60
    var hours = (val - minutes) / 60
    var boardingTym=hours+":"+minutes
    return boardingTym
    console.log(boardingTym)
   }
  selectYourSeat(val,obj){
    // alert("active====="+obj.isActive)
    // alert("ladieseat====="+obj.IsLadiesSeat)
    // this.isSelect=val
    this.seatObj=obj
    var flag=0
    if(this.seatArr.length!=0 && this.seatArr.length<6){
      this.seatArr.find((item,index)=>{
        if(item.Number==this.seatObj.Number){
         flag=1
        } 
      })
      if(flag==0){
        this.seatArr.push(this.seatObj)
        this.amount=this.amount+parseInt(this.seatObj.Fare)
        this.totalAmm=this.amount.toLocaleString('en-IN')
      
      }
      if(obj.isActive==true){
        obj.isActive=false
        for(let i=0;i<this.seatArr.length;i++){
          if (this.seatArr[i].Number == this.seatObj.Number) {
          this.seatArr.splice(i,1);
        }}
        this.amount=this.amount-parseInt(this.seatObj.Fare)
        this.totalAmm=this.amount.toLocaleString('en-IN')
        console.log("spliced===="+JSON.stringify(this.seatArr))
      }else if(obj.isActive==undefined || obj.isActive==false){
        obj.isActive=true
      }
    }else if(this.seatArr.length==0){
      this.seatArr.push(this.seatObj) 
      this.amount=this.amount+parseInt(this.seatObj.Fare)
      this.totalAmm=this.amount.toLocaleString('en-IN')
      console.log("pushed===="+JSON.stringify(this.seatArr))
        obj.isActive=true
    }else{
      if(obj.isActive==true){
        obj.isActive=false
        for(let i=0;i<this.seatArr.length;i++){
          if (this.seatArr[i].Number == this.seatObj.Number) {
          this.seatArr.splice(i,1);
        }}
        this.amount=this.amount-parseInt(this.seatObj.Fare)
        this.totalAmm=this.amount.toLocaleString('en-IN')
        console.log("spliced===="+JSON.stringify(this.seatArr))
      }
    }
  

    // localStorage.setItem("seatSelected", JSON.stringify(this.seatArr))
    // alert("availableSeat"+this.seatObj.IsAvailableSeat)
    // alert("ladySeat"+this.seatObj.IsLadiesSeat)
    // alert(this.seatObj.IsLadiesSeat)
    // alert("seat selected")
    // alert("seat====="+JSON.stringify(this.seatObj))
  }
  blockSeat(){
    // alert("b_ID"+this.data.boardingdId)
    // alert("d_ID"+this.data.dropingId)
    let searchId=Math.floor(Math.random() * 1000000);
    localStorage.setItem("searchId",searchId.toString())
    if(this.reqObj.tripType=='1'){
      localStorage.setItem("saveBusObj", JSON.stringify(this.busObj))
      localStorage.setItem("seatSelected", JSON.stringify(this.seatArr))
    //   this.onewayObj={"BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],
    //   "BoardingPointDetails": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],
    //   "BusTypeName":this.busObj.BusType,"CancellationPolicy":this.busObj.CancellationPolicy,
    //   "ConvenienceFee": this.busObj.ConvenienceFee,
    //   "DepartureTime": this.busObj.DepartureTime,
    //   "DestinationId": this.busObj.DestinationId,
    //   "DestinationName": this.destination,
    //   "DisplayName":this.busObj.DisplayName, "Operator": this.busObj.Travels,
    //   "PartialCancellationAllowed": this.busObj.PartialCancellationAllowed,
    //   "DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2],"JourneyDate":this.reqObj.journeyDate,
    //   "DroppingPointDetails":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],"Fares": this.seatObj.Fare,
    //   "Provider": this.busObj.Provider,
    //   "ReturnDate":this.reqObj.returnDate,
    //   "Seatcodes":  this.seatObj.SeatCode,
    //   "SeatNos": this.seatObj.Number,
    //   "ServiceCharge":this.seatObj.OperatorServiceCharge,
    //   "Servicetax": this.seatObj.Servicetax,
    //   "SourceId":this.busObj.SourceId,
    //   "SourceName": this.source,"TripId": this.busObj.Id,
    //   "TripType": this.reqObj.tripType,
    // }
    // console.log("oneway====>"+JSON.stringify(this.onewayObj))
    // localStorage.setItem('onewayObject', JSON.stringify(this.onewayObj));
      this.router.navigate(['bus-details'],{ queryParams: {'DisplayName':this.busObj.DisplayName,'SeatType':this.busObj.SeatType,'source':this.source,'destination':this.destination,'Journeydate':this.busObj.Journeydate,'Duration':this.busObj.Duration,'boardingPoint':this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],'boardingTime':this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-3],'dropingPoint':this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],'dropingTime':this.data.dropingId.split('~')[this.data.dropingId.split('~').length-3],'DepartureTime':this.busObj.DepartureTime,'ArrivalTime':this.busObj.ArrivalTime,'tripType':this.reqObj.tripType,'noOfSeats':this.seatArr.length,"BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],"DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2]}})
    }
    // else if(this.reqObj.tripType=='2' && this.flag==1){
    //   localStorage.setItem("saveBusObj", JSON.stringify(this.busObj))
    //   localStorage.setItem("seatSelected", JSON.stringify(this.seatArr))
    //   this.onewayObj={"BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],"BoardingPointDetails": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],"BusTypeName":this.busObj.BusType,"CancellationPolicy":this.busObj.CancellationPolicy,
    //   "ConvenienceFee": this.busObj.ConvenienceFee,
    //   "DepartureTime": this.busObj.DepartureTime,
    //   "DestinationId": this.busObj.DestinationId,
    //   "DestinationName": this.destination,
    //   "DisplayName":this.busObj.DisplayName, "Operator": this.busObj.Travels,
    //   "PartialCancellationAllowed": this.busObj.PartialCancellationAllowed,
    //   "DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2],"JourneyDate":this.reqObj.journeyDate,
    //   "DroppingPointDetails":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],"Fares": this.seatObj.Fare,
    //   "Provider": this.busObj.Provider,
    // "ReturnDate":this.reqObj.returnDate,
    // "Seatcodes":  this.seatObj.SeatCode,
    // "SeatNos": this.seatObj.Number,
    // "ServiceCharge":this.seatObj.OperatorServiceCharge,
    // "Servicetax": this.seatObj.Servicetax,
    // "SourceId":this.busObj.SourceId,
    // "SourceName": this.source,"TripId": this.busObj.Id,
    // "TripType": this.reqObj.tripType,
    // }
    // console.log("oneway====>"+JSON.stringify(this.onewayObj))
    // localStorage.setItem('onewayObject', JSON.stringify(this.onewayObj));
    // this.actionType=-1;
    //     this.returnBus()  
    // }else if(this.reqObj.tripType=='2' && this.flag==2){
    //   localStorage.setItem("saveRetBusObj", JSON.stringify(this.busObj)) 
    //   localStorage.setItem("seatSelectedReturn", JSON.stringify(this.seatArr))
    //   this.roundwayObj={"BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],"BoardingPointDetails": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],"BusTypeName":this.busObj.BusType,"CancellationPolicy":this.busObj.CancellationPolicy,
    //   "ConvenienceFee": this.busObj.ConvenienceFee,
    //   "DepartureTime": this.busObj.DepartureTime,
    //   "DestinationId": this.busObj.DestinationId,
    //   "DestinationName": this.destination,
    //   "DisplayName":this.busObj.DisplayName, "Operator": this.busObj.Travels,
    //   "PartialCancellationAllowed": this.busObj.PartialCancellationAllowed,
    //   "DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2],"JourneyDate":this.reqObj.journeyDate,
    //   "DroppingPointDetails":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],"Fares": this.seatObj.Fare,
    //   "Provider": this.busObj.Provider,
    // "ReturnDate":this.reqObj.returnDate,
    // "Seatcodes":  this.seatObj.SeatCode,
    // "SeatNos": this.seatObj.Number,
    // "ServiceCharge":this.seatObj.OperatorServiceCharge,
    // "Servicetax": this.seatObj.Servicetax,
    // "SourceId":this.busObj.SourceId,
    // "SourceName": this.source,"TripId": this.busObj.Id,
    // "TripType": this.reqObj.tripType,
    // }
    // console.log("roundway====>"+JSON.stringify(this.roundwayObj))
    // localStorage.setItem('roundwayObject', JSON.stringify(this.roundwayObj));
  //     this.router.navigate(['bus-details'],{ queryParams: {'DisplayName':this.busObj.DisplayName,'BusType':this.busObj.BusType,'source':this.source,'destination':this.destination,'Journeydate':this.busObj.Journeydate,'Duration':this.busObj.Duration,'boardingPoint':this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-1],'boardingTime':this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-3],'dropingPoint':this.data.dropingId.split('~')[this.data.dropingId.split('~').length-1],'dropingTime':this.data.dropingId.split('~')[this.data.dropingId.split('~').length-3],'DepartureTime':this.busObj.DepartureTime,'ArrivalTime':this.busObj.ArrivalTime,'tripType':this.reqObj.tripType,'noOfSeats':this.seatArr.length,"BoardingId": this.data.boardingdId.split('~')[this.data.boardingdId.split('~').length-2],"DroppingId":this.data.dropingId.split('~')[this.data.dropingId.split('~').length-2]}}) 
  // }
  }
  checkBusType(val){
    // alert(JSON.stringify(val))
    if(this.BusTypArr.indexOf(val.busTypeId)==-1){
      this.BusTypArr.push(val.busTypeId)
    }
  }
  checkBusOpr(val){
    // alert(JSON.stringify(val))
    if(this.BusOprArr.indexOf(val.busOprName)==-1){
      this.BusOprArr.push(val.busOprName)
    }
  }
  checkBoarding(val){
    // alert(JSON.stringify(val))
    if(this.BuspickUpArr.indexOf(val.locationName)==-1){
      this.BuspickUpArr.push(val.locationName)
    }
  }
  selectTime(val,tem){
    this.mintime=val
    this.maxtime=tem
    this.isAct=val
  }
  selectarrTime(val,tem){
    this.mintimeArvl=val
    this.maxtimeArvl=tem
    this.isActiveTym=val
 
   
  }
closeFilter(val){
    this.filtersection=val
      }
clearFilter(){
        // this.stop=''
        this.mintime=''
        this.maxtime=''
        // this.price=''
        this.isAct=''
        this.isActiveTym=''
        this.BusTypArr=[]
        this.BusOprArr=[]
        this.BuspickUpArr=[]
        this.filtersection='1'
        this.availableBuses()
      }
filter(){
        // this.availableBuses()
        // setTimeout(()=>{
          let tempData=[]
          if(this.BusTypArr.length!=0){
            let busArr=[]
            if(tempData.length==0){
                this.busList.find((item,index)=>{
                  this.BusTypArr.find((temp,ind) =>{
                    // alert(temp)
                      if(item.SeatType==temp){
                        busArr.push(item)
                       }
                    })
                })
                tempData=busArr
                // this.busList=tempData
              }else{
                tempData.find((item,index)=>{
                  this.BusTypArr.find((temp,ind) =>{
                    // alert(temp)
                    if(item.SeatType==temp){
                      busArr.push(item)
                     }
                  })
                })
                tempData=busArr
                // this.busList=tempData
              }
              // this.flightList=tempData
              console.log("filterbustype=====>"+JSON.stringify(tempData))
          }
          if(this.BusOprArr.length!=0){
            let busArr=[]
            if(tempData.length==0){
                this.busList.find((item,index)=>{
                  this.BusOprArr.find((temp,ind) =>{
                    // alert(temp)
                      if(item.Travels==temp){
                        busArr.push(item)
                       }
                    })
                })
                tempData=busArr
                // this.busList=tempData
              }else{
                tempData.find((item,index)=>{
                  this.BusOprArr.find((temp,ind) =>{
                    // alert(temp)
                    if(item.Travels==temp){
                      busArr.push(item)
                     }
                  })
                })
                tempData=busArr
                // this.busList=tempData
              }
              // this.flightList=tempData
              console.log("filteroperator=====>"+JSON.stringify(tempData))
          }
          if(this.BuspickUpArr.length!=0){
            let busArr=[]
            if(tempData.length==0){
                this.busList.find((item,index)=>{
                  item.BoardingTimes.find((tem,index)=>{
                  this.BuspickUpArr.find((temp,ind) =>{
                    // alert(temp)
                      if(tem.Location==temp){
                        busArr.push(item)
                       }
                    })
                  })
                })
                tempData=busArr
                // this.busList=tempData
              }else{
                tempData.find((item,index)=>{
                  item.BoardingTimes.find((tem,index)=>{
                  this.BuspickUpArr.find((temp,ind) =>{
                    // alert(temp)
                    if(tem.Location==temp){
                      busArr.push(item)
                     }
                  })
                })
                })
                tempData=busArr
                // this.busList=tempData
              }
              // this.flightList=tempData
              console.log("filterboardingPoint=====>"+JSON.stringify(tempData))
          }
        if(this.mintime!=undefined && this.maxtime!=undefined){
          let busArr=[]
          // alert(this.mintime)
          // alert(this.maxtime)
          if(tempData.length==0){
            this.busList.find((item,index)=>{
              var time = item.DepartureTime
              var hrs = Number(time.match(/^(\d+)/)[1]);
              var mnts = Number(time.match(/:(\d+)/)[1]);
              var format = time.match(/\s(.*)$/)[1];
              if (format == "PM" && hrs < 12){
                hrs = hrs + 12;
              } 
              else if (format == "AM" && hrs == 12){
                hrs = hrs - 12;
              }
              var hours = hrs.toString();
              var minutes = mnts.toString();
              if (hrs < 10){
                hours = "0" + hours;
              }
              else if (mnts < 10){
                minutes = "0" + minutes;
              } 
              // alert(hours + ":" + minutes);
              let flyTime=hours + ":" + minutes
              if(flyTime>=this.mintime && flyTime<=this.maxtime){
                busArr.push(item)
              }
            })
            tempData=busArr
          }else{
            tempData.find((item,index)=>{
              var time = item.DepartureTime
              var hrs = Number(time.match(/^(\d+)/)[1]);
              var mnts = Number(time.match(/:(\d+)/)[1]);
              var format = time.match(/\s(.*)$/)[1];
              if (format == "PM" && hrs < 12){
                hrs = hrs + 12;
              } 
              else if (format == "AM" && hrs == 12){
                hrs = hrs - 12;
              }
              var hours = hrs.toString();
              var minutes = mnts.toString();
              if (hrs < 10){
                hours = "0" + hours;
              }
              else if (mnts < 10){
                minutes = "0" + minutes;
              } 
              // alert(hours + ":" + minutes);
              let flyTime=hours + ":" + minutes
              if(flyTime>=this.mintime && flyTime<=this.maxtime){
                busArr.push(item)
              }
            })
            tempData=busArr
          }
          console.log("filterdeparturetym=====>"+JSON.stringify(tempData))
        }
        if(this.mintimeArvl!=undefined && this.maxtimeArvl!=undefined){
          let busArr=[]
          // alert(this.mintimeArvl)
          // alert(this.maxtimeArvl)
          if(tempData.length==0){
            this.busList.find((item,index)=>{
              var time = item.ArrivalTime
              var hrs = Number(time.match(/^(\d+)/)[1]);
              var mnts = Number(time.match(/:(\d+)/)[1]);
              var format = time.match(/\s(.*)$/)[1];
              if (format == "PM" && hrs < 12){
                hrs = hrs + 12;
              } 
              else if (format == "AM" && hrs == 12){
                hrs = hrs - 12;
              }
              var hours = hrs.toString();
              var minutes = mnts.toString();
              if (hrs < 10){
                hours = "0" + hours;
              }
              else if (mnts < 10){
                minutes = "0" + minutes;
              } 
              // alert(hours + ":" + minutes);
              let flyTime=hours + ":" + minutes
              if(flyTime>=this.mintimeArvl && flyTime<=this.maxtimeArvl){
                busArr.push(item)
              }
            })
            tempData=busArr
          }else{
            tempData.find((item,index)=>{
              var time = item.ArrivalTime
              var hrs = Number(time.match(/^(\d+)/)[1]);
              var mnts = Number(time.match(/:(\d+)/)[1]);
              var format = time.match(/\s(.*)$/)[1];
              if (format == "PM" && hrs < 12){
                hrs = hrs + 12;
              } 
              else if (format == "AM" && hrs == 12){
                hrs = hrs - 12;
              }
              var hours = hrs.toString();
              var minutes = mnts.toString();
              if (hrs < 10){
                hours = "0" + hours;
              }
              else if (mnts < 10){
                minutes = "0" + minutes;
              } 
              // alert(hours + ":" + minutes);
              let flyTime=hours + ":" + minutes
              if(flyTime>=this.mintimeArvl && flyTime<=this.maxtimeArvl){
                busArr.push(item)
              }
            })
            tempData=busArr
          }
          console.log("filterarrivaltym=====>"+JSON.stringify(tempData))
        }
     
        this.busList=tempData
        console.log("filterfinal=====>"+JSON.stringify(this.busList))
        //  },3000)
         this.filtersection='1'
      }
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
