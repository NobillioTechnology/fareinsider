import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RestDataService } from '../../rest-data.service';
import { IpServiceService } from '../../ip-service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  myForm:any=FormGroup;
  logInForm:any=FormGroup;
  forgotForm:any=FormGroup;
  ipAddress:string;
  tabType:any='signIn';
  isActive:any='signIn';
  forgotActive:any=false;
  forgotHit:any=false;
  hitLogin:any=false;
  msg:any="";
  resetDone:any=false;
  constructor(private service: RestDataService,private ip:IpServiceService,private router: Router) {
    this.myForm = new FormGroup({
      fName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      mobile: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{10}")]),
      checkfield1: new FormControl('',[Validators.required]),
      checkfield2: new FormControl(''),
    })
    this.logInForm = new FormGroup({
      emailId: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      password: new FormControl('',[Validators.required,Validators.pattern("([a-zA-Z0-9@#$%&?*]).{6,10}$")]), 
    }) 
    this.forgotForm = new FormGroup({
      emailId: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
    }) 

   }


  ngOnInit(): void {
    this.getIP();
  }
  getIP()
  {
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    });
  }
  tab(val){
    this.tabType=val
    this.isActive=val
  }
  signup(){
    let dataInfo={
      "FullName":this.myForm.value.fName+' '+this.myForm.value.lastName,
      "Email":this.myForm.value.email,
      "Mobile":this.myForm.value.mobile,
      "IP":this.ipAddress
    }
    this.service.testPostApiMethod(dataInfo,"Client/ClientRegistration").subscribe(res=>{
      // console.log("getairport ====>"+JSON.stringify(res)); 
       if(res.Status==true){
        this.tabType='signIn'
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
  logIn(){
    console.log('Im login called  email==>'+this.logInForm.value.emailId+" password===>"+this.logInForm.value.password);
    this.service.testGetApiMethod(`Client/ClientLogin?Email=${this.logInForm.value.emailId}&Password=${this.logInForm.value.password}`).subscribe(res=>{
      // console.log("getairport ====>"+JSON.stringify(res)); 
       if(res.Status==true){
        //  localStorage.setItem("userId",res.Data.UserID)
        console.log(JSON.stringify(res));
         localStorage.setItem('userData', JSON.stringify(res.Data));
         window.history.back()
         setTimeout(()=>{
          window.location.reload()
         },1000)
        
        //  this.router.navigate(['window.location.pathname'])
         // this.spinner.hide();
        //  if(res.Data!=null){
        //  this.airportSrcList=res.Data;
        //  } 
       }else{
         this.hitLogin=true;
         this.msg=res.Message;
       }
      },
      (err)=>{
       // this.spinner.hide(); 
       // this.router.navigate(['login'])
       // console.log(err)
     }); 
  }

  switchToForgot(){
    this.forgotActive=true;
    this.hitLogin=false;
    this.msg="";
  }
  switchToLogin(){
    this.forgotActive=false;
    this.forgotHit=false;
   
  }

  resetPassword(){
    this.service.testGetApiMethod(`Client/ClientForGotPassword?email=${this.logInForm.value.emailId}`).subscribe(res=>{
      // console.log("getairport ====>"+JSON.stringify(res)); 
       if(res.Status==true){
        //  localStorage.setItem("userId",res.Data.UserID)
        console.log(JSON.stringify(res));
         setTimeout(()=>{
           this.forgotHit=true;
          this.msg=res.Data;
          if(res.Data=="We Have sent you the Details. Please check your mail.")
            this.resetDone=true;
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
