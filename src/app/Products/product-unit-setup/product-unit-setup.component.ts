import { Component, OnInit } from '@angular/core';
import { UnitModel } from '../Model/unit-model';

@Component({
  selector: 'app-product-unit-setup',
  templateUrl: './product-unit-setup.component.html',
  styleUrls: ['./product-unit-setup.component.css']
})
export class ProductUnitSetupComponent implements OnInit {

  Title:string ="Product Unit Setup";
  UnitModel=new UnitModel();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.UnitModel);
  }

}
