import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-stat',
  templateUrl: './dashboard-stat.component.html',
  styleUrls: ['./dashboard-stat.component.css']
})
export class DashboardStatComponent implements OnInit {
 
  beveragesCount!:number;
  accountCount!:number;

  constructor(){}

  getCount(){
    const record = localStorage.getItem('BeveragesList')
    
    if(record!== null){
      const bevList = JSON.parse(record);

      this.beveragesCount = bevList.length
    }

    const records = localStorage.getItem('Admin')
    if(records!== null){
      
      const accountList = JSON.parse(records);
      this.accountCount = accountList.length
    }
  }

  ngOnInit(): void {
    this.getCount();
  }
    
}




