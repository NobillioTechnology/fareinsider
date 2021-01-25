import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RestDataService } from '../../rest-data.service';
import { IpServiceService } from '../../ip-service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent implements OnInit {
  myForm:any=FormGroup;
  logInForm:any=FormGroup;
  ipAddress:string;
  tabType:any='signIn';
  isActive:any='signIn';
  data:any={};
  tabtype:any='register';
  actionType:any='signin';
  action:any='open';
  countryList:any=[];
  stateList:any=[];
  cityList:any=[];
  constructor(private service: RestDataService,private ip:IpServiceService,private router: Router) {
    this.myForm = new FormGroup({
      fName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      add1: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{10}")]),
      weburl: new FormControl('',[Validators.required]),
      contactperson: new FormControl('',[Validators.required]),
      remark: new FormControl('',[Validators.required]),
      checkfield1: new FormControl('',[Validators.required]),
      checkfield2: new FormControl(''),
    })
    this.logInForm = new FormGroup({
      emailId: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      password: new FormControl('',[Validators.required]), 
    }) 
   }
   //Validators.pattern("([a-zA-Z0-9@#$%&?*]).{6,10}$")

  ngOnInit(): void {
    this.getIP();
    this.selectCountry()
  }
  getIP()
  {
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    });
  }
  // tab(val){
  //   this.tabType=val
  //   this.isActive=val
  // }
  newReg(){
    this.action='close'
  }
  sendOtp(){
    this.service.testGetApiMethod("/comman/GetOtp?MobileNo="+this.data.contact).subscribe(res=>{
    // console.log("GetSalesRule ====>"+JSON.stringify(res)); 
    if(res.Status==true){
      this.tabtype='enterotp'
      // this.signUp()
      // alert("successfull")
      
    // this.comissionType= res.Data.commType
    //   this.comission= parseInt(res.Data.commMarkup)
        }
   },
   (err)=>{
    
  });
    }
verify(){
      this.service.testGetApiMethod("/comman/verifyOtp?MobileNo="+this.data.contact+"&Otp="+this.data.otp).subscribe(res=>{
        // console.log("GetSalesRule ====>"+JSON.stringify(res)); 
        if(res.Status==true){
         this.actionType='signup'
          // localStorage.setItem("userData",JSON.stringify({UserID:"123213uyiy"}))
          // alert("successfull")
        // this.comissionType= res.Data.commType
        //   this.comission= parseInt(res.Data.commMarkup)
            }
       },
       (err)=>{
        
      });
}
resend(){
  // alert("ok")
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
selectCountry(){
  this.service.testGetApiMethod(`comman/Country`).subscribe(res=>{
  // console.log("getairport ====>"+JSON.stringify(res)); 
  if(res.Status==true){
    this.countryList=res.Data;
    this.selectState(this.myForm.value.country)
    // console.log("getCountry ====>"+JSON.stringify(this.countryList)); 
  }
 },
 (err)=>{
});
// }
}
selectState(country){
  this.service.testGetApiMethod("comman/state?Country="+country).subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
    if(res.Status==true){
      this.stateList=res.Data;
      this.selectCity(this.myForm.value.state)
      // console.log("getCountry ====>"+JSON.stringify(this.countryList)); 
    }
   },
   (err)=>{
  });
}
selectCity(state){
  this.service.testGetApiMethod("comman/City?State="+state).subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
    if(res.Status==true){
      this.cityList=res.Data;
      // console.log("getCountry ====>"+JSON.stringify(this.countryList)); 
    }
   },
   (err)=>{
  });
}
signup(){
    let dataInfo={
      "AgencyName":this.myForm.value.fName,
      "AgencyEMailID":this.myForm.value.email,
      "Add1":this.myForm.value.add1,
      "Country":this.myForm.value.country,
      "State":this.myForm.value.state,
      "City":this.myForm.value.city,
      "Mobile":this.myForm.value.mobile,
      "WebUrl":this.myForm.value.weburl,
      "ContactPerson":this.myForm.value.contactperson,
      "Remark":this.myForm.value.remark,
      "IP":this.ipAddress
    }

    console.log('Data from sign up=======>', dataInfo);

    this.service.testPostApiMethod(dataInfo,"Agent/AgentRegistration").subscribe(res=>{
      console.log("sign up agent ====>"+JSON.stringify(res)); 
       if(res.Status==true){
          // this.tabType='signIn'
          // this.isActive='signIn'
          // localStorage.setItem('userData', JSON.stringify(res.Data));
          setTimeout(()=>{
            window.location.reload()
           },1000)
         // this.spinner.hide();
        //  if(res.Data!=null){
        //  this.airportSrcList=res.Data;
        //  } 
       }
      },
      (err)=>{
       // this.spinner.hide(); 
       // this.router.navigate(['login'])
       console.log(err)
     }); 
  }
  logIn(){
    this.service.testGetApiMethod(`Agent/AgentLogin?email=${this.logInForm.value.emailId}&password=${this.logInForm.value.password}`).subscribe(res=>{
      // console.log("getairport ====>"+JSON.stringify(res)); 
       if(res.Status==true){
        //  localStorage.setItem("userId",res.Data.UserID)
        console.log(JSON.stringify(res));
         localStorage.setItem('userData', JSON.stringify(res.Data));
        //  window.history.back()
        this.action='close'
        this.router.navigate(['index'])
         setTimeout(()=>{
          window.location.reload()
         },1000)
        
        //  this.router.navigate(['window.location.pathname'])
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
