import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private adminService: AdminService) { }

  //All Form Data
  Add!:FormGroup

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
    this.adminService.pushData(_data);
  }

  ngOnInit(): void {
    this.validation();
  }

}
