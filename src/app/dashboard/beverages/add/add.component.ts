import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { BeveragesService } from 'src/app/services/beverages.service';
import { notNegative } from '../../supplier/add-supplier/add-supplier.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  //All Form Data
  Add!:FormGroup

  constructor(private fb: FormBuilder, private beveragesService: BeveragesService) {}

  //Form Validation
  validation(){
    this.Add = this.fb.group({
      name: [null,[
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3)
      ]],
      price: [null,[ Validators.required,
        Validators.pattern('[0-9 ]*'),
        Validators.minLength(1),
        Validators.maxLength(7),
        notNegative
      ]],
      stock: [null,[Validators.required,
        Validators.pattern('[0-9 ]*'),
        Validators.minLength(1),
        Validators.maxLength(7),
        notNegative
      ]],
      supplier: [null,[Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3)
      ]]
    })
  }

  //Get Controls
  get name(){
    return this.Add.get('name');
  }
  get price(){
    return this.Add.get('price');
  }
  get stock(){
    return this.Add.get('stock');
  }
  get supplier(){
    return this.Add.get('supplier');
  }

  //Reset The Form
  resetForm(){
    this.Add.reset();
  }

  //GetID
  getNewID(){
    this.beveragesService.getNewID();
  }

  //Save Data
  onSubmit(_data: any){
    this.beveragesService.pushData(_data);
  }

  ngOnInit(): void {
    this.validation()
  }

  //Disable Negative Values
  notNegative(){
    this.beveragesService.invalidNegative();
  }
}