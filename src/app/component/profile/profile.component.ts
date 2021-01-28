import { Component, OnInit } from '@angular/core';
import { RestDataService } from '../../rest-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetail:any={};
  profile:any={};
  closeTab:any='close';
  userType:any;
  constructor(private service: RestDataService) { }

  ngOnInit(): void {
    this.userDetail =JSON.parse(localStorage.getItem('userData'));
    this.userType = this.userDetail.UserType;
    // this.myProfile()
    this.agentProfile()
  }
  myProfile(){
    this.service.testGetApiMethod(`Client/ClientProfile?ClientCode=${this.userDetail.UserCode}`).subscribe(res=>{
      console.log("profile ====>"+JSON.stringify(res)); 
       if(res.Status==true){
       this.profile=res.Data
       }
      },
      (err)=>{
       // this.spinner.hide(); 
       // this.router.navigate(['login'])
       // console.log(err)
     }); 
  }
  agentProfile(){
    this.service.testGetApiMethod(`Agent/AgentProfile?AgentCode=${this.userDetail.UserCode}`).subscribe(res=>{
      console.log("profile ====>"+JSON.stringify(res)); 
       if(res.Status==true){
       this.profile=res.Data[0]
       }
      },
      (err)=>{
       // this.spinner.hide(); 
       // this.router.navigate(['login'])
       // console.log(err)
     }); 
  }
  showModal(val){
    this.closeTab=val
  }
  editProfile(){
    let dataInfo={
      "ClientCode":this.userDetail.UserCode,
      "ClientName":this.profile.ClientName, 
      "DOB":this.profile.dob, 
      "Address" :this.profile.Address,
      "PinCode":'', 
      "City":this.profile.City, 
      "State" :this.profile.State,
      "Country":this.profile.Country, 
      "Mobile":this.profile.Mobile
  }
    this.service.testPostApiMethod(dataInfo,"Client/ClientUpdate").subscribe(res=>{
    // console.log("getairport ====>"+JSON.stringify(res)); 
    if(res.Status==true){
      alert("profile updated successfully")
      this.closeTab='close'
    }
   },
   (err)=>{
    // this.spinner.hide(); 
    // this.router.navigate(['login'])
    // console.log(err)
  });
  
  }
  
}
