import { Component, OnInit } from '@angular/core';
import { RestDataService } from '../../rest-data.service';

@Component({
  selector: 'app-change-pasword',
  templateUrl: './change-pasword.component.html',
  styleUrls: ['./change-pasword.component.css']
})
export class ChangePaswordComponent implements OnInit {
  data:any={};
  userDetail:any={}
  constructor(private service: RestDataService) { }

  ngOnInit(): void {
    this.userDetail =JSON.parse(localStorage.getItem('userData'));
  }
chngePaswrd(){
if(this.data.newPswrd==this.data.cnfrmPswrd){
  let dataInfo={
    "ClientCode":this.userDetail.UserCode,
    "NewPassword":this.data.newPswrd
}
  this.service.testPostApiMethod(dataInfo,"Client/ClientChangePassword").subscribe(res=>{
  // console.log("getairport ====>"+JSON.stringify(res)); 
  if(res.Status==true){
    alert("password changed successfully")
  }
 },
 (err)=>{
  // this.spinner.hide(); 
  // this.router.navigate(['login'])
  // console.log(err)
});
}
}
}
