import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
// import { FirstDose } from 'src/app/covid19Interface';
// import { FirstdoseService } from './firstdose.service';
// import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  constructor() { }
  
  //store all data
  // firstdose: FirstDose[] = [];

  //Get Admin Name For Export PDF Reference
  // admin = this.restapiService.adminName;
  //URL for export
  // url = `../../../../api/pdfConvert/pdfFirstdose.php?admin=${this.admin}`;
  //Pass data to data Source
  dataSource!: MatTableDataSource<any>;
  //Pagination
  @ViewChild('paginator') paginator!: MatPaginator;
  //Sort
  @ViewChild(MatSort) sort!: MatSort;
  
  //Data column to display
  columnsToDisplay = ['id', 'name', 'price', 'date'];
  //clear input value from the search
  value = '';

  getAllFirstdose(): void{
    // this.firstdoseService.getAllFirstdoseInfo().subscribe( 
    //   data => { 
    //     this.firstdose = data;   
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   });     
  }

  //Search by Name
  filterData($event: any){
    this.dataSource.filter = $event.target.value;
  }

  //Delete Recipient 
  deleteConfirm(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to delete this record?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
      }).then((result) => {
        // if (result.isConfirmed) {
        //   //Delete the record if confirmed YES
        //   this.firstdoseService.deleteSelectedFirstdose(id).subscribe( result => {
        //     this.getAllFirstdose();
        //   });
        // } else if (
        //   /* IF Dismiss Close Modal */
        //   result.dismiss === Swal.DismissReason.cancel
        // ) {
        //   swalWithBootstrapButtons.close();
        // }
    })
  }
  ngOnInit(): void {
    this.getAllFirstdose();
  }

}
