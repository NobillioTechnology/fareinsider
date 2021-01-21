import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
   
    this.userDetail =JSON.parse(localStorage.getItem('userData'));
    if(this.userDetail){
      this.isLogin=2;
      this.username=this.userDetail.UserName
    }
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
}
