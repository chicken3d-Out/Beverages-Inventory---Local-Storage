import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {  Router } from '@angular/router';
import { Admin } from 'src/app/model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  Add!:FormGroup

  constructor(private fb: FormBuilder, 
    private route: Router, 
    private snackbar:MatSnackBar) {}
    
  //Get New ID
  getNewID(){
    const record = localStorage.getItem('Admin')
    if(record!== null){
      const adminList = JSON.parse(record);
      return adminList.length + 1;
    }else {
      return 1;
    }
  }

  pushData(_data:any){
    //Assign Data Values
    const id = this.getNewID();
    const name = _data.value.name;
    const username = _data.value.username;
    const password = _data.value.password;
    // const confirm = _data.value.confirm;

    //JSON Data
    const adminData: Admin = {
      id: id,
      name: name,
      username: username,
      password: password
      // confirm: confirm
    }

    //Push Data to Local Storage
    const records = localStorage.getItem('Admin');
    if( records !== null){
      const adminList = JSON.parse(records)
      adminList.push(adminData)
      localStorage.setItem('Admin', JSON.stringify(adminList))

      //Open Snackbar
      this.snackbar.open("Successfully Added","X",{duration: 3000});

      //Go Back to Dashboard
      this.route.navigate(['admin']);

      // //Reset Form Data
      // this.resetForm();
    } else {
      const adminArr = [];
      adminArr.push(adminData);
      localStorage.setItem('Admin', JSON.stringify(adminArr))

      //Open Snackbar
      this.snackbar.open("Successfully Added","X",{duration: 3000});

      //Go back to dashboard
      this.route.navigate(['admin']);
    }  
  }

}
