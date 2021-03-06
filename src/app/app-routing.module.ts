import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component';
import { SalesComponent} from './Reports/sales/sales.component';
import {ProductSetupComponent} from './Products/product-setup/product-setup.component';
import {ProductUnitSetupComponent} from './Products/product-unit-setup/product-unit-setup.component';
import {ProductBrandComponent} from './Products/product-brand/product-brand.component';

const routes: Routes = [
  {path:"Dashboard",component:DashboardComponent},
  {path:"Sales",component:SalesComponent},
  {path:"ProductSetup",component:ProductSetupComponent},
  {path:"UnitSetup", component:ProductUnitSetupComponent},
  {path:"BrandSetup",component:ProductBrandComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [DashboardComponent,SalesComponent,
  ProductSetupComponent,
  ProductUnitSetupComponent,
  ProductBrandComponent
];
