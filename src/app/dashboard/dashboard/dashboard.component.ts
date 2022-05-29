import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentNav: String = 'Dashboard'

  adminName!:String

  constructor(private login: LoginService, 
    private route:Router, private snackbar:MatSnackBar) { }

  getAdminName(){
    this.adminName = this.login.adminName; 
  }

  // Log Out Section
  logout(){
    localStorage.removeItem('Token');
    this.route.navigate(['']);

    //Open Snackbar
    this.snackbar.open("Successfully Logged Out","X",{duration: 3000});

    
  }
  // Display Section Name
  currentNavigation(nav: String){
    this.currentNav = nav
  }

  ngOnInit(): void {
    this.getAdminName();
  }

}
