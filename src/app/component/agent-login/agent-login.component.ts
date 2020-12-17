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
  isActive:any='signIn'
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
      password: new FormControl('',[Validators.required,Validators.pattern("([a-zA-Z0-9@#$%&?*]).{6,10}$")]), 
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
         window.history.back()
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
