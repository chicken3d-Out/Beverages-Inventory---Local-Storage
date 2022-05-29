import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Beverages } from 'src/app/model';
import { BeveragesService } from 'src/app/services/beverages.service';
import { notNegative } from '../../supplier/add-supplier/add-supplier.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  //All Form Data
  Add!:FormGroup

  beverages:Beverages;

  //Bind Data
  dataId:any
  dataName:any
  dataPrice:any
  dataStock:any
  dataSupplier:any

  constructor(private fb: FormBuilder, 
    private beveragesService: BeveragesService,
    private activeRoute:ActivatedRoute,
    private snackbar:MatSnackBar,
    private route: Router
    ) { 
      this.beverages = new Beverages()
      this.activeRoute.params.subscribe((res) => {
        this.beverages.id = res['id']
      })
    }

    //Get Data for specific Item
    getCurrentBev(){
      const oldRecords = localStorage.getItem('BeveragesList')
      if (oldRecords !== null){
        const userList = JSON.parse(oldRecords)
        //Get Current Beverages Data
        const currentBev = userList.find((x:any) => x.id == this.beverages.id);

        //Pass Data to beverages
        if(currentBev !== undefined){
          this.beverages.name = currentBev.name;
          this.beverages.price = currentBev.price;
          this.beverages.stock = currentBev.stock;
          this.beverages.supplier = currentBev.supplier;

          //Pass Data to Each Variable
          this.dataName = this.beverages.name
          this.dataPrice = this.beverages.price
          this.dataStock = this.beverages.stock
          this.dataSupplier = this.beverages.supplier
          this.dataId = this.beverages.id
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
    //Assign Data Values
    const id = this.dataId;
    const name = _data.value.name;
    const price = _data.value.price;
    const stock = _data.value.stock;
    const supplier = _data.value.supplier;

    //JSON Data
    const beveragesData: Beverages = {
      id:id,
      name: name,
      price: price,
      stock: stock,
      supplier: supplier
    }

    //Push Data to Local Storage
    const records = localStorage.getItem('BeveragesList');
    if( records !== null){
      const beveragesList = JSON.parse(records)

      //Remove First The Original Data in the Array
      beveragesList.splice(beveragesList.findIndex((x:any) => x.id == this.beverages.id),1)

      beveragesList.push(beveragesData)
      localStorage.setItem('BeveragesList', JSON.stringify(beveragesList))

      //Open Snackbar
      this.snackbar.open("Successfully Updated","X",{duration: 3000});

      //Go Back to Dashboard
      this.route.navigate(['beverages']);

    } 
  }

  ngOnInit(): void {
    this.validation();
    this.getCurrentBev();
  }

  //Disable Negative Values
  notNegative(){
    this.beveragesService.invalidNegative();
  }
}
