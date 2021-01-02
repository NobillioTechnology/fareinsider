import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IpServiceService } from '../../ip-service.service';
// import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';
@Component({
  selector: 'app-bus-payment',
  templateUrl: './bus-payment.component.html',
  styleUrls: ['./bus-payment.component.css']
})
export class BusPaymentComponent implements OnInit {
  reqObj:any={};
  userDetail:any={};
  searchId:any="";
  extraCharge:any;
  ipAddress:any;
  totalAmount: any;
  orderAmount:any;
  intData:any={};
  constructor(private router: Router,private route: ActivatedRoute,private ip:IpServiceService,private service: RestDataService) { }

  ngOnInit(): void {
    this.getIP()
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    this.searchId = localStorage.getItem("searchId")
    this.route.queryParams.subscribe(params => {
      //  console.log(params);
       this.reqObj=params
       this.orderAmount=parseInt(this.reqObj.baseFare)+parseInt(this.reqObj.tax)
    })
    this.getExtraCharge('CC')
  }
  getIP(){
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    });
  }
  getExtraCharge(mode){
    this.service.testGetApiMethod(`Booking/GetPGCharges?agentCode=${this.userDetail.Acode}&totalAmount=${this.orderAmount}&PaxNo=2&paymode=${mode}&SaleChannel=DO-B2C&product=Bus&CID=1&branchcode=ETL-1`).subscribe(res=>{
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
  updateCriteria_1(mode){
    let dataInfo= {
    "searchID":this.searchId,
    "ParentCode":this.userDetail.PartnerCode,
    "payMode":mode,
    "ConvAmt":this.extraCharge,
    "TotalPaidAmt":this.orderAmount+this.extraCharge,
    "TotalAmt":this.orderAmount,
    "PaidAmt":this.orderAmount+this.extraCharge,
    "NetCharges":this.extraCharge,
    "PgCharges":this.extraCharge,
    "TotalCharges":this.extraCharge,
    "ClientCode":this.userDetail.UserCode,
    "trackid":this.searchId,
    "IP":this.ipAddress,
    "AgentCode":this.userDetail.Acode
}
  this.service.testPostApiMethod(dataInfo,"Booking/UpdateBusSearchCriteria").subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
     if(res.Status==true){
     }
    },
    (err)=>{
   }); 
  }
creditCard(val){
    this.getExtraCharge(val)
    if(this.intData.cardNo!=undefined && this.intData.holderName!=undefined && this.intData.month!=undefined && this.intData.year!=undefined && this.intData.cvv!=undefined){
      window.location.replace(`https://secure.fareinsider.com/bus/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customeremail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=BusBooking&paymenttype=card&cardnum=${this.intData.cardNo}&cardcvv=${this.intData.cvv}&cardmonth=${this.intData.month}&cardyear=${this.intData.year}&cardholdername=${this.intData.holderName}`); 
    }
  }
payCard(val){
    this.getExtraCharge(val)
    if(this.intData.cardNo!=undefined && this.intData.holderName!=undefined && this.intData.month!=undefined && this.intData.year!=undefined && this.intData.cvv!=undefined){
      window.location.replace(`https://secure.fareinsider.com/bus/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customeremail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=BusBooking&paymenttype=card&cardnum=${this.intData.cardNo}&cardcvv=${this.intData.cvv}&cardmonth=${this.intData.month}&cardyear=${this.intData.year}&cardholdername=${this.intData.holderName}`);
    }
  }
  payNetBank(val){
    this.getExtraCharge(val)
    if(this.intData.bank!=undefined){
      window.location.replace(`https://secure.fareinsider.com/bus/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customerEmail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=BusBooking&paymenttype=net banking&bankcode=" + bankcode + "`);
    }
  }
  payNetWallet(val){
    this.getExtraCharge(val)
    if(this.intData.walletCode!=undefined){
      window.location.replace(`https://secure.fareinsider.com/bus/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customerEmail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=BusBooking&paymenttype=net wallet&walletcode=${this.intData.walletCode}`);
    }
  }
  payNetUpi(val){
    this.getExtraCharge(val)
    if(this.intData.upicode!=undefined){
      window.location.replace(`https://secure.fareinsider.com/bus/Default.aspx?orderId=${this.searchId}&orderAmount=${parseInt(this.orderAmount)+this.extraCharge}&customerName=${this.userDetail.UserName}&customerEmail=${this.userDetail.UserEMailD}&customerPhone=${this.userDetail.Mobile}&orderNote=BusBooking&paymenttype=upi&upivpa=${this.intData.upicode}`);
    }
  }
}

