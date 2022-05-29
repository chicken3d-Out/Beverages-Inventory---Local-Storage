import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashboardStatComponent } from './dashboard/dashboard-stat/dashboard-stat.component';
import { BeveragesComponent } from './dashboard/beverages/beverages.component';
import { PriceComponent } from './dashboard/price/price.component';
import { StockComponent } from './dashboard/stock/stock.component';
import { LogsComponent } from './dashboard/logs/logs.component';
import { SupplierComponent } from './dashboard/supplier/supplier.component';
import { AddComponent } from './dashboard/beverages/add/add.component';
import { AddSupplierComponent } from './dashboard/supplier/add-supplier/add-supplier.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { UpdateComponent } from './dashboard/beverages/update/update.component';
import { AdminAddComponent } from './dashboard/admin/admin-add/admin-add.component';
import { AdminUpdateComponent } from './dashboard/admin/admin-update/admin-update.component';
import { LoginComponent } from './dashboard/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardStatComponent,
    BeveragesComponent,
    PriceComponent,
    StockComponent,
    LogsComponent,
    SupplierComponent,
    AddComponent,
    AddSupplierComponent,
    AdminComponent,
    UpdateComponent,
    AdminAddComponent,
    AdminUpdateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSortModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      //Redirect Path
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {path: '', component: DashboardComponent, children: [
        {path: 'dashboard', component: DashboardStatComponent},
        {path: 'beverages', component: BeveragesComponent},
        {path: 'admin', component: AdminComponent},

        //Beverages Paths
        {path: 'beverages/add', component: AddComponent},

        //Update Beverages
        {path: 'beverages/update/:id', component: UpdateComponent},

        //Redirect Path
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

        //Admin Paths
        {path: 'admin/add', component: AdminAddComponent},

        //Admin Update
        {path: 'admin/update/:id', component: AdminUpdateComponent}

      ]},
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
