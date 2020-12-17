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
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userDetail =JSON.parse(localStorage.getItem('userData'));
    this.username=this.userDetail.UserName
    if(this.userDetail){
      this.isLogin=2;
    }
  }
  home(){
    this.router.navigate(['index'])
  }
  customerLogin(){
    this.router.navigate(['customer-login'])
  }
  agentLogin(){
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
