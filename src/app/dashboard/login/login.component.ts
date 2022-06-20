import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, 
    private snackbar:MatSnackBar, private route: Router) { }
  //initialization
  credentials!:boolean;
  hide = true;

  login!:FormGroup

  //Form Validation
  validation(){
    this.login = this.fb.group({
      username: [null,[Validators.required,
        Validators.minLength(3),
        // Validators.maxLength(7)
      ]],
      password: [null,[Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]]
    })
  }
  //Get Controls
  get username(){
    return this.login.get('username');
  }
  get password(){
    return this.login.get('password');
  }

  //setCredential status in Servive
  onSubmit(data:any){
    const token = this.loginService.auth(data.value);
    
    if(token){
      //Store username token
      localStorage.setItem('Token',JSON.stringify(token.username))

      //Open Snackbar
      this.snackbar.open("Login Successfully","X",{duration: 3000});

      //Go back to dashboard
      this.route.navigate(['dashboard']);
    }else {
      //Open Snackbar
      this.snackbar.open("Invalid Credentials","X",{duration: 3000});
    }
  }
  ngOnInit(): void {
    this.validation();
  }
}
