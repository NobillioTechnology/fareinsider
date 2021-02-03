import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:any=0;
  userDetail:any={}
  username:any;
  isActive:any;
  showButn:any=true;
  userType:any;
  walletBalance:any;
  agentCode:any;
  constructor(private router: Router,private service: RestDataService) { }

  ngOnInit(): void {
   
    this.userDetail =JSON.parse(localStorage.getItem('userData'));
    if(this.userDetail){
      this.isLogin=2;
      this.username=this.userDetail.UserName
      this.userType = this.userDetail.UserType;
     
      if(this.userType=='Agent'){
        this.agentCode=this.userDetail.Acode
        this.getWalletBalance()
      }
      
    }
    // alert(this.isLogin)
  }
  getWalletBalance(){
    this.service.testGetApiMethod(`Agent/AgentBalance?Agentcode=${this.agentCode}`).subscribe(res=>{
      if(res.Status==true){
        this.walletBalance=parseInt(res.Data).toLocaleString('en-IN');
          // console.log('pay button is====>', this.walletPayButton);
      }
     },
     (err)=>{
      
    });
  }
  home(){
    this.showButn=true
    this.router.navigate(['index'])
  }
  customerLogin(val){
    this.isActive=val
    this.router.navigate(['customer-login'])
  }
  agentLogin(val){
    this.isActive=val
    this.showButn=false
    this.router.navigate(['agent-login'])
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['index'])
    window.location.reload()
  }
  myProfile(){
    this.router.navigate(['profile'])
  }
  chngePswrd(){
    this.router.navigate(['change-pasword'])
  }
  myTrip(){
    this.router.navigate(['my-booking'])
  }
  myAccount(){
    this.router.navigate(['account-statemnt'])
  }
}
