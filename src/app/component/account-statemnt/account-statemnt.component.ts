import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RestDataService } from '../../rest-data.service';

@Component({
  selector: 'app-account-statemnt',
  templateUrl: './account-statemnt.component.html',
  styleUrls: ['./account-statemnt.component.css']
})
export class AccountStatemntComponent implements OnInit {
  userDetail:any={};
  data:any={};
  accountList:any=[];
  bRefNo:any;
  constructor(private router: Router,private service: RestDataService) { }

  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userData'));
    this.search()
  }
  search(){
    // alert("ok")
    // if(this.data.bRefNo==undefined){
    //   this.data.bRefNo=''
    // }
    if(this.data.fromDate==undefined){
      this.data.fromDate=''
    }
    if(this.data.toDate==undefined){
      this.data.toDate=''
    }
    // if(this.data.fromDate!=undefined && this.data.toDate!=undefined){ 
      this.service.testGetApiMethod(`Agent/AgentAccountStatement?AgentCode=${this.userDetail.UserCode}&FromDate=${this.data.fromDate}&ToDate=${this.data.toDate}`).subscribe(res=>{
      // console.log("getairport ====>"+JSON.stringify(res)); 
      if(res.Status==true){
       
        // this.router.navigate(['oneway'])
        // this.spinner.hide();
        if(res.Data!=null){
          this.accountList=res.Data
        }
      }
     },
     (err)=>{
      // this.spinner.hide(); 
      // this.router.navigate(['login'])
      // console.log(err)
    });
  }
}
