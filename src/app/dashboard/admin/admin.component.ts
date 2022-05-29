import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from 'src/app/model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router, private snackbar:MatSnackBar) { }

//store all data
adminList: Admin[] = [];

//Pass data to data Source
dataSource!: MatTableDataSource<Admin>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

//Data column to display
columnsToDisplay = ['id', 'name', 'username', 'password', 'action'];
//clear input value from the search
value = '';

//Get All Data Beverages
getAllData(): void{
  const records = localStorage.getItem('Admin');
  if(records !==null){
    this.adminList = JSON.parse(records);

    this.dataSource = new MatTableDataSource(this.adminList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // console.log(this.adminList)
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
    confirmButtonText: 'Yes, Delete it',
    cancelButtonText: 'Cancel',
    reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let index = this.adminList.findIndex(x => x.id === id)

        console.log("index: "+index)
        
        this.adminList.splice(index,1)

        //Set New Data
        localStorage.setItem('Admin', JSON.stringify(this.adminList))

        //Deleted Snackbar
        this.snackbar.open("Successfully Deleted","X",{duration: 3000});

        //Set New Data
        this.getAllData()


      } else if (
        /* IF Dismiss Close Modal */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.close();
      }
  })

}
  ngOnInit(): void {
    this.getAllData()
  }

}
