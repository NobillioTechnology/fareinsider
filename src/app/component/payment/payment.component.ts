import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
import { ActivatedRoute } from '@angular/router';
import { IpServiceService } from '../../ip-service.service';
// import { timeStamp } from 'console';
// var CashFree as CashFree;
let CashFree: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  orderId:any;
  saveFlyOne:any={};
  saveFlyRound:any={};
  userDetail:any={};
  intData:any={};
  token:any;
  reqObj:any;
  comission:any =0;
  comissionType:any="";
  orderAmount:any;
  searchId:any="";
  extraCharge:any;
  ipAddress:any;
  totalAmount: any;
  agentCode:any;
  salechanl:any;
  constructor(private router: Router,private service: RestDataService,private route: ActivatedRoute,private ip:IpServiceService) {

   }

  ngOnInit(): void {
    this.getIP()
    this.orderId=Math.floor(Math.random() * 1000000);
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    if(this.userDetail){
      // this.isLogin=2
      this.agentCode=this.userDetail.Acode
    
      if(this.userDetail.UserType=="Agent"){
        this.salechanl='SA-B2B'
      }
    }else{
      this.agentCode='FAREIN0001'
      this.salechanl='DO-B2B2C'
    }
  
    
    console.log('details from payment=====>', this.userDetail);
  this.saveFlyOne=JSON.parse(localStorage.getItem('saveFlyt'));
  this.saveFlyRound=JSON.parse(localStorage.getItem('saveRetFlyt'));
  this.searchId = localStorage.getItem("searchId")
  this.getToken()
  this.route.queryParams.subscribe(params => {
    this.reqObj=params
  })
  this.salesRule()
  this.orderAmount=parseInt(localStorage.getItem("orderAount"))
  this.getExtraCharge('CC')
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
      netPrice = val+ (val*this.comission)/100
    } else {
      netPrice =  val+this.comission
    }
   return netPrice
  }
  getExtraCharge(mode){
    this.service.testGetApiMethod(`Booking/GetPGCharges?agentCode=${this.userDetail.Acode}&totalAmount=${this.orderAmount}&PaxNo=2&paymode=${mode}&SaleChannel=DO-B2C&product=Flights&CID=1&branchcode=ETL-1`).subscribe(res=>{
      console.log("extra_charges========>"+JSON.stringify(res))
      if(res.Status==true){
      this.extraCharge=res.Data.PayChage
      this.totalAmount = parseInt(this.orderAmount)+this.extraCharge
      this.updateCriteria_1(mode)
      // this.router.navigate(['oneway'])
      // this.spinner.hide();
    }
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
  updateCriteria_1(mode){
    
    let dataInfo= {
      "searchID" :this.searchId,
      "ParentCode":this.userDetail.PartnerCode,
    "payMode":mode,
    "ConvAmt":this.extraCharge,
    "TotalPaidAmt":parseInt(this.orderAmount)+this.extraCharge,
    "TotalAmt":this.orderAmount,
    "PaidAmt":parseInt(this.orderAmount)+this.extraCharge,
    "NetCharges":this.extraCharge,
    "PgCharges":this.extraCharge,
    "TotalCharges":this.extraCharge,
    "ClientCode":this.userDetail.UserCode,
    "trackid":this.saveFlyOne.flytId,
    "IP":this.ipAddress,
    "AgentCode":this.userDetail.Acode
}
  this.service.testPostApiMethod(dataInfo,"Booking/UpdateSearchCriteria").subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
     if(res.Status==true){
     }
    },
    (err)=>{
   }); 
  }
  getToken(){
    this.service.testGetApiMethod(`comman/GetHash?orderId=${this.orderId}&orderAmount=122&customerEmail=${this.userDetail.UserEMailD}&customerPhone=9210394369}`).subscribe(res=>{
    if(res.Status==true){
      this.token=res.Data
      // this.router.navigate(['oneway'])
      // this.spinner.hide();
    }
   },
   (err)=>{
    // this.spinner.hide(); 
    // this.router.navigate(['login'])
    // console.log(err)
  });
  
  }
creditCard(val){
  this.getExtraCharge(val)
  if(this.intData.cardNo!=undefined && this.intData.holderName!=undefined && this.intData.month!=undefined && this.intData.year!=undefined && this.intData.cvv!=undefined){
    window.location.replace(`https://secure.fareinsider.com/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customeremail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=Flight Booking&paymenttype=card&cardnum=${this.intData.cardNo}&cardcvv=${this.intData.cvv}&cardmonth=${this.intData.month}&cardyear=${this.intData.year}&cardholdername=${this.intData.holderName}`); 
  }
}
payCard(val) {
  this.getExtraCharge(val)
  if(this.intData.cardNo!=undefined && this.intData.holderName!=undefined && this.intData.month!=undefined && this.intData.year!=undefined && this.intData.cvv!=undefined){
    window.location.replace(`https://secure.fareinsider.com/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customeremail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=Flight Booking&paymenttype=card&cardnum=${this.intData.cardNo}&cardcvv=${this.intData.cvv}&cardmonth=${this.intData.month}&cardyear=${this.intData.year}&cardholdername=${this.intData.holderName}`);
  }
}
payNetBank(val){
  this.getExtraCharge(val)
  if(this.intData.bank!=undefined){
    window.location.replace(`https://secure.fareinsider.com/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customerEmail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=Flight Booking&paymenttype=net banking&bankcode=" + bankcode + "`);
  }
}
payNetWallet(val){
  this.getExtraCharge(val)
  if(this.intData.walletCode!=undefined){
    window.location.replace(`https://secure.fareinsider.com/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customerEmail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=Flight Booking&paymenttype=net wallet&walletcode=${this.intData.walletCode}`);
  }
}
payNetUpi(val){
  this.getExtraCharge(val)
  if(this.intData.upicode!=undefined){
    window.location.replace(`https://secure.fareinsider.com/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customerEmail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=Flight Booking&paymenttype=upi&upivpa=${this.intData.upicode}`);
  }
}
}
