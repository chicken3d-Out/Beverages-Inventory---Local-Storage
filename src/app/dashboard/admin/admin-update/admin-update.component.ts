import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {

  //All Form Data
  Add!:FormGroup

  admin!:Admin;

  //Bind Data
  dataId:any
  dataName:any
  dataUsername:any
  dataPassword:any
  dataConfirm:any

  constructor(private fb: FormBuilder, 
    private adminService: AdminService,
    private activeRoute:ActivatedRoute,
    private snackbar:MatSnackBar,
    private route: Router
    ) { 
      this.admin = new Admin()
      this.activeRoute.params.subscribe((res) => {
        this.admin.id = res['id']
      })
    }


  //Get Data for specific Item
  getCurrentAdmin(){
    const oldRecords = localStorage.getItem('Admin')
    if (oldRecords !== null){
      const userList = JSON.parse(oldRecords)
      //Get Current Beverages Data
      const currentBev = userList.find((x:any) => x.id == this.admin.id);

      //Pass Data to admin
      if(currentBev !== undefined){
        this.admin.name = currentBev.name;
        this.admin.username = currentBev.username;
        this.admin.password = currentBev.password;

        //Pass Data to Each Variable
        this.dataName = this.admin.name
        this.dataUsername = this.admin.username
        this.dataPassword = this.admin.password
        
        this.dataId = this.admin.id
      }
    }
  }

  //Form Validation
  validation(){
    this.Add = this.fb.group({
      name: [null,[
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3)
      ]],
      username: [null,[Validators.required,
        // Validators.pattern('[0-9 ]*'),
        Validators.minLength(3),
        // Validators.maxLength(7)
      ]],
      password: [null,[Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]],
      confirm: [null,[Validators.required,
        // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      ]],
    }, {validator: this.checkIfMatchingPasswords('password', 'confirm')})
  }
  //Get Controls
  get name(){
    return this.Add.get('name');
  }
  get lastname(){
    return this.Add.get('lastname');
  }
  get username(){
    return this.Add.get('username');
  }
  get password(){
    return this.Add.get('password');
  }
  get confirm(){
    return this.Add.get('confirm');
  }

  //Password Check Match
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  //Reset The Form
  resetForm(){
    this.Add.reset();
  }

  //Save Data
  onSubmit(_data: any){
    //Assign Data Values
    const id = this.dataId;
    const name = _data.value.name;
    const username = _data.value.username;
    const password = _data.value.password;
    // const supplier = _data.value.supplier;

    //JSON Data
    const adminData: Admin = {
      id:id,
      name: name,
      username: username,
      password: password,
      // supplier: supplier
    }

    //Push Data to Local Storage
    const records = localStorage.getItem('Admin');
    if( records !== null){
      const adminList = JSON.parse(records)

      //Remove First The Original Data in the Array
      adminList.splice(adminList.findIndex((x:any) => x.id == this.admin.id),1)

      adminList.push(adminData)
      localStorage.setItem('Admin', JSON.stringify(adminList))

      //Open Snackbar
      this.snackbar.open("Successfully Updated","X",{duration: 3000});

      //Go Back to Dashboard
      this.route.navigate(['admin']);

    } 
  }

  ngOnInit(): void {
    this.validation();
    this.getCurrentAdmin();
  }

}
