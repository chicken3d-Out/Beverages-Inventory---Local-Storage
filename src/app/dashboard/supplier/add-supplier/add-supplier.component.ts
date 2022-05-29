import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from "@angular/forms";
// import { RestApiService } from 'src/app/rest-api.service';
// import { Reservation } from 'src/app/covid19Interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  duplicateEmail = false;

  Add!:FormGroup

  constructor(private route: Router, private fb: FormBuilder) { }

  //Form Validation
  validation(){
    this.Add = this.fb.group({
      name: new FormControl(null,Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3)
      ])),
      contact: new FormControl(null, [Validators.required,
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
        Validators.maxLength(11),
        Validators.minLength(11),
        notNegative
      ]),
      email: new FormControl(null,[Validators.required, Validators.email]),
      location: new FormControl(null,[Validators.required, Validators.minLength(10)])
    })
  }

  get name(){
    return this.Add.get('name');
  }
  get contact(){
    return this.Add.get('contact');
  }
  get email(){
    return this.Add.get('email');
  }
  get location(){
    return this.Add.get('location');
  }

  resetForm(){
    this.Add.reset();
  }

  onSubmit(data: any){
    const firstname = data.value.firstname;
    const lastname = data.value.lastname;
    const email = data.value.email;
    //Convert to json
    const reservationData = {
      id: null,
      firstname: firstname,
      lastname: lastname,
      email: email,
      status: 'Pending'
    }
    // this.restapiService.getAllReservation().subscribe( data => {
    //   const emailDuplicate = data.find((data: any) => {
    //     return data.email === email
    //   })
    //   if(emailDuplicate){
    //     this.duplicateEmail = true;
    //   }else {
    //     this.duplicateEmail = false

    //     this.restapiService.addReservation(reservationData as Reservation).subscribe( data => {
    //       console.log(data)
    //       this.resetForm();
    
    //       //Success Modal
    //       Swal.fire({
    //         title: 'Record Successfully Created!',
    //         text: "Go back to add reservations?",
    //         icon: 'success',
    //         confirmButtonColor: '#3085d6',
    //         confirmButtonText: 'Done!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           this.route.navigate(['dashboard-view/reservation-view']); 
    //         }
    //       })
    
    //     })
    //   }
    // }) 
  }
  notNegative(){
    return (control:FormControl): ValidationErrors | null => {
      const value = control.value
      if(value == null){
        return null
      }
      if(value < 0){
        return { negative:true}
      }
      return null
    }
  }

  ngOnInit(): void {
    this.validation()
  }

}

export function notNegative(){
  return (control:FormControl): ValidationErrors | null => {
    const value = control.value
    if(value == null){
      return null
    }
    if(value < 0){
      return { negative:true}
    }
    return null
  }
}
