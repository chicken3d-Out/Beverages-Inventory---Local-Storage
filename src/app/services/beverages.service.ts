import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Beverages } from 'src/app/model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { identifierName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class BeveragesService {

  Add!:FormGroup

  constructor(private fb: FormBuilder, 
    private route: Router, 
    private snackbar:MatSnackBar) {}

    //Invalid Negative Function
    invalidNegative(){
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
    
  //Get New ID
  getNewID(){
    const record = localStorage.getItem('BeveragesList')
    if(record!== null){
      const bevList = JSON.parse(record);
      return bevList.length + 1;
    }else {
      return 1;
    }
  }

  pushData(_data:any){
    //Assign Data Values
    const id = this.getNewID();
    const name = _data.value.name;
    const price = _data.value.price;
    const stock = _data.value.stock;
    const supplier = _data.value.supplier;

    //JSON Data
    const beveragesData: Beverages = {
      id: id,
      name: name,
      price: price,
      stock: stock,
      supplier: supplier
    }

    //Push Data to Local Storage
    const records = localStorage.getItem('BeveragesList');
    if( records !== null){
      const beveragesList = JSON.parse(records)
      beveragesList.push(beveragesData)
      localStorage.setItem('BeveragesList', JSON.stringify(beveragesList))

      //Open Snackbar
      this.snackbar.open("Successfully Added","X",{duration: 3000});

      //Go Back to Dashboard
      this.route.navigate(['beverages']);

      // //Reset Form Data
      // this.resetForm();
    } else {
      const bevArr = [];
      bevArr.push(beveragesData);
      localStorage.setItem('BeveragesList', JSON.stringify(bevArr))

      //Open Snackbar
      this.snackbar.open("Successfully Added","X",{duration: 3000});

      //Go back to dashboard
      this.route.navigate(['beverages']);
    }  
  }

}
