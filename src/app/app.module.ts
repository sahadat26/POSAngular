import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SalesComponent } from './Reports/sales/sales.component';
import { FooterComponent } from './footer/footer.component';
import { ProductSetupComponent } from './Products/product-setup/product-setup.component';
import { ProductUnitSetupComponent } from './Products/product-unit-setup/product-unit-setup.component';
import { ProductBrandComponent } from './Products/product-brand/product-brand.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductinfoComponent } from './Products/productinfo/productinfo.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidemenuComponent,
    NavbarComponent,
    SalesComponent,
    FooterComponent,
    ProductSetupComponent,
    ProductUnitSetupComponent,
    ProductBrandComponent,
    ProductinfoComponent
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    DataTablesModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
